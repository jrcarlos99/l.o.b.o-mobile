import { supabase } from "@/utils/supabase";
import {
  useLocalSearchParams,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function FluxoDeOcorrencia() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasNavigated = useRef(false);

  const { occurrenceId } = useLocalSearchParams();
  const idNum = Number(occurrenceId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOccurrence = async () => {
      //  Espera o RootLayout montar
      if (!rootNavigationState?.key) return;

      if (!occurrenceId || isNaN(idNum)) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("ocorrencia")
          .select("*")
          .eq("id", idNum)
          .single();

        if (error) throw error;

        if (hasNavigated.current) return;

        const tipo = data.tipo?.toLowerCase();

        if (tipo === "basico") {
          hasNavigated.current = true;
          router.replace({
            pathname: "/forms/basico",
            params: { occurrenceId },
          });
        } else if (tipo === "incendio") {
          hasNavigated.current = true;
          router.replace({
            pathname: "/forms/incendio",
            params: { occurrenceId },
          });
        } else {
          //  Fallback
          console.warn("Tipo de ocorrência não reconhecido:", tipo);
        }
      } catch (err) {
        console.error("Erro ao carregar ocorrência:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOccurrence();
  }, [occurrenceId, idNum, rootNavigationState]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C2020" />
        <Text style={{ marginTop: 10 }}>Carregando fluxo...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Redirecionando...</Text>
    </View>
  );
}
