import { supabase } from "@/utils/supabase";
import * as FileSystem from "expo-file-system/legacy";

export const uploadImageToSupabase = async (
  imageUri: string,
  filename: string
): Promise<string> => {
  try {
    // 1. Ler a imagem como base64
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: "base64",
    });

    // 2. Converter base64 → Uint8Array (sem Buffer)
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    // 3. Upload para o Supabase
    const { error } = await supabase.storage
      .from("anexos")
      .upload(filename, bytes, {
        contentType: "image/jpeg",
      });

    if (error) throw error;

    // 4. Pegar URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from("anexos").getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
