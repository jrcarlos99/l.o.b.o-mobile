import { Stack } from "expo-router";

export default function OccurrencesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Tela de criação de ocorrência */}
      <Stack.Screen name="create" />

      {/* Tela de fluxo após criar ocorrência */}
      <Stack.Screen name="fluxo-de-ocorrencias" />
    </Stack>
  );
}
