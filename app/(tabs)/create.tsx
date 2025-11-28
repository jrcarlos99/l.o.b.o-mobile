import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import { readAsStringAsync } from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ActionButton from "@/components/occurrence/ActionButton";
import FormField from "@/components/occurrence/FormField";
import ImagePreviewList from "@/components/occurrence/ImagePreviewList";
import LocationButton from "@/components/occurrence/LocationButton";
import OfflineBanner from "@/components/occurrence/OfflineBanner";
import PickerField from "@/components/occurrence/PickerField";
import SignaturePad from "@/components/occurrence/SignaturePad";
import SubmitButton from "@/components/occurrence/SubmitButton";
import useGPS from "@/hooks/useGPS";
import {
  createOccurrence,
  fetchEquipes,
  fetchViaturas,
} from "@/services/occurrences";
import { styles } from "@/styles/createStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Backend enums (for reference and payload casting)
type RegiaoEnum = "AGRE" | "SERT" | "RMR" | "ZDMT";
type TipoEnum =
  | "INCENDIO"
  | "ACIDENTE_DE_TRANSITO"
  | "SALVAMENTO"
  | "RESGATE"
  | "PRE_HOSPITALAR"
  | "EPI"
  | "COMUNICACAO"
  | "VAZAMENTO";
type StatusEnum =
  | "EM_ANDAMENTO"
  | "ABERTA"
  | "CANCELADO"
  | "PENDENTE"
  | "CONCLUIDO";

type PickerItem = { label: string; value: string };

