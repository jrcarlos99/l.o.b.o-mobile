import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  onClose: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
};

export function Header({ onClose, onEdit, canEdit }: Props) {
  const router = useRouter();

  return (
    <View style={[styles.header, { justifyContent: "space-between" }]}>
      {/* Botão Voltar */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => router.push("/occurrences")}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={[styles.headerButtonText, { marginLeft: 6 }]}>Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.headerTitle}>Detalhe da Ocorrência</Text>

      {/* Ações */}
      <View style={styles.headerActions}>
        {canEdit && onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.headerButtonText}>Editar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.headerButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
