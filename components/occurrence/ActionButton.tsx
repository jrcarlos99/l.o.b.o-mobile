import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";

type Props = {
  icon: string;
  label: string;
  onPress?: () => void;
};

export default function ActionButton({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Ionicons name={icon as any} size={20} color={colors.primary} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  text: { marginLeft: 8, color: colors.primary, fontWeight: "600" },
});
