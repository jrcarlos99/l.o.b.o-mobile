import ActionButton from "@/components/occurrence/ActionButton";
import FormField from "@/components/occurrence/FormField";
import ImagePreviewList from "@/components/occurrence/ImagePreviewList";
import LocationButton from "@/components/occurrence/LocationButton";
import OfflineBanner from "@/components/occurrence/OfflineBanner";
import PickerField from "@/components/occurrence/PickerField";
import SubmitButton from "@/components/occurrence/SubmitButton";
import { PendingOccurrence } from "@/components/occurrence/type";
import useGPS from "@/hooks/useGPS";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import SignaturePad from "@/components/occurrence/SignaturePad";
import { colors } from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const STORAGE_KEY = "@pending_occurrences_v1";

export default function CreateOccurrence() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [showSignatureModal, setShowSignatureModal] = useState(false);

  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<{ uri: string; timestamp: string }[]>(
    []
  );
  const [signatureText, setSignatureText] = useState(""); // substitui SignatureModal
  const [syncing, setSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  const { gps } = useGPS();

  // network subscribe
  React.useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => {
      setIsConnected(!!s.isConnected);
      if (s.isConnected) {
        trySyncPending();
      }
    });
    return unsub;
  }, []);

  // image picker
  const onPickImage = async (fromCamera = false) => {
    try {
      const result = fromCamera
        ? await ImagePicker.launchCameraAsync({
            quality: 0.6,
            allowsEditing: true,
          })
        : await ImagePicker.launchImageLibraryAsync({
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

  // validation
  const validate = () => {
    if (!type) {
      Alert.alert(
        "Campo obrigatório",
        "Por favor selecione o tipo de ocorrência."
      );
      return false;
    }
    if (!vehicle) {
      Alert.alert("Campo obrigatório", "Por favor selecione a viatura.");
      return false;
    }
    if (!team) {
      Alert.alert("Campo obrigatório", "Por favor selecione a equipe.");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Campo obrigatório", "Por favor descreva a ocorrência.");
      return false;
    }
    return true;
  };

  const makeId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const savePending = async (payload: PendingOccurrence) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const list: PendingOccurrence[] = raw ? JSON.parse(raw) : [];
      list.push(payload);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn(err);
    }
  };

  const trySyncPending = async () => {
    setSyncing(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const list: PendingOccurrence[] = JSON.parse(raw);
      if (!list.length) return;
      await new Promise((r) => setTimeout(r, 900));
      await AsyncStorage.removeItem(STORAGE_KEY);
      Alert.alert(
        "Sincronização",
        "Ocorrências pendentes foram sincronizadas."
      );
    } catch (err) {
      console.warn(err);
    } finally {
      setSyncing(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const payload: PendingOccurrence = {
      id: makeId(),
      type,
      datetime: date.toISOString(),
      vehicle,
      team,
      description,
      address,
      gps,
      images,
      signature: signatureText || undefined, // usa texto provisório
      createdAt: new Date().toISOString(),
      synced: false,
    };
    await savePending(payload);
    if (isConnected) {
      await trySyncPending();
      Alert.alert("Enviado", "Ocorrência enviada com sucesso.");
    } else {
      Alert.alert(
        "Salvo offline",
        "Sem conexão. A ocorrência foi salva localmente e será enviada quando houver rede."
      );
    }
    // reset
    setType("");
    setVehicle("");
    setTeam("");
    setDescription("");
    setAddress("");
    setImages([]);
    setSignatureText("");
    router.back();
  };

  const formattedDate = date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      <View style={styles.pageTitleContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Registro de Ocorrência</Text>
      </View>

      <OfflineBanner visible={!isConnected} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 80,
        }}
      >
        <View style={styles.card}>
          <PickerField
            label="Tipo"
            value={type}
            onChange={setType}
            required
            items={[
              { label: "Selecione o tipo", value: "" },
              { label: "Incêndio", value: "fire" },
              { label: "Acidente de Trânsito", value: "traffic_accident" },
              { label: "Resgate", value: "rescue" },
            ]}
          />

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

          <FormField label="Localização">
            <LocationButton
              onPress={() => {
                if (gps)
                  setAddress(
                    `Lat: ${gps.lat.toFixed(5)}, Lon: ${gps.lon.toFixed(
                      5
                    )} (acc ${gps.accuracy?.toFixed(1)}m)`
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

          <FormField label="Descrição" required>
            <TextInput
              placeholder="Descreva a ocorrência..."
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </FormField>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <PickerField
                label="Viatura"
                value={vehicle}
                onChange={setVehicle}
                required
                items={[
                  { label: "Selecione a viatura", value: "" },
                  { label: "VTR 01", value: "vtr_01" },
                  { label: "VTR 02", value: "vtr_02" },
                ]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <PickerField
                label="Equipe"
                value={team}
                onChange={setTeam}
                required
                items={[
                  { label: "Selecione a equipe", value: "" },
                  { label: "Equipe Alpha", value: "alpha" },
                  { label: "Equipe Bravo", value: "bravo" },
                ]}
              />
            </View>
          </View>

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

          <View style={styles.actionsRow}>
            <ActionButton
              icon="camera-outline"
              label="Anexar Imagem"
              onPress={() => onPickImage(false)}
            />
          </View>

          <ImagePreviewList images={images} onRemove={removeImage} />
        </View>

        <SubmitButton loading={syncing} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.lightBackground },
  pageTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: { padding: 6, marginRight: 8 },
  pageTitle: { fontSize: 20, fontWeight: "700", color: colors.primary },
  scroll: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  textBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textBoxText: { color: "#333" },
  input: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#fff",
  },
  textArea: { minHeight: 120 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 8,
    marginTop: 8,
    position: "relative",
  },
  imageThumb: { width: "100%", height: "100%" },
  removeBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#E53935",
    borderRadius: 16,
    padding: 2,
  },
  signatureBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginTop: 8,
  },

  signatureText: {
    fontSize: 16,
    color: "#555",
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
    minWidth: 0,
  },
});
