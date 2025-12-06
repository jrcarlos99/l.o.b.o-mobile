import React from "react";
import { Image, Text, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  signatureUrl?: string | null;
};

export function SignatureSection({ signatureUrl }: Props) {
  const hasSignature = !!signatureUrl;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>✍️ Assinatura do Solicitante</Text>

      {!hasSignature && (
        <Text style={styles.empty}>Nenhuma assinatura registrada.</Text>
      )}

      {hasSignature && (
        <>
          <Image
            source={{ uri: signatureUrl! }}
            style={styles.signature}
            resizeMode="contain"
          />
          <Text style={styles.signatureLabel}>Assinatura registrada.</Text>
        </>
      )}
    </View>
  );
}
