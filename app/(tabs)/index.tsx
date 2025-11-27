import HeaderWithFilters from "@/components/Header/HeaderWithFilters";
import { TotalLineChart } from "@/components/charts";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { fetchDashboardStats } from "@/services/dashboard";
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Platform, Text, View } from "react-native";
import { styles } from "../../styles/IndexStyles";

export default function Index() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filters, setFilters] = useState<OccurrenceFilters>({});
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const router = useRouter();

  const avatarUrl = "https://i.pravatar.cc/150?img=3";

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const handleFilters = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const stats = await fetchDashboardStats(token, filters);

      const newLabels = Object.keys(stats);
      const newValues = Object.values(stats).map((v) => Number(v));

      setLabels(newLabels);
      setValues(newValues);

      console.log("Estatísticas filtradas:", stats);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível aplicar os filtros.");
      console.error("Erro ao aplicar filtros:", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#E5E4E4", dark: "#E5E4E4" }}
      headerImage={
        <HeaderWithFilters
          avatarUrl={avatarUrl}
          title="Estatísticas"
          onFilterPress={handleFilters}
          onFiltersChange={setFilters}
        />
      }
    >
      <View style={styles.contentContainer}>
        <View style={styles.chartsContainer}>
          <Text style={styles.cardTitle}>Total de Ocorrências</Text>
          <TotalLineChart labels={labels} values={values} />
        </View>

        <Button
          title="Ver mais estatísticas"
          onPress={() => router.push("/dashboard")}
          color="#6C2020"
        />

        <View style={styles.chartsContainer}>
          <Text style={styles.cardTitle}>MAPA</Text>
          {/* Aqui você pode adicionar o mapa ou outro conteúdo */}
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </ParallaxScrollView>
  );
}
