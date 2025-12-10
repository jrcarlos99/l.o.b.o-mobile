import { Platform } from "react-native";

export async function showLocalNotification(remoteMessage: any) {
  if (Platform.OS !== "android") return;

  const { title, body } = remoteMessage.notification || {};

  const { NotificationManager } = require("react-native").NativeModules;

  if (!NotificationManager || !NotificationManager.presentLocalNotification) {
    console.log("❌ NotificationManager não disponível");
    return;
  }

  NotificationManager.presentLocalNotification({
    title: title || "Notificação",
    message: body || "",
    channelId: "default",
    playSound: true,
    soundName: "default",
    priority: "high",
    importance: "high",
  });
}
