import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OfflineBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <View style={styles.banner}>
      <Ionicons name="warning" size={18} color="#7a4a00" />
      <Text style={styles.text}>
        Nenhuma conexão de rede detectada. Enviaremos seu registro assim que
        possível.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    margin: 12,
    backgroundColor: "#FFF3CD",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text: { color: "#7a4a00", marginLeft: 8, flex: 1 },
});
