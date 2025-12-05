import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SignatureSectionProps {
  signatureText: string;
  onPress: () => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  signatureText,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assinatura</Text>

      <TouchableOpacity style={styles.signatureBox} onPress={onPress}>
        {signatureText ? (
          <>
            <Ionicons
              name="checkmark-circle"
              size={32}
              color="#4caf50"
              style={styles.icon}
            />
            <Text style={styles.capturedText}>Assinatura capturada</Text>
          </>
        ) : (
          <>
            <Ionicons
              name="create"
              size={32}
              color="#999"
              style={styles.icon}
            />
            <Text style={styles.placeholderText}>Toque para assinar</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  signatureBox: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderStyle: "dashed",
  },
  icon: {
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  capturedText: {
    fontSize: 14,
    color: "#4caf50",
    fontWeight: "600",
  },
});
