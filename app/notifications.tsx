import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// ⚠️ ATENÇÃO: Verifique o caminho real do seu componente. Assumindo 'ui/NotificationList'

import NotificationList, {
  NotificationItem,
} from "@/components/NotificationsList";
import { Ionicons } from "@expo/vector-icons";

// Dados de Mock para simular notificações existentes (opcional, remova ao usar API)
const mockInitialData: Omit<NotificationItem, "body">[] = [
  {
    id: "m1",
    title: "Manutenção",
    message: "O sistema passará por manutenção programada amanhã.",
    date: "08 Dez 2025 às 10:00 PM",
  },
  {
    id: "m2",
    title: "Nova Ocorrência",
    message: "Ocorrência #35 registrada na Região RMR.",
    date: "08 Dez 2025 às 09:30 AM",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    // Volta para a tela anterior ou dashboard
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Notificações",
        }}
      />

      {/* Cabeçalho da Tela (Seguindo o design) */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#6C2020"
          onPress={handleBackPress}
        />
        <Text style={styles.title}>Notificações</Text>
      </View>

      <View style={styles.listWrapper}>
        {/* Renderiza o componente de lista. 
            Ele mostrará notificações passadas (mockInitialData)
            E adicionará notificações futuras (via listener)
        */}
        <NotificationList initialData={mockInitialData} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
    gap: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C2020",
  },
  listWrapper: {
    flex: 1,
    backgroundColor: "white",
  },
});
