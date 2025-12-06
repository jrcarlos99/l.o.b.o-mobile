import React from "react";
import { Text, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  title?: string;
  description?: string | null;
};

export function DescriptionSection({ title, description }: Props) {
  const safeDescription =
    description && description.trim().length > 0
      ? description
      : "Nenhuma descrição informada.";

  return (
    <View style={styles.card}>
      {title && <Text style={styles.title}>{title}</Text>}

      <Text style={styles.sectionTitle}>Descrição</Text>

      <Text style={styles.description}>{safeDescription}</Text>
    </View>
  );
}
