import {
  CustomBarChart,
  CustomPieChart,
  CustomTotalChart,
} from "@/components/charts";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  const tipoData = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [{ data: [10, 20, 30, 40, 50] }],
  };
  const regiaoData = [
    {
      name: "Norte",
      population: 30,
      color: "#F44336",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Centro",
      population: 45,
      color: "#2196F3",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Sul",
      population: 25,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];
  const turnoData = [
    {
      name: "Manhã",
      population: 25,
      color: "#FF9800",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Tarde",
      population: 35,
      color: "#3F51B5",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Noite",
      population: 40,
      color: "#009688",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estatísticas Detalhadas</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tipo</Text>
        <CustomBarChart data={tipoData} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Região</Text>
        <CustomPieChart data={regiaoData} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Turno</Text>
        <CustomPieChart data={turnoData} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Ocorrências</Text>
        <CustomTotalChart total={163} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C2020",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    minHeight: 240,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
});
