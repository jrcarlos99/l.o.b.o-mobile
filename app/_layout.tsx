import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { UserProvider } from "@/context/UserContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <UserProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar style="auto" />

          <Stack screenOptions={{ headerShown: false }}>
            {/* Splash Vermelho */}
            <Stack.Screen name="index" />

            {/* Telas de Autenticação */}
            <Stack.Screen name="login" />
            <Stack.Screen name="recuperar-senha" />
            <Stack.Screen name="codigo-acesso" />
            <Stack.Screen name="face-id" />

            {/* Área Logada com TABS  */}
            <Stack.Screen name="(tabs)" />

            {/* Modal Global  */}
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
