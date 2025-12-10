import messaging from "@react-native-firebase/messaging";
import "expo-router/entry";

// ✅ Handler de mensagens em background
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("📩 Mensagem recebida em BACKGROUND:", remoteMessage);
});
