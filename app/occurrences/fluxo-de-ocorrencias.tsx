import { supabase } from "@/utils/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function FluxoDeOcorrencia() {
  const router = useRouter();
  const { occurrenceId } = useLocalSearchParams();
  const idNum = Number(occurrenceId);
  const [loading, setLoading] = useState(true);
  const [occurrence, setOccurrence] = useState<any>(null);

  useEffect(() => {
    const loadOccurrence = async () => {
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

        setOccurrence(data);

        //  Redireciona automaticamente para o formulário correto
        if (data.tipo.toLowerCase() === "basico") {
          router.push({
            pathname: "/forms/basico",
            params: { occurrenceId },
          });
        }

        // Outros tipos no futuro:
        if (data.tipo.toLowerCase() === "incendio") {
          router.push({
            pathname: "/forms/incendio",
            params: { occurrenceId },
          });
        }
      } catch (err) {
        console.error("Erro ao carregar ocorrência:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOccurrence();
  }, [occurrenceId, idNum, router]);

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
