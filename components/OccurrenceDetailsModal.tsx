import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../utils/supabase";
import SignaturePad from "./occurrence/SignaturePad";

type OccurrenceProps = {
  id: number;
  titulo: string;
  descricao: string;
  cidade: string;
  regiao: string;
  status: string;
  tipo: string;
  dataHoraAbertura: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  occurrence: OccurrenceProps;
};

type Anexo = {
  id: number;
  url_anexo: string;
  tipo: "IMAGEM" | "ASSINATURA";
};

export default function OccurrenceDetailsModal({
  visible,
  onClose,
  occurrence,
}: Props) {
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [loading, setLoading] = useState(false);
  const [signatureVisible, setSignatureVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchAnexos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  async function fetchAnexos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ocorrencia_anexos")
        .select("id, url_anexo, tipo")
        .eq("ocorrencia_id", occurrence.id);

      if (error) {
        console.error("Erro ao buscar anexos:", error);
        setAnexos([]);
      } else {
        // Garante array tipado e ordena colocando assinatura por último
        const items: Anexo[] =
          (data as any[])?.map((item) => ({
            id: item.id,
            url_anexo: item.url_anexo,
            tipo: item.tipo,
          })) ?? [];
        setAnexos(items);
      }
    } catch (e) {
      console.error("Falha ao carregar anexos:", e);
      setAnexos([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSignature(base64: string) {
    try {
      // Converte base64 em Blob (React Native + expo)
      const response = await fetch(base64);
      const blob = await response.blob();

      const filename = `assinaturas/${occurrence.id}-${Date.now()}.png`;

      const { error: upErr } = await supabase.storage
        .from("anexos")
        .upload(filename, blob, { contentType: "image/png" });

      if (upErr) {
        console.error("Erro ao enviar assinatura:", upErr);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("anexos")
        .getPublicUrl(filename);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) {
        console.error("Não foi possível obter a URL pública da assinatura.");
        return;
      }

      const { error: insertErr } = await supabase
        .from("ocorrencia_anexos")
        .insert({
          ocorrencia_id: occurrence.id,
          url_anexo: publicUrl,
          tipo: "ASSINATURA",
        });

      if (insertErr) {
        console.error("Erro ao registrar assinatura:", insertErr);
        return;
      }

      setSignatureVisible(false);
      await fetchAnexos(); // atualiza a lista para refletir a nova assinatura
    } catch (e) {
      console.error("Falha ao salvar assinatura:", e);
    }
  }

  const imagens = anexos.filter((a) => a.tipo === "IMAGEM");
  const assinatura = anexos.find((a) => a.tipo === "ASSINATURA");

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{occurrence.titulo}</Text>
        <Text style={styles.description}>{occurrence.descricao}</Text>
        <Text style={styles.location}>
          {occurrence.cidade}, {occurrence.regiao}
        </Text>
        <Text style={styles.date}>
          {new Date(occurrence.dataHoraAbertura).toLocaleString("pt-BR")}
        </Text>

        <Text style={styles.section}>📎 Anexos</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#6C2020" />
        ) : imagens.length === 0 ? (
          <Text style={styles.empty}>Nenhum anexo disponível.</Text>
        ) : (
          imagens.map((anexo) => (
            <Image
              key={anexo.id}
              source={{ uri: anexo.url_anexo }}
              style={styles.image}
              resizeMode="cover"
            />
          ))
        )}

        <Text style={styles.section}>✍️ Assinatura do Solicitante</Text>
        {assinatura ? (
          <View>
            <Image
              source={{ uri: assinatura.url_anexo }}
              style={{
                width: "100%",
                height: 120,
                resizeMode: "contain",
                borderRadius: 8,
              }}
            />
            <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              Assinatura registrada.
            </Text>
          </View>
        ) : signatureVisible ? (
          <SignaturePad
            onOK={(sig) => handleSaveSignature(sig)}
            onClose={() => setSignatureVisible(false)}
          />
        ) : (
          <Button
            title="ADICIONAR ASSINATURA"
            onPress={() => setSignatureVisible(true)}
            color="#6C2020"
          />
        )}

        <Text style={styles.section}>🕒 Linha do Tempo</Text>
        <Text style={styles.timeline}> - Registro Criado</Text>
        <Text style={styles.timeline}> - Imagem anexada</Text>
        <Text style={styles.timeline}> - GPS registrado</Text>
        <Text style={styles.timeline}> - Sincronizado com servidor</Text>

        <Button title="FECHAR" onPress={onClose} color="#6C2020" />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 8 },
  location: { fontSize: 14, color: "#555", marginBottom: 4 },
  date: { fontSize: 12, color: "#777", marginBottom: 12 },
  section: { fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 12 },
  empty: { fontSize: 14, color: "#999", marginBottom: 12 },
  timeline: { fontSize: 14, marginBottom: 4 },
});
