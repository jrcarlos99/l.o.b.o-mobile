import OccurrenceEditForm from "@/components/OccurrenceEditForm";
import { Occurrence } from "@/types/OccurrenceType";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

export default function EditOccurrencePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [occurrence, setOccurrence] = useState<Occurrence | null>(null);
  const [anexos, setAnexos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);

      // Carrega ocorrência
      const { data: occ, error: occErr } = await supabase
        .from("ocorrencia")
        .select("*")
        .eq("id", id)
        .single();

      if (occErr) throw occErr;

      const mapped: Occurrence = {
        id: occ.id,
        titulo: occ.titulo,
        descricao: occ.descricao,
        solicitante: occ.solicitante,
        regiao: occ.regiao,
        cidade: occ.cidade,
        status: occ.status,
        tipo: occ.tipo,
        dataHoraAbertura: occ.data_hora_abertura,
        dataHoraAtualizacao: occ.data_hora_atualizacao,
        latitude: occ.latitude,
        longitude: occ.longitude,
        historico: occ.historico,
        criadoPor: occ.criado_por,
        atualizadoPor: occ.atualizado_por,
        anexos: undefined,
      };

      setOccurrence(mapped);

      // Carrega anexos
      const { data: anexosData, error: anexErr } = await supabase
        .from("ocorrencia_anexos")
        .select("*")
        .eq("ocorrencia_id", id);

      if (anexErr) throw anexErr;

      setAnexos(anexosData ?? []);
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível carregar a ocorrência.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading || !occurrence) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6C2020" />
      </View>
    );
  }

  return (
    <OccurrenceEditForm
      occurrence={occurrence}
      anexos={anexos}
      onSaved={() => router.back()}
    />
  );
}
