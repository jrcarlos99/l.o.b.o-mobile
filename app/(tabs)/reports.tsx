import HeaderSimple from "@/components/Header/HeaderSimple";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const avatarUrl = "https://github.com/jrcarlos99.png";

// Dados dos tipos de relatórios
const reportTypes = [
  { id: 1, title: "Atendimento Básico" },
  { id: 2, title: "Folha de Histórico" },
  { id: 3, title: "Pré-Hospitalar" },
  { id: 4, title: "Incêndio" },
  { id: 5, title: "Salvamento" },
  { id: 6, title: "Mergulho" },
  { id: 7, title: "Produtos Perigosos" },
  { id: 8, title: "Prevenção" },
  { id: 9, title: "Atividade Comunitária" },
];

export default function ReportsScreen() {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Formatar data atual
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    setFormattedDate(`${day}/${month}/${year}`);
  }, []);

  const handleDatePress = () => {
    console.log("Date pressed");
  };

  const handleNotificationsPress = () => {
    console.log("Notifications pressed");
  };

  const handleReportTypePress = (reportType: string) => {
    console.log(`Selected: ${reportType}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderSimple
          title="Relatórios"
          avatarUrl={avatarUrl}
          formattedDate={formattedDate}
          onDatePress={handleDatePress}
          onNotificationsPress={handleNotificationsPress}
        />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Selecione o tipo de formulário que deseja preencher:
          </Text>

          <View style={styles.grid}>
            {reportTypes.map((item, index) => (
              <Pressable
                key={item.id}
                style={[
                  styles.gridItem,
                  index === reportTypes.length - 1 && styles.fullWidthItem,
                ]}
                onPress={() => handleReportTypePress(item.title)}
              >
                <Text style={styles.gridText}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E3E2DD",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#951B2A",
    padding: 16,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  fullWidthItem: {
    width: "100%",
  },
  gridText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
