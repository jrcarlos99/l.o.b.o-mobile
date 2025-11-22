import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";
import FormField from "./FormField";

type Item = { label: string; value: string };

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  items: Item[];
  required?: boolean;
};

export default function PickerField({
  label,
  value,
  onChange,
  items,
  required,
}: Props) {
  return (
    <FormField label={label} required={required}>
      <View style={styles.box}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor="#999"
          mode="dropdown"
        >
          {items.map((it) => (
            <Picker.Item key={it.value} label={it.label} value={it.value} />
          ))}
        </Picker>
      </View>
    </FormField>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    flex: 1,
    width: "100%",
    color: "#333",
    fontSize: 16,
  },
});
