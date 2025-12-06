import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import LayoutWrapper from "@/components/LayoutWrapper";
import { OccurrencesList } from "@/components/occurrence/occurrences/OccurrencesList";
import OccurrenceDetailsModal from "@/components/OccurrenceDetailsModal";
import { usePermission } from "@/hooks/usePermission";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { fetchOccurrences } from "@/services/occurrences";
import { useAuthStore } from "@/store/authStore";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import { Occurrence } from "@/types/OccurrenceType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OccurrencesPage() {
  const user = useAuthStore((s) => s.user);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OccurrenceFilters>({});
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<Occurrence | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { isAdmin, isChefe, canAccessRegion } = usePermission();
  const adminOrChefe = isAdmin() || isChefe();

  const insets = useSafeAreaInsets();
  const customBottomPadding = insets.bottom + 75 + 10;

  // ✅ Quando filtros mudam, resetamos paginação
  const updateFilters = useCallback((next: OccurrenceFilters) => {
    setFilters(next);
    setPage(0);
    setOccurrences([]);
  }, []);

  // ✅ Carrega ocorrências com paginação
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

  // ✅ Recarrega quando filtros ou página mudam
  useEffect(() => {
    loadOccurrences();
  }, [loadOccurrences]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  // ✅ Renderiza filtros ativos
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

  // ✅ ADMIN e CHEFE veem tudo
  const filteredOccurrences = adminOrChefe
    ? occurrences
    : occurrences.filter((o) => canAccessRegion(o.regiao));

  return (
    <ProtectedRoute allowedRoles={["USUARIO", "ANALISTA", "CHEFE", "ADMIN"]}>
      <View style={{ flex: 1, paddingBottom: customBottomPadding }}>
        <LayoutWrapper
          header={
            <HeaderWithFilters
              avatarUrl={user?.avatar_url ?? "https://placehold.co/100x100/png"}
              title="Minhas Ocorrências"
              onFiltersChange={updateFilters}
            />
          }
        >
          <ActiveFilters filters={filters} />

          {filteredOccurrences.length === 0 && loading ? (
            <ActivityIndicator
              size="large"
              color="#6C2020"
              style={{ marginTop: 40 }}
            />
          ) : (
            <OccurrencesList
              data={filteredOccurrences}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              loading={loading}
              onSelect={(occurrence) => {
                if (!adminOrChefe && !canAccessRegion(occurrence.regiao)) {
                  Alert.alert(
                    "Acesso negado",
                    "Você não tem permissão visualizar ocorrências de outra região."
                  );
                  return;
                }

                setSelectedOccurrence(occurrence);
                setModalVisible(true);
              }}
            />
          )}

          {selectedOccurrence &&
            (adminOrChefe || canAccessRegion(selectedOccurrence.regiao)) && (
              <OccurrenceDetailsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                occurrence={selectedOccurrence}
              />
            )}
        </LayoutWrapper>
      </View>
    </ProtectedRoute>
  );
}
