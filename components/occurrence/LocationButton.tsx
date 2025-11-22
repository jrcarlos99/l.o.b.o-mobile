import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";

type Props = { onPress?: () => void; label?: string };

export default function LocationButton({
  onPress,
  label = "Compartilhar Localização",
}: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Ionicons name="locate-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  text: { marginLeft: 8, color: "#6C2020" },
});
