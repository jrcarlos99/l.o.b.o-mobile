import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import LayoutWrapper from "@/components/LayoutWrapper";
import { OccurrencesList } from "@/components/occurrence/occurrences/OccurrencesList";
import OccurrenceDetailsModal from "@/components/OccurrenceDetails";
import { usePermission } from "@/hooks/usePermission";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { fetchOccurrences } from "@/services/occurrences";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import {
  Occurrence,
  OccurrenceStatus,
  OccurrenceType,
} from "@/types/OccurrenceType";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//  IMPORTS DO MODO OFFLINE
import {
  listarOcorrenciasOffline,
  OcorrenciaOffline,
} from "@/src/database/repositories/ocorrenciasRepository";
import { temInternet } from "@/src/database/repositories/syncRepository";

export default function OccurrencesPage() {
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

  const { isAdmin, isChefe, isOperador, canAccessRegion, user } =
    usePermission();
  const adminOrChefe = isAdmin() || isChefe();

  const insets = useSafeAreaInsets();
  const customBottomPadding = insets.bottom + 75 + 10;

  // ✅ Mapeia ocorrência offline → ocorrência normal
  function mapOfflineToOccurrence(o: OcorrenciaOffline): Occurrence {
    return {
      id: o.id!,
      titulo: o.titulo ?? null,
      descricao: o.descricao ?? "",
      solicitante: undefined,
      regiao: o.regiao ?? null,
      cidade: "Offline",

      status: (o.status as OccurrenceStatus) ?? "ABERTA",
      tipo: (o.tipo as OccurrenceType) ?? "COMUNICACAO",

      dataHoraAbertura: o.dataCriacao,
      dataHoraAtualizacao: o.dataCriacao,

      latitude: o.latitude ?? 0,
      longitude: o.longitude ?? 0,

      historico: [],
      criadoPor: undefined,
      atualizadoPor: undefined,
      anexos: [],
    };
  }

  // ✅ Atualiza filtros
  const updateFilters = useCallback((next: OccurrenceFilters) => {
    setFilters(next);
    setPage(0);
    setOccurrences([]);
  }, []);

  // ✅ Carrega ocorrências (ONLINE + OFFLINE)
  // ✅ Carrega ocorrências (ONLINE + OFFLINE)
  const loadOccurrences = useCallback(async () => {
    console.log("🔄 [loadOccurrences] Iniciando carregamento...");
    console.log("📄 [loadOccurrences] Filtros:", filters);
    console.log("📄 [loadOccurrences] Página:", page);

    try {
      setLoading(true);

      const online = await temInternet();
      console.log("🌐 [loadOccurrences] Online?", online);

      const offlinePendentes = await listarOcorrenciasOffline();
      console.log(
        "📦 [loadOccurrences] Offline encontradas:",
        offlinePendentes.length
      );

      const offlineMapped = offlinePendentes.map(mapOfflineToOccurrence);

      if (!online) {
        console.log("📴 [loadOccurrences] Modo offline → exibindo SQLite");
        setOccurrences(offlineMapped);
        setHasMore(false);
        return;
      }

      const token = await AsyncStorage.getItem("token");
      console.log("🔑 [loadOccurrences] Token existe?", !!token);
      if (!token) throw new Error("Token não encontrado");

      const data = await fetchOccurrences(token, filters, page, 20);
      console.log("📡 [loadOccurrences] Resposta backend:", data);

      if (!data || !data.content) {
        console.log(
          "⚠️ [loadOccurrences] Sem dados do backend → usando offline"
        );
        setOccurrences(offlineMapped);
        setHasMore(false);
        return;
      }

      console.log(
        "✅ [loadOccurrences] Conteúdo recebido:",
        data.content.length
      );

      setOccurrences((prev) => {
        const merged =
          page === 0
            ? [...offlineMapped, ...data.content]
            : [...prev, ...data.content];

        console.log("📊 [loadOccurrences] Total após merge:", merged.length);

        const unique = merged.filter(
          (item, index, self) =>
            index === self.findIndex((o) => o.id === item.id)
        );

        return unique;
      });

      setHasMore(page + 1 < data.totalPages);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as ocorrências.");
      console.log("❌ [loadOccurrences] Erro:", error);
    } finally {
      console.log("✅ [loadOccurrences] Finalizado");
      setLoading(false);
    }
  }, [filters, page]);

  // ✅ Carrega ao montar a tela
  useEffect(() => {
    console.log("🚀 [useEffect] Tela montada → carregando ocorrências");
    loadOccurrences();
  }, []);

  // ✅ Recarrega quando filtros ou página mudam
  useEffect(() => {
    console.log("🔁 [useEffect] Filtros ou página mudaram → recarregando");
    loadOccurrences();
  }, [filters, page]);

  // ✅ Recarrega quando filtros ou página mudam

  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const current = segments.join("/");
    console.log("📍 [ExpoRouter] Segmento atual:", current);

    // Ajuste para o caminho real da sua tela
    if (current === "(tabs)/occurrences") {
      console.log("🎯 [ExpoRouter] Tela de ocorrências ativa → carregando...");
      loadOccurrences();
    }
  }, [segments, navigationState, loadOccurrences]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  // ✅ Carrega anexos
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

  // ✅ Atualiza status
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

  // ✅ ADMIN e CHEFE veem tudo; operador vê só sua região
  const filteredOccurrences = adminOrChefe
    ? occurrences
    : occurrences.filter((o) => o.regiao && canAccessRegion(o.regiao));

  return (
    <ProtectedRoute allowedRoles={["OPERADOR", "CHEFE", "ADMIN"]}>
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

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#6C2020"
              style={{ marginTop: 40 }}
            />
          ) : filteredOccurrences.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              Nenhuma ocorrência encontrada.
            </Text>
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
                onEdit={(function () {
                  const canEdit =
                    adminOrChefe ||
                    (isOperador() && selectedOccurrence.criadoPor === user?.id);
                  if (!canEdit) return undefined;
                  return (occ: Occurrence) => {
                    setModalVisible(false);
                    router.push({
                      pathname: "/occurrences/edit/[id]",
                      params: { id: occ.id.toString() },
                    });
                  };
                })()}
                onChangeStatus={(function () {
                  const canConclude =
                    adminOrChefe ||
                    (isOperador() && selectedOccurrence.criadoPor === user?.id);
                  if (!canConclude) return undefined;
                  return async (occ: Occurrence, status: string) => {
                    await updateOccurrenceStatus(occ.id, status);
                    Alert.alert(
                      "Status atualizado",
                      `A ocorrência foi marcada como ${
                        status === "CONCLUIDO" ? "concluída" : "atualizada"
                      }`
                    );
                    setModalVisible(false);
                  };
                })()}
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
