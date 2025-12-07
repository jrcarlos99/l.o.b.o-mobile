import { useAuthStore } from "@/store/authStore";
import { Occurrence } from "@/types/OccurrenceType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  occurrence: Occurrence;
  onEdit?: () => void;
  onChangeStatus?: (status: string) => void;
};

export function ActionsSection({ occurrence, onEdit, onChangeStatus }: Props) {
  const user = useAuthStore((s) => s.user);
  const isOperador = user?.perfil === "OPERADOR";
  const isOwner = user?.email === occurrence?.criadoPor;

  const canEdit = !isOperador || isOwner;

  return (
    <View style={styles.actionsContainer}>
      {!canEdit && (
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="lock" size={16} color="gray" />
            <Text style={{ marginLeft: 6, color: "gray", fontStyle: "italic" }}>
              Somente leitura — você não pode editar esta ocorrência
            </Text>
          </View>
        </View>
      )}

      {onEdit && canEdit && (
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.actionButton, styles.actionSecondary]}
        >
          <Text style={[styles.actionButtonText, styles.actionSecondaryText]}>
            Editar
          </Text>
        </TouchableOpacity>
      )}

      {onChangeStatus && canEdit && (
        <>
          <TouchableOpacity
            onPress={() => onChangeStatus("CONCLUIDO")}
            style={[styles.actionButton, styles.actionPrimary]}
          >
            <Text style={[styles.actionButtonText, styles.actionPrimaryText]}>
              Concluir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onChangeStatus("CANCELADO")}
            style={[styles.actionButton, styles.actionSecondary]}
          >
            <Text style={[styles.actionButtonText, styles.actionSecondaryText]}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
