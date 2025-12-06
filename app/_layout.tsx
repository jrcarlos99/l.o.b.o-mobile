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

  //  1. Carrega token ao abrir o app
  useEffect(() => {
    initializeAuth();
  }, []);

  //  2. Aguarda Zustand hidratar + RootLayout montar
  const isReady = rootNavigationState?.key != null && hydrated;

  //  Flag para evitar navegação duplicada
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!isReady) return;

    const isAuthRoute =
      segments[0] === "login" ||
      segments[0] === "recuperar-senha" ||
      segments[0] === "codigo-acesso" ||
      segments[0] === "face-id";

    //  Evita navegação repetida
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
  }, [isReady, token]); //

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
