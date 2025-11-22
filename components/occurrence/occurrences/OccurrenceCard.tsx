import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type Occurrence = {
  id: string;
  tipo: string;
  local: string;
  dataHora: string;
};

type Props = {
  data: Occurrence;
};

export default function OccurrenceCard({ data }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardId}>{data.id}</Text>
        <Text style={styles.cardTitle}>{data.tipo}</Text>
        <Text style={styles.cardLocal}>{data.local}</Text>
        <Text style={styles.cardDate}>{data.dataHora}</Text>
      </View>
      <Pressable
        onPress={() => Alert.alert("Detalhes", `Abrir ${data.tipo}`)}
        style={styles.cardButton}
      >
        <Text style={styles.cardDetails}>Detalhes {">"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  cardButton: {
    paddingLeft: 12,
  },
  cardDetails: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6C2020",
  },
});
