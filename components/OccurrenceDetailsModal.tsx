import { Occurrence } from "@/types/OccurrenceType";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { occurrenceDetailsStyles as styles } from "../styles/OccurrenceDetailsModalStyles";
import { supabase } from "../utils/supabase";
import SignaturePad from "./occurrence/SignaturePad";

type Props = {
  visible: boolean;
  onClose: () => void;
  occurrence: Occurrence;
};

type Anexo = {
  id: number;
  url_anexo: string;
  tipo: "IMAGEM" | "ASSINATURA";
  created_at?: string;
};

export default function OccurrenceDetailsModal({
  visible,
  onClose,
  occurrence,
}: Props) {
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [loading, setLoading] = useState(false);
  const [signatureVisible, setSignatureVisible] = useState(false);

  const reloadAnexos = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ocorrencia_anexos")
        .select("id, url_anexo, tipo, created_at")
        .eq("ocorrencia_id", occurrence.id);

      if (error) {
        console.error("Erro ao buscar anexos:", error);
        setAnexos([]);
        return;
      }

      const items: Anexo[] =
        (data as any[])?.map((item) => ({
          id: item.id,
          url_anexo: item.url_anexo, // corrigido
          tipo: item.tipo,
          created_at: item.created_at,
        })) ?? [];

      setAnexos(items);
    } catch (e) {
      console.error("Falha ao carregar anexos:", e);
      setAnexos([]);
    } finally {
      setLoading(false);
    }
  }, [occurrence.id]);

  useEffect(() => {
    if (visible) reloadAnexos();
  }, [visible, reloadAnexos]);

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
      await reloadAnexos();
    } catch (e) {
      console.error("Falha ao salvar assinatura:", e);
    }
  }

  const imagens = anexos.filter((a) => a.tipo === "IMAGEM");
  const assinatura = anexos.find((a) => a.tipo === "ASSINATURA");

  const formatTime = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--:--";

  const timelineEvents = [
    { label: "Registro Criado", time: occurrence.dataHoraAbertura },
    { label: "Imagem anexada", time: imagens[0]?.created_at },
    { label: "GPS registrado", time: occurrence.dataHoraAbertura },
    {
      label: "Sincronizado com servidor",
      time: occurrence.dataHoraAtualizacao,
    },
  ];

  const mapsUrl =
    occurrence.latitude && occurrence.longitude
      ? `https://www.google.com/maps?q=${occurrence.latitude},${occurrence.longitude}`
      : null;

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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text style={styles.gps}>
                Lat: {occurrence.latitude.toFixed(5)}, Lon:{" "}
                {occurrence.longitude.toFixed(5)}
              </Text>
              {mapsUrl && (
                <TouchableOpacity onPress={() => Linking.openURL(mapsUrl)}>
                  <Text style={styles.mapButton}>Ver no Mapa</Text>
                </TouchableOpacity>
              )}
            </View>
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
          {timelineEvents.map((event, index) => (
            <Text key={index} style={styles.timeline}>
              • {formatTime(event.time)} - {event.label}
            </Text>
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
}
