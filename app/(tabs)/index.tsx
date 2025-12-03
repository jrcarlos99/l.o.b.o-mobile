import CustomMap from "@/components/CustomMap";
import DashboardCarousel from "@/components/DashboardCarroussel";
import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { fetchDashboardStats } from "@/services/dashboard";
import { fetchOccurrences } from "@/services/occurrences";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/IndexStyles";

import { useUser } from "@/context/UserContext";

type Occurrence = {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
};

export default function Index() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filters, setFilters] = useState<OccurrenceFilters>({});
  const [tipoData, setTipoData] = useState<any>(null);
  const [regiaoData, setRegiaoData] = useState<any>(null);
  const [turnoData, setTurnoData] = useState<any>(null);
  const [statusData, setStatusData] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const { user } = useUser();

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const handleFilters = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      //  busca estatísticas
      const stats = await fetchDashboardStats(token, filters);
      processStats(stats);

      //  busca ocorrências
      const occs = await fetchOccurrences(token, filters);

      const mapped = Array.isArray(occs.content)
        ? occs.content.map((o: any) => ({
            id: String(o.id),
            latitude: o.latitude,
            longitude: o.longitude,
            title: o.titulo,
          }))
        : occs
        ? [
            {
              id: String(occs.id),
              latitude: occs.latitude,
              longitude: occs.longitude,
              title: occs.titulo,
            },
          ]
        : [];

      setOccurrences(mapped);
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      Alert.alert(
        "Aviso",
        "Servidor indisponível, não foi possível carregar estatísticas."
      );
    }
  }, [filters]);

  const processStats = (stats: any) => {
    const regiaoColors = [
      "#F44336",
      "#2196F3",
      "#4CAF50",
      "#FF9800",
      "#009688",
    ];
    const turnoColors = ["#FF9800", "#3F51B5", "#009688"];

    setTotal(stats.totalOcorrencias || 0);

    const tipoLabels = Object.keys(stats.porTipo || {});
    const tipoValues = Object.values(stats.porTipo || {});
    setTipoData({
      labels: tipoLabels,
      datasets: [{ data: tipoValues }],
    });

    const statusLabels = Object.keys(stats.porStatus || {});
    const statusValues = Object.values(stats.porStatus || {});
    setStatusData({
      labels: statusLabels,
      datasets: [{ data: statusValues }],
    });

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
  };

  useEffect(() => {
    handleFilters();
  }, [handleFilters]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#E5E4E4", dark: "#E5E4E4" }}
        headerImage={
          <HeaderWithFilters
            avatarUrl={user?.avatar_url ?? "https://placehold.co/100x100/png"}
            title="Estatísticas"
            onFiltersChange={setFilters}
          />
        }
      >
        {tipoData && regiaoData && turnoData && statusData && (
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

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.mapSection}>
          <Text style={styles.mapTitle}>MAPA</Text>

          {/* Subtítulo com contagem */}
          <Text style={styles.mapSubtitle}>
            Exibindo {occurrences.length} ocorrência
            {occurrences.length !== 1 ? "s" : ""} filtrada
            {occurrences.length !== 1 ? "s" : ""}
          </Text>

          {/* Legenda de cores por status */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "red" }]} />
              <Text style={styles.legendLabel}>PENDENTE</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "orange" }]} />
              <Text style={styles.legendLabel}>EM ANDAMENTO</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "green" }]} />
              <Text style={styles.legendLabel}>CONCLUÍDO</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "gray" }]} />
              <Text style={styles.legendLabel}>CANCELADO</Text>
            </View>
          </View>

          {/* Botão para limpar filtros */}
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
  );
}
