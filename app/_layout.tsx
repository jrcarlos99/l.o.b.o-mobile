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
import { useEffect, useRef } from "react";

import { initializeDatabase } from "@/src/database/database";
import { tentarSincronizar } from "@/src/database/repositories/syncRepository";

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

  // Inicializa o banco local (SQLite)
  useEffect(() => {
    initializeDatabase();
  }, []);

  // loop de sincronização automática
  useEffect(() => {
    const interval = setInterval(() => {
      tentarSincronizar();
    }, 15000); // 15 segundos

    return () => clearInterval(interval);
  }, []);

  //  Carrega token ao abrir o app
  useEffect(() => {
    initializeAuth();
  }, []);

  // Aguarda Zustand + RootLayout
  const isReady = rootNavigationState?.key != null && hydrated;

  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!isReady) return;

    const current = segments[0] ?? "";

    const isAuthRoute =
      current === "login" ||
      current === "recuperar-senha" ||
      current === "codigo-acesso" ||
      current === "face-id";

    if (hasNavigated.current) return;

    //  Sem token → login
    if (!token && !isAuthRoute) {
      hasNavigated.current = true;
      router.replace("/login");
      return;
    }

    //  Com token → redireciona para tabs
    if (token && isAuthRoute) {
      hasNavigated.current = true;
      router.replace("/(tabs)/occurrences");
      return;
    }
  }, [isReady, token, segments]);

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
