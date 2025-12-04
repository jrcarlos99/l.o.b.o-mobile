import React from "react";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

export default function FormCheckbox({ control, name, label, style }: any) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TouchableOpacity
          style={[
            style,
            { flexDirection: "row", alignItems: "center", marginBottom: 8 },
          ]}
          onPress={() => onChange(!value)}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#333",
              marginRight: 8,
              backgroundColor: value ? "#6C2020" : "transparent",
            }}
          />
          <Text>{label}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
