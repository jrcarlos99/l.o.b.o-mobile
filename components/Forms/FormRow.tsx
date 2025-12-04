import React from "react";
import { View } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: any;
};

export default function FormRow({ children, style }: Props) {
  return (
    <View style={[{ flexDirection: "row", gap: 8 }, style]}>{children}</View>
  );
}
