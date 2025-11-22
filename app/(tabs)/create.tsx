import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
import { styles } from "@/styles/createStyles";

export default function CreateOccurrence() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
  const [signatureText, setSignatureText] = useState("");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  const { gps } = useGPS();

  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => {
      setIsConnected(!!s.isConnected);
    });
    return unsub;
  }, []);

  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
    if (!vehicle)
      return Alert.alert("Campo obrigatório", "Selecione a viatura.");
    if (!team) return Alert.alert("Campo obrigatório", "Selecione a equipe.");
    if (!description.trim())
      return Alert.alert("Campo obrigatório", "Descreva a ocorrência.");
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    Alert.alert(
      isConnected ? "Enviado" : "Salvo offline",
      isConnected
        ? "Ocorrência enviada com sucesso."
        : "Sem conexão. A ocorrência foi salva localmente e será enviada quando houver rede."
    );

    setType("");
    setVehicle("");
    setTeam("");
    setDescription("");
    setAddress("");
    setImages([]);
    setSignatureText("");
    router.back();
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
              onPress={onPickImage}
            />
          </View>

          <ImagePreviewList images={images} onRemove={removeImage} />
        </View>

        <SubmitButton loading={false} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}
