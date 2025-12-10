import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";

import { initializeDatabase } from "@/src/database/database";
import { tentarSincronizar } from "@/src/database/repositories/syncRepository";
import { ActivityIndicator, Platform, View } from "react-native";

import messaging from "@react-native-firebase/messaging";
// import safeAxios from "@/services/safeAxios"; // Assumindo que você tem um serviço de API

export const unstable_settings = {
  anchor: "(tabs)",
};

// 🔑 Função que você precisa adaptar para enviar o token ao seu Backend
const registerFCMToken = async (fcmToken: string) => {
  if (!fcmToken) return;
  console.log("FCM Token obtido:", fcmToken);

  // ⚠️ SUBSTITUA COM SUA CHAMADA DE API REAL PARA O BACKEND
  // Exemplo usando um serviço que requer autenticação (safeAxios):
  /*
  try {
    const response = await safeAxios.post('/user/register-push-token', {
      token: fcmToken,
    });
    console.log("Token FCM registrado com sucesso no Backend.");
  } catch (error) {
    console.error("Falha ao registrar token FCM no Backend:", error);
  }
  */

  // Mantenha este console.log se não tiver a API pronta para ver o token no console
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hasHydrated);

  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeDatabase();
      setDbReady(true);
    };

    init();
  }, []);

  useEffect(() => {
    if (!dbReady) return;

    const interval = setInterval(() => {
      tentarSincronizar();
    }, 15000);

    return () => clearInterval(interval);
  }, [dbReady]);

  useEffect(() => {
    initializeAuth();
  }, []);

  const isReady = rootNavigationState?.key != null && hydrated;
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!isReady || !dbReady) return;

    const current = segments[0] ?? "";

    const isAuthRoute =
      current === "login" ||
      current === "recuperar-senha" ||
      current === "codigo-acesso" ||
      current === "face-id";

    if (hasNavigated.current) return;

    if (!token && !isAuthRoute) {
      hasNavigated.current = true;
      router.replace("/login");
      return;
    }

    if (token && isAuthRoute) {
      hasNavigated.current = true;
      router.replace("/(tabs)/occurrences");
      return;
    }
  }, [isReady, dbReady, token, segments]);

  // ⚙️ NOVO useEffect para inicialização e registro do FCM
  useEffect(() => {
    if (!token) {
      return;
    }

    async function initFCM() {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log("Permissão de Notificação negada.");
          return;
        }

        const fcmToken = await messaging().getToken();

        // 🚀 Registra o token no seu Backend
        await registerFCMToken(fcmToken);
      } catch (err) {
        console.log("Erro ao inicializar FCM:", err);
      }
    }

    initFCM();

    // Listener para notificação em FOREGROUND (App aberto)
    const unsubscribeForeground = messaging().onMessage(
      async (remoteMessage) => {
        console.log(
          "Notificação Push recebida em Foreground:",
          remoteMessage.notification
        );
        // Você pode disparar um Toast aqui ou usar o expo-notifications para um alerta visual leve
      }
    );

    return () => {
      unsubscribeForeground();
    };
  }, [token]);

  useEffect(() => {
    if (Platform.OS === "android") {
      messaging().setAutoInitEnabled(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const occurrenceId = remoteMessage.data?.occurrenceId;

      if (occurrenceId) {
        const path = `/occurrences/edit/${occurrenceId}`;
        router.push(path as any);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (!remoteMessage) return;

        const occurrenceId = remoteMessage.data?.occurrenceId;

        if (occurrenceId) {
          setTimeout(() => {
            const path = `/occurrences/edit/${occurrenceId}`;
            router.push(path as any);
          });
        }
      });
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C2020" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="recuperar-senha" />
          <Stack.Screen name="codigo-acesso" />
          <Stack.Screen name="face-id" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
