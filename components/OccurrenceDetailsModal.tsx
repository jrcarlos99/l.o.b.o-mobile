import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  latitude?: number;
  longitude?: number;
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
    async function loadAnexos() {
      if (!visible) return;

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
          const items =
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

    loadAnexos();
  }, [visible, occurrence.id]);

  async function fetchAnexos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("ocorrencia_anexos")
      .select("id, url_anexo, tipo")
      .eq("ocorrencia_id", occurrence.id);

    if (error) {
      console.error("Erro ao buscar anexos:", error);
      setAnexos([]);
    } else {
      const items: Anexo[] =
        (data as any[])?.map((item) => ({
          id: item.id,
          url_anexo: item.url_anexo,
          tipo: item.tipo,
        })) ?? [];
      setAnexos(items);
    }
    setLoading(false);
  }

  async function handleSaveSignature(base64: string) {
    try {
      const response = await fetch(base64);
      const blob = await response.blob();
      const filename = `assinaturas/${occurrence.id}-${Date.now()}.png`;

      const { error: upErr } = await supabase.storage
        .from("anexos")
        .upload(filename, blob, { contentType: "image/png" });

      if (upErr) return console.error("Erro ao enviar assinatura:", upErr);

      const { data: urlData } = supabase.storage
        .from("anexos")
        .getPublicUrl(filename);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) return console.error("URL pública não obtida.");

      const { error: insertErr } = await supabase
        .from("ocorrencia_anexos")
        .insert({
          ocorrencia_id: occurrence.id,
          url_anexo: publicUrl,
          tipo: "ASSINATURA",
        });

      if (insertErr)
        return console.error("Erro ao registrar assinatura:", insertErr);

      setSignatureVisible(false);
      await fetchAnexos();
    } catch (e) {
      console.error("Falha ao salvar assinatura:", e);
    }
  }

  const imagens = anexos.filter((a) => a.tipo === "IMAGEM");
  const assinatura = anexos.find((a) => a.tipo === "ASSINATURA");

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detalhe da Ocorrência</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>Fechar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{occurrence.titulo}</Text>
          <Text style={styles.status}>Status: {occurrence.status}</Text>
          <Text style={styles.description}>{occurrence.descricao}</Text>
          <Text style={styles.location}>
            {occurrence.cidade}, {occurrence.regiao}
          </Text>
          <Text style={styles.date}>
            {new Date(occurrence.dataHoraAbertura).toLocaleString("pt-BR")}
          </Text>
          {occurrence.latitude && occurrence.longitude && (
            <Text style={styles.gps}>
              Lat: {occurrence.latitude.toFixed(5)}, Lon:{" "}
              {occurrence.longitude.toFixed(5)}
            </Text>
          )}
        </View>

        <View style={styles.card}>
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
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>✍️ Assinatura do Solicitante</Text>
          {assinatura ? (
            <View>
              <Image
                source={{ uri: assinatura.url_anexo }}
                style={styles.signature}
              />
              <Text style={styles.signatureLabel}>Assinatura registrada.</Text>
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
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>🕒 Linha do Tempo</Text>
          <Text style={styles.timeline}>• Registro Criado</Text>
          <Text style={styles.timeline}>• Imagem anexada</Text>
          <Text style={styles.timeline}>• GPS registrado</Text>
          <Text style={styles.timeline}>• Sincronizado com servidor</Text>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    backgroundColor: "#6C2020",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  closeButton: { color: "#fff", fontSize: 14 },
  container: { backgroundColor: "#f9f9f9" },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  status: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6C2020",
    marginBottom: 8,
  },
  description: { fontSize: 16, marginBottom: 8 },
  location: { fontSize: 14, color: "#555", marginBottom: 4 },
  date: { fontSize: 12, color: "#777", marginBottom: 4 },
  gps: { fontSize: 12, color: "#777", marginBottom: 8 },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#6C2020",
  },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 12 },
  signature: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
  },
  signatureLabel: { fontSize: 12, color: "#666", marginTop: 4 },
  empty: { fontSize: 14, color: "#999", marginBottom: 12 },
  timeline: { fontSize: 14, marginBottom: 4 },
});
