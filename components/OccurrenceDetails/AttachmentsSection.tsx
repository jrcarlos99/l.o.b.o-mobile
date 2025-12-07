import React from "react";
import { Image, Text, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  images: string[];
};

export function AttachmentsSection({ images }: Props) {
  const hasImages = images && images.length > 0;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>📎 Anexos</Text>

      {!hasImages && <Text style={styles.empty}>Nenhum anexo disponível.</Text>}

      {hasImages &&
        images.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
    </View>
  );
}
