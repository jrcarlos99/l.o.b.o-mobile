import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImageSectionProps {
  images: string[];
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  images,
  onAddImage,
  onRemoveImage,
}) => {
  const handleRemove = (index: number) => {
    Alert.alert("Remover imagem", "Você tem certeza?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Remover",
        onPress: () => onRemoveImage(index),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imagens da Ocorrência</Text>

      {images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageList}
        >
          {images.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri: imageUri }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(index)}
              >
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {images.length === 0 && (
        <Text style={styles.emptyText}>Nenhuma imagem adicionada</Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={onAddImage}>
        <Ionicons name="add-circle" size={24} color="#6C2020" />
        <Text style={styles.addButtonText}>Adicionar Imagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  imageList: {
    marginBottom: 12,
  },
  imageContainer: {
    position: "relative",
    marginRight: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#d32f2f",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  emptyText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 12,
    fontStyle: "italic",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6C2020",
    fontWeight: "600",
  },
});
