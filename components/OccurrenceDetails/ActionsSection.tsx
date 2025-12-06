import { Occurrence } from "@/types/OccurrenceType";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  occurrence: Occurrence;
  onEdit: () => void;
  onChangeStatus?: (status: string) => void;
};

export function ActionsSection({ occurrence, onEdit, onChangeStatus }: Props) {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        onPress={onEdit}
        style={[styles.actionButton, styles.actionSecondary]}
      >
        <Text style={[styles.actionButtonText, styles.actionSecondaryText]}>
          Editar
        </Text>
      </TouchableOpacity>

      {onChangeStatus && (
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
