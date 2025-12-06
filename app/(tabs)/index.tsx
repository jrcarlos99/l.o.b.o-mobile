import CustomMap from "@/components/CustomMap";
import DashboardCarousel from "@/components/DashboardCarroussel";
import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { fetchDashboardStats } from "@/services/dashboard";
import { fetchOccurrences } from "@/services/occurrences";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../../styles/IndexStyles";

import { usePermission } from "@/hooks/usePermission";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";

type Occurrence = {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  regiao?: string;
};

export default function Index() {
  const [filters, setFilters] = useState<OccurrenceFilters>({});
  const [tipoData, setTipoData] = useState<any>(null);
  const [regiaoData, setRegiaoData] = useState<any>(null);
  const [turnoData, setTurnoData] = useState<any>(null);
  const [statusData, setStatusData] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hasHydrated);

  const { isAdmin, isChefe, canAccessRegion } = usePermission();
  const adminOrChefe = isAdmin() || isChefe();

  const insets = useSafeAreaInsets();
  const customBottomPadding = insets.bottom + 75 + 10;

  // ✅ processStats agora é useCallback para evitar recriação desnecessária
  const processStats = useCallback(
    (stats: any) => {
      const regiaoColors = [
        "#F44336",
        "#2196F3",
        "#4CAF50",
        "#FF9800",
        "#009688",
      ];
      const turnoColors = ["#FF9800", "#3F51B5", "#009688"];

      setTotal(stats.totalOcorrencias || 0);

      setTipoData({
        labels: Object.keys(stats.porTipo || {}),
        datasets: [{ data: Object.values(stats.porTipo || {}) }],
      });

      setStatusData({
        labels: Object.keys(stats.porStatus || {}),
        datasets: [{ data: Object.values(stats.porStatus || {}) }],
      });

      // ✅ ADMIN e CHEFE veem gráfico de regiões
      if (adminOrChefe) {
        const regiaoDataArray = Object.entries(stats.porRegiao || {}).map(
          ([name, population], i) => ({
            name,
            population,
            color: regiaoColors[i % regiaoColors.length],
            legendFontColor: "#333",
            legendFontSize: 12,
          })
        );
        setRegiaoData(regiaoDataArray);
      } else {
        setRegiaoData(null);
      }

      const turnoDataArray = Object.entries(stats.porTurno || {}).map(
        ([name, population], i) => ({
          name,
          population,
          color: turnoColors[i % turnoColors.length],
          legendFontColor: "#333",
          legendFontSize: 12,
        })
      );
      setTurnoData(turnoDataArray);
    },
    [adminOrChefe]
  );

  // ✅ handleFilters corrigido e estável
  const handleFilters = useCallback(async () => {
    try {
      if (!token) throw new Error("Token não encontrado");

      // ✅ Busca estatísticas
      const stats = await fetchDashboardStats(token, filters);

      // ✅ ANALISTA só vê sua região
      if (!adminOrChefe) {
        const region = user?.regiaoAutorizada?.trim().toUpperCase();

        stats.porRegiao = region
          ? { [region]: stats.porRegiao?.[region] ?? 0 }
          : {};
      }

      processStats(stats);

      // ✅ Busca ocorrências
      const occs = await fetchOccurrences(token, filters);

      const mapped = Array.isArray(occs.content)
        ? occs.content.map((o: any) => ({
            id: String(o.id),
            latitude: o.latitude,
            longitude: o.longitude,
            title: o.titulo,
            regiao: o.regiao,
          }))
        : [];

      // ✅ ADMIN e CHEFE veem tudo
      const filtered = adminOrChefe
        ? mapped
        : mapped.filter((o: Occurrence) => canAccessRegion(o.regiao ?? ""));

      setOccurrences(filtered);
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      Alert.alert(
        "Aviso",
        "Servidor indisponível, não foi possível carregar estatísticas."
      );
    }
  }, [filters, adminOrChefe, user, canAccessRegion, processStats, token]);

  // ✅ Agora só roda quando:
  // - Zustand hidratou
  // - Token existe
  useEffect(() => {
    if (!hydrated) return;
    if (!token) return;
    handleFilters();
  }, [hydrated, token, handleFilters]);

  return (
    <ProtectedRoute>
      <View style={{ flex: 1, paddingBottom: customBottomPadding }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ParallaxScrollView
            headerBackgroundColor={{ light: "#E5E4E4", dark: "#E5E4E4" }}
            headerImage={
              <HeaderWithFilters
                avatarUrl={
                  user?.avatar_url ?? "https://placehold.co/100x100/png"
                }
                title="Estatísticas"
                onFiltersChange={setFilters}
              />
            }
          >
            {tipoData && turnoData && statusData && (
              <View style={styles.chartsContainer}>
                <DashboardCarousel
                  tipoData={tipoData}
                  regiaoData={regiaoData}
                  turnoData={turnoData}
                  statusData={statusData}
                  total={total}
                />
              </View>
            )}

            <View style={styles.mapSection}>
              <Text style={styles.mapTitle}>MAPA</Text>

              <Text style={styles.mapSubtitle}>
                Exibindo {occurrences.length} ocorrência
                {occurrences.length !== 1 ? "s" : ""} filtrada
                {occurrences.length !== 1 ? "s" : ""}
              </Text>

              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "red" }]}
                  />
                  <Text style={styles.legendLabel}>PENDENTE</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "orange" }]}
                  />
                  <Text style={styles.legendLabel}>EM ANDAMENTO</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "green" }]}
                  />
                  <Text style={styles.legendLabel}>CONCLUÍDO</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "gray" }]}
                  />
                  <Text style={styles.legendLabel}>CANCELADO</Text>
                </View>
              </View>

              <View style={styles.clearFiltersContainer}>
                <Button
                  title="Limpar filtros"
                  onPress={() => {
                    setFilters({});
                    handleFilters();
                  }}
                  color="#6C2020"
                />
              </View>

              <CustomMap occurrences={occurrences} />
            </View>
          </ParallaxScrollView>
        </SafeAreaView>
      </View>
    </ProtectedRoute>
  );
}
