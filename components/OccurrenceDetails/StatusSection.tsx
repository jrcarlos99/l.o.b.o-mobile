import React from "react";
import { Text, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type Props = {
  status: string;
};

function getStatusColor(status: string) {
  switch (status) {
    case "PENDENTE":
      return "#FFA500";
    case "EM_ANDAMENTO":
      return "#007BFF";
    case "CONCLUIDO":
    case "CONCLUIDA":
      return "#28A745";
    case "CANCELADO":
    case "CANCELADA":
      return "#DC3545";
    default:
      return "#6C2020";
  }
}

export function StatusSection({ status }: Props) {
  const safeStatus = status || "Indefinido";

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Status</Text>
      <Text style={[styles.statusText, { color: getStatusColor(safeStatus) }]}>
        {safeStatus}
      </Text>
    </View>
  );
}
