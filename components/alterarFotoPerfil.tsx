import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/supabase";

export async function alterarFotoPerfil(userId: string) {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert("Permissão para acessar a galeria é necessária!");
    return;
  }

  // abrir galeria
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (result.canceled || !result.assets?.length) return;

  const file = result.assets[0];
  const filePath = `${userId}.jpg`; // ✅ não duplicar "avatars/"

  // ✅ Criar FormData com o arquivo
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: `${userId}.jpg`,
    type: "image/jpeg",
  } as any);

  // ✅ Upload para Supabase Storage
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, formData, {
      upsert: true,
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Erro ao enviar avatar:", error);
    return;
  }

  // ✅ Obter URL pública
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  // ✅ Salvar no banco
  await supabase
    .from("usuarios")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  return publicUrl;
}
