import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  date: string;
};

export default function NotificationList() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        const timestamp = new Date().toLocaleString("pt-BR");

        setNotifications((prev) => [
          {
            id: notification.request.identifier,
            title: title || "Sem título",
            body: body || "Sem conteúdo",
            date: timestamp,
          },
          ...prev,
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
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});
