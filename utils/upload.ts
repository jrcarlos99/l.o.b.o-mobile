import * as FileSystem from "expo-file-system/legacy";
import { supabase } from "./supabase";

export const uploadImageToSupabase = async (uri: string, filename: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);

    const { error } = await supabase.storage
      .from("anexos")
      .upload(filename, byteArray, {
        contentType: "image/jpeg",
      });

    if (error) {
      console.error("Erro ao enviar:", error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("anexos")
      .getPublicUrl(filename);

    return urlData.publicUrl;
  } catch (err) {
    console.error("Erro inesperado:", err);
    return null;
  }
};
