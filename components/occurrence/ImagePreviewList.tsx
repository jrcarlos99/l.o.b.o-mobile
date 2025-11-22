import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  images: { uri: string; timestamp: string }[];
  onRemove: (index: number) => void;
};

export default function ImagePreviewList({ images, onRemove }: Props) {
  if (!images?.length) return null;
  return (
    <View style={styles.row}>
      {images.map((img, i) => (
        <View key={i} style={styles.wrap}>
          <Image source={{ uri: img.uri }} style={styles.thumb} />
          <TouchableOpacity style={styles.remove} onPress={() => onRemove(i)}>
            <Ionicons name="close-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  wrap: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 8,
    marginTop: 8,
    position: "relative",
  },
  thumb: { width: "100%", height: "100%" },
  remove: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#E53935",
    borderRadius: 16,
    padding: 2,
  },
});
