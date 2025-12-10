import { Occurrence } from "@/types/OccurrenceType";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import { ActivityIndicator, SectionList, StyleSheet, Text } from "react-native";
import OccurrenceCard from "./OccurrenceCard";

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

  return Object.entries(groups).map(([title, data]) => ({
    title,
    data,
  }));
}

type Props = {
  data: Occurrence[];
  headerOffset?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  onSelect?: (occurrence: Occurrence) => void;
};

export function OccurrencesList({
  data,
  headerOffset,
  onLoadMore,
  hasMore,
  loading,
  onSelect,
}: Props) {
  const grouped = groupByMonth(data);
  return (
    <SectionList
      sections={grouped}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      renderItem={({ item }) => (
        <OccurrenceCard data={item} onSelect={onSelect} />
      )}
      onEndReached={() => {
        if (hasMore && !loading && onLoadMore) {
          onLoadMore();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading && hasMore ? (
          <ActivityIndicator
            size="small"
            color="#6C2020"
            style={{ margin: 16 }}
          />
        ) : null
      }
      contentContainerStyle={{
        paddingTop: (headerOffset ?? 0) + 16,
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
