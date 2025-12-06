import { Occurrence } from "@/types/OccurrenceType";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  data: Occurrence;
  onSelect?: (occurrence: Occurrence) => void;
};

export default function OccurrenceCard({ data, onSelect }: Props) {
  function getStatusColor(status: string) {
    switch (status) {
      case "PENDENTE":
        return "#FFA500";
      case "EM_ANDAMENTO":
        return "#007BFF";
      case "CONCLUIDO":
        return "#28A745";
      case "CANCELADO":
        return "#DC3545";
      default:
        return "#6C2020";
    }
  }

  function formatTipo(tipo: string) {
    return tipo
      .toLowerCase()
      .split("_")
      .map((word) => {
        if (word === "de") return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardId}>{data.id}</Text>
        <Text style={styles.cardTitle}>{formatTipo(data.tipo)}</Text>
        <Text style={styles.cardLocal}>
          {data.cidade && data.regiao
            ? `${data.cidade}, ${data.regiao}`
            : "Local não informado"}
        </Text>
        <Text style={styles.cardDate}>
          {new Date(data.dataHoraAbertura).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Text style={styles.cardDescription}>
          {data.descricao || "Sem descrição"}
        </Text>
        <Text
          style={[styles.cardStatus, { color: getStatusColor(data.status) }]}
        >
          {data.status}
        </Text>
      </View>

      <View style={styles.cardButtonWrapper}>
        <Pressable onPress={() => onSelect?.(data)}>
          <Text style={styles.cardDetails}>Detalhes {">"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    marginBottom: 8,
  },
  cardButtonWrapper: {
    alignItems: "flex-end",
  },
  cardId: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6C2020",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#333",
  },
  cardLocal: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#777",
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },

  cardButton: {
    paddingLeft: 8,
  },
  cardDetails: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#6C2020",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
});
