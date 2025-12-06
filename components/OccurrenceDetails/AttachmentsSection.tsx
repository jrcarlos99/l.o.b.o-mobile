import React from "react";
import { Image, Text, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Attachment = {
  id: number | string;
  url_anexo: string;
};

type Props = {
  images: Attachment[];
};

export function AttachmentsSection({ images }: Props) {
  const hasImages = images && images.length > 0;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>📎 Anexos</Text>

      {!hasImages && <Text style={styles.empty}>Nenhum anexo disponível.</Text>}

      {hasImages &&
        images.map((img) => (
          <Image
            key={img.id}
            source={{ uri: img.url_anexo }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
    </View>
  );
}
