import React from "react";
import { Text, View } from "react-native";
import { occurrenceDetailsStyles as styles } from "./styles";

type TimelineItem = {
  time: string;
  label: string;
};

type Props = {
  timeline: TimelineItem[];
};

function formatTime(isoString: string): string {
  if (!isoString || isoString.trim() === "") return "--:--";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "--:--";

  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TimelineSection({ timeline }: Props) {
  const hasItems = timeline && timeline.length > 0;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>📍 Linha do Tempo</Text>

      {!hasItems && <Text style={styles.empty}>Nenhum evento registrado.</Text>}

      {hasItems &&
        timeline.map((item, index) => (
          <Text key={index} style={styles.timelineItem}>
            • {formatTime(item.time)} - {item.label}
          </Text>
        ))}
    </View>
  );
}
