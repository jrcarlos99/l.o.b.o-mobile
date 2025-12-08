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
import { ActivityIndicator, View } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
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
      console.log("🔧 Inicializando banco SQLite...");
      await initializeDatabase();
      console.log("✅ Banco SQLite pronto!");
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
