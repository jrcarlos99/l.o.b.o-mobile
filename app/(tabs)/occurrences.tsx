import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import LayoutWrapper from "@/components/LayoutWrapper";
import { OccurrencesList } from "@/components/occurrence/occurrences/OccurrencesList";
import { fetchOccurrences } from "@/services/occurrences";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import { Occurrence } from "@/types/OccurrenceType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

export default function OccurrencesPage() {
  const [avatarUrl] = useState("https://github.com/jrcarlos99.png");
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OccurrenceFilters>({});

  const updateFilters = useCallback((next: OccurrenceFilters) => {
    setFilters(next);
  }, []);

  const loadOccurrences = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const data = await fetchOccurrences(token);
      setOccurrences(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as ocorrências.");
      console.error("Erro ao carregar ocorrências:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const data = await fetchOccurrences(token, filters);
      setOccurrences(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível aplicar os filtros.");
      console.error("Erro ao aplicar filtros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOccurrences();
  }, []);

  return (
    <LayoutWrapper
      header={
        <HeaderWithFilters
          avatarUrl={avatarUrl}
          title="Minhas Ocorrências"
          onFilterPress={handleFilters}
          onFiltersChange={updateFilters}
        />
      }
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6C2020"
          style={{ marginTop: 40 }}
        />
      ) : (
        <OccurrencesList data={occurrences} />
      )}
    </LayoutWrapper>
  );
}
