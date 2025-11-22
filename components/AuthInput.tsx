import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../constants/colors";

type Props = TextInputProps & {
  label?: string;
  placeholder?: string;
};

export default function AuthInput({ label, placeholder, ...rest }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: colors.textDark,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.inputBg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
  },
});
