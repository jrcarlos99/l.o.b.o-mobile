import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import LayoutWrapper from "@/components/LayoutWrapper";
import { OccurrencesList } from "@/components/occurrence/occurrences/OccurrencesList";
import OccurrenceDetailsModal from "@/components/OccurrenceDetails";
import { usePermission } from "@/hooks/usePermission";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { fetchOccurrences } from "@/services/occurrences";
import { useAuthStore } from "@/store/authStore";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import { Occurrence } from "@/types/OccurrenceType";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OccurrencesPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OccurrenceFilters>({});
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<Occurrence | null>(null);
  const [selectedOccurrenceAnexos, setSelectedOccurrenceAnexos] = useState<
    any[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { isAdmin, isChefe, canAccessRegion } = usePermission();
  const adminOrChefe = isAdmin() || isChefe();

  const insets = useSafeAreaInsets();
  const customBottomPadding = insets.bottom + 75 + 10;

  //  Quando filtros mudam, resetamos paginação
  const updateFilters = useCallback((next: OccurrenceFilters) => {
    setFilters(next);
    setPage(0);
    setOccurrences([]);
  }, []);

  //  Carrega ocorrências com paginação
  const loadOccurrences = useCallback(async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const data = await fetchOccurrences(token, filters, page, 20);

      setOccurrences((prev: Occurrence[]) => {
        const merged: Occurrence[] =
          page === 0 ? data.content : [...prev, ...data.content];

        //  Remove duplicados por ID
        const unique: Occurrence[] = merged.filter(
          (item: Occurrence, index: number, self: Occurrence[]) =>
            index === self.findIndex((o: Occurrence) => o.id === item.id)
        );

        return unique;
      });

      setHasMore(page + 1 < data.totalPages);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as ocorrências.");
      console.error("Erro ao carregar ocorrências:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  // Recarrega quando filtros ou página mudam
  useEffect(() => {
    loadOccurrences();
  }, [loadOccurrences]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  //  Carrega anexos da ocorrência selecionada
  async function loadAnexos(occId: number) {
    const { data, error } = await supabase
      .from("ocorrencia_anexos")
      .select("*")
      .eq("ocorrencia_id", occId);

    if (error) {
      console.error("Erro ao carregar anexos:", error);
      return;
    }

    setSelectedOccurrenceAnexos(data ?? []);
  }

  //  Atualiza status da ocorrência
  async function updateOccurrenceStatus(id: number, status: string) {
    const { data, error } = await supabase
      .from("ocorrencia")
      .update({
        status,
        data_hora_atualizacao: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status.");
      return;
    }

    setOccurrences((prev) => {
      const filtered = prev.filter((o) => o.id !== id);
      return [data as Occurrence, ...filtered];
    });

    await loadOccurrences();
  }

  //  Renderiza filtros ativos
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

  //  ADMIN e CHEFE veem tudo
  const filteredOccurrences = adminOrChefe
    ? occurrences
    : occurrences.filter((o) => o.regiao && canAccessRegion(o.regiao));

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
              onSelect={async (occurrence) => {
                if (
                  !adminOrChefe &&
                  !(occurrence.regiao && canAccessRegion(occurrence.regiao))
                ) {
                  Alert.alert(
                    "Acesso negado",
                    "Você não tem permissão visualizar ocorrências de outra região."
                  );
                  return;
                }

                setSelectedOccurrence(occurrence);
                await loadAnexos(occurrence.id);
                setModalVisible(true);
              }}
            />
          )}

          {selectedOccurrence &&
            (adminOrChefe ||
              (selectedOccurrence.regiao &&
                canAccessRegion(selectedOccurrence.regiao))) && (
              <OccurrenceDetailsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                occurrence={selectedOccurrence}
                anexos={selectedOccurrenceAnexos}
                onEdit={(occ: Occurrence) => {
                  setModalVisible(false);
                  router.push({
                    pathname: "/occurrences/edit/[id]",
                    params: { id: occ.id.toString() },
                  });
                }}
                onChangeStatus={async (occ: Occurrence, status: string) => {
                  await updateOccurrenceStatus(occ.id, status);
                  Alert.alert(
                    "Status atualizado",
                    `A ocorrência foi marcada como ${
                      status === "CONCLUIDO" ? "concluida" : "atualizada"
                    }`
                  );
                  setModalVisible(false);
                }}
                onOpenMap={(lat: number, lon: number) => {
                  Linking.openURL(
                    `https://www.google.com/maps?q=${lat},${lon}`
                  );
                }}
              />
            )}
        </LayoutWrapper>
      </View>
    </ProtectedRoute>
  );
}
