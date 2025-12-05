import { supabase } from "@/utils/supabase";
import { uploadImageToSupabase } from "@/utils/uploadImageToSupabase";

export const useOccurrenceUploads = () => {
  const uploadImages = async (
    images: string[],
    occurrenceId: string
  ): Promise<void> => {
    try {
      for (const imageUri of images) {
        const filename = `${occurrenceId}_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.jpg`;

        const publicUrl = await uploadImageToSupabase(imageUri, filename);

        await supabase.from("ocorrencia_anexos").insert({
          ocorrencia_id: occurrenceId,
          url: publicUrl,
          tipo: "imagem",
          created_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const uploadSignature = async (
    signatureBase64: string,
    occurrenceId: string
  ): Promise<void> => {
    try {
      const buffer = Buffer.from(signatureBase64.split(",")[1], "base64");
      const uint8Array = new Uint8Array(buffer);

      const filename = `${occurrenceId}_signature_${Date.now()}.png`;

      const { data, error } = await supabase.storage
        .from("anexos")
        .upload(filename, uint8Array, {
          contentType: "image/png",
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("anexos").getPublicUrl(filename);

      await supabase.from("ocorrencia_anexos").insert({
        ocorrencia_id: occurrenceId,
        url: publicUrl,
        tipo: "assinatura",
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error uploading signature:", error);
      throw error;
    }
  };

  return { uploadImages, uploadSignature };
};
