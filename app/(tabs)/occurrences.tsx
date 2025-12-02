import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import LayoutWrapper from "@/components/LayoutWrapper";
import { OccurrencesList } from "@/components/occurrence/occurrences/OccurrencesList";
import OccurrenceDetailsModal from "@/components/OccurrenceDetailsModal";
import { fetchOccurrences } from "@/services/occurrences";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import { Occurrence } from "@/types/OccurrenceType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

export default function OccurrencesPage() {
  const [avatarUrl] = useState("https://github.com/jrcarlos99.png");
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OccurrenceFilters>({});
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<Occurrence | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const updateFilters = useCallback((next: OccurrenceFilters) => {
    setFilters(next);
    setPage(0);
    setOccurrences([]);
  }, []);

  const loadOccurrences = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const data = await fetchOccurrences(token, filters, page, 20);
      setOccurrences((prev) =>
        page === 0 ? data.content : [...prev, ...data.content]
      );
      setHasMore(page + 1 < data.totalPages);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as ocorrências.");
      console.error("Erro ao carregar ocorrências:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    loadOccurrences();
  }, [loadOccurrences]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  // const handleFilters = async () => {
  //   try {
  //     setLoading(true);
  //     const token = await AsyncStorage.getItem("token");
  //     if (!token) throw new Error("Token não encontrado");

  //     const data = await fetchOccurrences(token, filters);
  //     setOccurrences(data);
  //   } catch (error) {
  //     Alert.alert("Erro", "Não foi possível aplicar os filtros.");
  //     console.error("Erro ao aplicar filtros:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   loadOccurrences();
  // }, []);

  function ActiveFilters({ filters }: { filters: OccurrenceFilters }) {
    const parts: string[] = [];

    if (filters.tipo) parts.push(`Tipo: ${filters.tipo}`);
    if (filters.status) parts.push(`Status: ${filters.status}`);
    if (filters.regiao) parts.push(`Região: ${filters.regiao}`);
    if (filters.dataInicio && filters.dataFim) {
      const inicio = filters.dataInicio.toLocaleDateString("pt-BR");
      const fim = filters.dataFim.toLocaleDateString("pt-BR");
      parts.push(`Período: ${inicio} até ${fim}`);
    }

    if (parts.length === 0) return null;

    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text style={{ fontSize: 14, color: "#6C2020", fontWeight: "600" }}>
          Filtros ativos: {parts.join(" | ")}
        </Text>
      </View>
    );
  }

  return (
    <LayoutWrapper
      header={
        <HeaderWithFilters
          avatarUrl={avatarUrl}
          title="Minhas Ocorrências"
          onFiltersChange={updateFilters}
        />
      }
    >
      <ActiveFilters filters={filters} />
      {occurrences.length === 0 && loading ? (
        <ActivityIndicator
          size="large"
          color="#6C2020"
          style={{ marginTop: 40 }}
        />
      ) : (
        <OccurrencesList
          data={occurrences}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={loading}
          onSelect={(occurrence) => {
            setSelectedOccurrence(occurrence);
            setModalVisible(true);
          }}
        />
      )}

      {selectedOccurrence && (
        <OccurrenceDetailsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          occurrence={selectedOccurrence}
        />
      )}
    </LayoutWrapper>
  );
}
