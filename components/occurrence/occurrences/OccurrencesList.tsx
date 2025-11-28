import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import { SectionList, StyleSheet, Text } from "react-native";
import OccurrenceCard from "./OccurrenceCard";

type Occurrence = {
  id: number;
  tipo: string;
  titulo: string;
  descricao: string;
  cidade: string;
  regiao: string;
  status: string;
  dataHoraAbertura: string;
};

function groupByMonth(occurrences: Occurrence[]) {
  const groups: Record<string, Occurrence[]> = {};

  occurrences.forEach((occ) => {
    if (!occ.dataHoraAbertura) return;

    let date: Date;
    try {
      date = parseISO(occ.dataHoraAbertura);
    } catch {
      return;
    }

    const key = format(date, "MMMM yyyy", { locale: ptBR });

    if (!groups[key]) groups[key] = [];
    groups[key].push(occ);
  });

  return Object.entries(groups).map(([title, data]) => ({ title, data }));
}

export function OccurrencesList({ data, headerOffset }: any) {
  const grouped = groupByMonth(data);

  return (
    <SectionList
      sections={grouped}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      renderItem={({ item }) => <OccurrenceCard data={item} />}
      contentContainerStyle={{
        paddingTop: headerOffset + 16,
        paddingBottom: 80,
      }}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6C2020",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
