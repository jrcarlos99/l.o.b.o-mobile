import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export default function FormInput({ control, name, placeholder, style }: any) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 12 }}>
          <TextInput
            style={style}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
          />
          {error && <Text style={{ color: "red" }}>{error.message}</Text>}
        </View>
      )}
    />
  );
}