export default function CreateOccurrence() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [type, setType] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vehicle, setVehicle] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<{ uri: string; timestamp: string }[]>(
    []
  );
  const [signatureText, setSignatureText] = useState("");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  // Data for pickers
  const [viaturaItems, setViaturaItems] = useState<PickerItem[]>([
    { label: "Selecione a viatura", value: "" },
  ]);
  const [equipeItems, setEquipeItems] = useState<PickerItem[]>([
    { label: "Selecione a equipe", value: "" },
  ]);
  const [loadingPickers, setLoadingPickers] = useState(false);

  const { gps } = useGPS();

  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) =>
      setIsConnected(!!s.isConnected)
    );
    return unsub;
  }, []);

  // Load viaturas/equipes dynamically from backend
  useEffect(() => {
    (async () => {
      try {
        setLoadingPickers(true);
        const token = await AsyncStorage.getItem("token");

        if (!token) throw new Error("Token não encontrado");

        const [viaturas, equipes] = await Promise.all([
          fetchViaturas(token),
          fetchEquipes(token),
        ]);

        const viItems: PickerItem[] = [
          { label: "Selecione a viatura", value: "" },
          ...viaturas.map((v: any) => ({
            label: v.nome ?? `Viatura #${v.id}`,
            value: String(v.id),
          })),
        ];
        const eqItems: PickerItem[] = [
          { label: "Selecione a equipe", value: "" },
          ...equipes.map((e: any) => ({
            label: e.nome ?? `Equipe #${e.id}`,
            value: String(e.id),
          })),
        ];
        setViaturaItems(viItems);
        setEquipeItems(eqItems);
      } catch (err) {
        console.warn("Falha ao carregar viaturas/equipes:", err);
        Alert.alert("Atenção", "Não foi possível carregar viaturas e equipes.");
      } finally {
        setLoadingPickers(false);
      }
    })();
  }, []);

  const formattedDate = useMemo(
    () =>
      date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    [date]
  );

  const onPickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.6,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets?.length) {
        const asset = result.assets[0];
        setImages((p) => [
          ...p,
          { uri: asset.uri, timestamp: new Date().toISOString() },
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const removeImage = (idx: number) =>
    setImages((p) => p.filter((_, i) => i !== idx));

  const validate = () => {
    if (!type) return Alert.alert("Campo obrigatório", "Selecione o tipo.");
    if (!region) return Alert.alert("Campo obrigatório", "Selecione a região.");
    if (!vehicle)
      return Alert.alert("Campo obrigatório", "Selecione a viatura.");
    if (!team) return Alert.alert("Campo obrigatório", "Selecione a equipe.");
    if (!description.trim())
      return Alert.alert("Campo obrigatório", "Descreva a ocorrência.");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const anexoBase64: string[] = [];
      for (const img of images) {
        const base64 = await readAsStringAsync(img.uri, "base64");
        anexoBase64.push(`data:image/jpeg;base64, ${base64}`);
      }

      const occurrenceData = {
        titulo: "Ocorrência registrada pelo app",
        descricao: description,
        solicitante: "Usuário do app",
        regiao: region as RegiaoEnum,
        cidade: address,
        dataHoraAbertura: date.toISOString(),
        status: "PENDENTE" as StatusEnum,
        tipo: type as TipoEnum,
        latitude: gps?.lat,
        longitude: gps?.lon,
        historico: ["ABERTA"],
        anexos: anexoBase64,
        viaturaId: Number(vehicle),
        equipeId: Number(team),
      };

      const nova = await createOccurrence(token, occurrenceData);

      Alert.alert("Sucesso", "Ocorrência enviada com sucesso.");
      console.log("Ocorrência criada:", nova);

      setType("");
      setRegion("");
      setVehicle("");
      setTeam("");
      setDescription("");
      setAddress("");
      setImages([]);
      setSignatureText("");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a ocorrência.");
      console.error(error);
    }
  };

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#6C2020" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar Ocorrência</Text>
      </View>

      <OfflineBanner visible={!isConnected} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 80 },
        ]}
      >
        <View style={styles.card}>
          {/* Tipo */}
          <PickerField
            label="Tipo"
            value={type}
            onChange={setType}
            required
            items={[
              { label: "Selecione o tipo", value: "" },
              { label: "Incêndio", value: "INCENDIO" },
              { label: "Acidente de Trânsito", value: "ACIDENTE_DE_TRANSITO" },
              { label: "Resgate", value: "RESGATE" },
              { label: "Salvamento", value: "SALVAMENTO" },
              { label: "Comunicação", value: "COMUNICACAO" },
              { label: "Pré-Hospitalar", value: "PRE_HOSPITALAR" },
              { label: "EPI", value: "EPI" },
              { label: "Acidente", value: "ACIDENTE" },
              { label: "Vazamento", value: "VAZAMENTO" },
            ]}
          />

          {/* Região */}
          <PickerField
            label="Região"
            value={region}
            onChange={setRegion}
            required
            items={[
              { label: "Selecione a região", value: "" },
              { label: "Agreste", value: "AGRE" },
              { label: "Sertão", value: "SERT" },
              { label: "Região Metropolitana do Recife", value: "RMR" },
              { label: "Zona da Mata", value: "ZDMT" },
            ]}
          />

          {/* Data/Hora */}
          <FormField label="Data/Hora" required>
            <TouchableOpacity
              style={styles.textBox}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.textBoxText}>{formattedDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(_, d) => {
                  setShowDatePicker(false);
                  if (d) setDate(d);
                }}
              />
            )}
          </FormField>

          {/* Localização */}
          <FormField label="Localização">
            <LocationButton
              onPress={() => {
                if (gps)
                  setAddress(
                    `Lat: ${gps.lat?.toFixed(5)}, Lon: ${gps.lon?.toFixed(5)}${
                      gps.accuracy ? ` (acc ${gps.accuracy.toFixed(1)}m)` : ""
                    }`
                  );
                else Alert.alert("GPS", "Coordenadas não disponíveis.");
              }}
            />
            <TextInput
              placeholder="Endereço (opcional)"
              style={[styles.input, { marginTop: 8 }]}
              value={address}
              onChangeText={setAddress}
            />
          </FormField>

          {/* Descrição */}
          <FormField label="Descrição" required>
            <TextInput
              placeholder="Descreva a ocorrência..."
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </FormField>

          {/* Viatura e Equipe */}
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <PickerField
                label="Viatura"
                value={vehicle}
                onChange={setVehicle}
                required
                items={viaturaItems}
              />
            </View>
            <View style={{ flex: 1 }}>
              <PickerField
                label="Equipe"
                value={team}
                onChange={setTeam}
                required
                items={equipeItems}
              />
            </View>
          </View>

          {/* Assinatura */}
          <FormField label="Assinatura">
            <TouchableOpacity
              style={styles.signatureBox}
              onPress={() => setShowSignatureModal(true)}
            >
              <Text style={styles.signatureText}>
                {signatureText ? "Assinatura capturada" : "Toque para assinar"}
              </Text>
            </TouchableOpacity>
          </FormField>

          {showSignatureModal && (
            <Modal visible animationType="slide">
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => setShowSignatureModal(false)}
                  style={{ padding: 12 }}
                >
                  <Text style={{ color: "red", fontSize: 16 }}>Fechar</Text>
                </TouchableOpacity>
                <SignaturePad
                  onOK={(sig) => {
                    setSignatureText(sig);
                    setShowSignatureModal(false);
                  }}
                  onClose={() => setShowSignatureModal(false)}
                />
              </View>
            </Modal>
          )}

          {/* Imagens */}
          <View style={styles.actionsRow}>
            <ActionButton
              icon="camera-outline"
              label="Anexar Imagem"
              onPress={onPickImage}
            />
          </View>

          <ImagePreviewList images={images} onRemove={removeImage} />
        </View>

        {/* Enviar */}
        <SubmitButton loading={false} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}
