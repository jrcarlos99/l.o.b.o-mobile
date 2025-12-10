import { Ionicons } from "@expo/vector-icons"; // Para o ícone de '+'
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Tipo ajustado para incluir a diferença no nome da propriedade (body -> message)
export type NotificationItem = {
  id: string;
  title: string;
  body: string; // Mantendo 'body' para o listener do Expo
  message?: string; // Adicionando 'message' para renderização de API/Mock
  date: string;
};

type Props = {
  // Tornando 'data' opcional para que o componente ainda funcione se o useEffect carregar a lista
  initialData?: Omit<NotificationItem, "body">[];
};

// Componente para renderizar um item individual (Card)
const NotificationCard: React.FC<Omit<NotificationItem, "body">> = ({
  title,
  message,
  date,
}) => {
  return (
    <View style={styles.card}>
      {/* Ícone de '+' no círculo, como no design */}
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="add-circle" size={24} color="#6C2020" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        {/* Usamos 'message' ou 'body' dependendo da origem do dado */}
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export default function NotificationList({ initialData = [] }: Props) {
  // Inicializamos com os dados passados ou um array vazio
  const [notifications, setNotifications] = useState(
    initialData.map((item) => ({
      ...item,
      body: item.message || "",
    })) as NotificationItem[]
  );

  // Lógica para capturar notificações recebidas em tempo real
  useEffect(() => {
    // Registra o listener para adicionar notificações *enquanto* o usuário está na tela
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        // Formatando a data de forma simples (você pode querer ajustar para o formato do seu design)
        const timestamp = new Date()
          .toLocaleString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(".", "")
          .replace(",", " às"); // Tentativa de simular o formato '24 Set 2025 às 17:23 PM'

        setNotifications((prev) => [
          {
            id: notification.request.identifier,
            title: title || "Sem título",
            body: body || "Sem conteúdo", // O body é usado internamente pelo listener
            message: body || "Sem conteúdo", // Mapeamos para 'message' para renderização
            date: timestamp,
          },
          ...prev, // Coloca a mais nova no topo
        ]);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotificationCard
          id={item.id}
          title={item.title}
          message={item.body || item.message || "Detalhes não disponíveis"} // Usa body (do Expo) ou message (da API)
          date={item.date}
        />
      )}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você não tem notificações.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconContainer: {
    marginRight: 15,
    paddingTop: 5,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C2020", // Cor principal do título (Sua cor)
  },
  date: {
    fontSize: 12,
    color: "#878787", // Cor secundária para datas (Sua cor)
  },
  message: {
    fontSize: 14,
    color: "#6C7278", // Cor para o texto da mensagem (Sua cor)
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#878787",
  },
});
