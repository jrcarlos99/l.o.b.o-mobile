import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../constants/colors";

export default function ReconhecimentoFacial() {
  const [progress] = useState(100);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Reconhecimento Facial</Text>
        <Text style={styles.instruction}>
          Por favor, olhe para a câmera e permaneça imóvel
        </Text>

        <Image
          source={require("../assets/images/lobo-icon.png")}
          style={styles.face}
        />

        <Text style={styles.percent}>{progress}%</Text>

        <PrimaryButton
          title="Entrar"
          onPress={() => router.replace("/login")}
          style={{ marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightBackground },
  container: { padding: 18, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: colors.textDark },
  instruction: { color: colors.muted, marginVertical: 12, textAlign: "center" },
  face: { width: 220, height: 220, borderRadius: 12, backgroundColor: "#fff" },
  percent: {
    color: colors.primary,
    marginTop: 12,
    fontWeight: "700",
    fontSize: 20,
  },
});
