import { Occurrence } from "@/types/OccurrenceType";
import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { occurrenceEditStyles as styles } from "./styles";

type Props = {
  occurrence: Occurrence;
  anexos: any[];
  onSaved: () => void;
};

export default function OccurrenceEditForm({
  occurrence,
  anexos,
  onSaved,
}: Props) {
  const [descricao, setDescricao] = useState(occurrence.descricao ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      setSaving(true);

      const { error } = await supabase
        .from("ocorrencia")
        .update({
          descricao,
          status: "EM_ANDAMENTO",
          data_hora_atualizacao: new Date().toISOString(),
        })
        .eq("id", occurrence.id);

      if (error) throw error;

      Alert.alert("Sucesso", "Ocorrência atualizada.");
      onSaved();
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Ocorrência</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Anexos</Text>
      {anexos.length === 0 ? (
        <Text style={styles.empty}>Nenhum anexo disponível.</Text>
      ) : (
        anexos.map((a) => (
          <Text key={a.id} style={styles.attachmentItem}>
            • {a.tipo} - {a.url_anexo}
          </Text>
        ))
      )}

      <TouchableOpacity
        style={[styles.button, saving && { opacity: 0.5 }]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
