import AvatarMenu from "@/components/Header/AvatarMenu";
import HeaderSimple from "@/components/Header/HeaderSimple";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Dados dos tipos de relatórios
const reportTypes = [
  {
    id: 1,
    title: "Atendimento Básico",
    color: "#00968A",
    route: "forms/basico",
  },
  {
    id: 2,
    title: "Folha de Histórico",
    color: "#A29F90",
    route: "forms/historico",
  },
  {
    id: 3,
    title: "Pré-Hospitalar",
    color: "#00968A",
    route: "forms/prehospitalar",
  },
  { id: 4, title: "Incêndio", color: "#951B2A", route: "forms/incendio" },
  { id: 5, title: "Salvamento", color: "#FE9900", route: "forms/salvamento" },
  { id: 6, title: "Mergulho", color: "#FE9900", route: "forms/mergulho" },
  {
    id: 7,
    title: "Produtos Perigosos",
    color: "#FFB901",
    route: "forms/produtos-perigosos",
  },
  { id: 8, title: "Prevenção", color: "#6AC66F", route: "forms/prevencao" },
  {
    id: 9,
    title: "Atividade Comunitária",
    color: "#C4953B",
    route: "forms/atividade-comunitaria",
  },
];

export default function ReportsScreen() {
  const user = useAuthStore((s) => s.user);
  const [formattedDate, setFormattedDate] = useState("");
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const customBottomPadding = insets.bottom + 75 + 10;

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    setFormattedDate(`${day}/${month}/${year}`);
  }, []);

  const handleReportTypePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ProtectedRoute allowedRoles={["OPERADOR", "CHEFE", "ADMIN"]}>
      <View style={{ flex: 1, paddingBottom: customBottomPadding }}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <HeaderSimple
              title="Relatórios"
              avatarUrl={user?.avatar_url ?? "https://placehold.co/100x100/png"}
              formattedDate={formattedDate}
              onDatePress={() => {}}
              onNotificationsPress={() => {}}
              onAvatarPress={() => setAvatarMenuVisible(true)}
              onLogoPress={() => router.push("/")}
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
                      { backgroundColor: item.color },
                      index === reportTypes.length - 1 && styles.fullWidthItem,
                    ]}
                    onPress={() => handleReportTypePress(item.route)}
                  >
                    <Text style={styles.gridText}>{item.title}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <AvatarMenu
            visible={avatarMenuVisible}
            onClose={() => setAvatarMenuVisible(false)}
          />
        </SafeAreaView>
      </View>
    </ProtectedRoute>
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
    padding: 16,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
