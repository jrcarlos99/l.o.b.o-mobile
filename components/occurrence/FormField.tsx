import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";

type Props = {
  label: string;
  children?: React.ReactNode;
  required?: boolean;
  style?: ViewStyle;
};

export default function FormField({ label, children, required, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={styles.fieldContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: colors.primary,
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 14,
  },
  required: {
    color: "#E53935",
  },
  fieldContainer: {
    flexDirection: "column",
  },
});
