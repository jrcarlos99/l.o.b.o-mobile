export const getBlobFromUri = async (uri: string): Promise<Blob | null> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Erro ao gerar blob:", error);
    return null;
  }
};
