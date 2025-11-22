import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants/colors";

type Props = { loading?: boolean; onPress?: () => void; label?: string };

export default function SubmitButton({
  loading,
  onPress,
  label = "Enviar",
}: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
  },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
