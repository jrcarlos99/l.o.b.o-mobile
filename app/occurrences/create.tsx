import FormField from "@/components/occurrence/FormField";
import LocationButton from "@/components/occurrence/LocationButton";
import SignaturePad from "@/components/occurrence/SignaturePad";
import { FormSection } from "@/components/occurrences/FormSection";
import { HeaderSection } from "@/components/occurrences/HeaderSection";
import { ImageSection } from "@/components/occurrences/ImageSection";
import { SignatureSection } from "@/components/occurrences/SignatureSection";
import { useOccurrencePickers } from "@/hooks/occurrences/useOccurrencePickers";
import { useOccurrenceUploads } from "@/hooks/occurrences/useOccurrenceUploads";
import useGPS from "@/hooks/useGPS";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { occurrenceCreateStyles as styles } from "@/styles/occurrenceCreateStyles";
import { supabase } from "@/utils/supabase";

import { salvarOcorrenciaOffline } from "@/src/database/repositories/ocorrenciasRepository";
import { adicionarPendencia } from "@/src/database/repositories/pendingQueueRepository";
import { temInternet } from "@/src/database/repositories/syncRepository";
import { occurrenceSchema } from "@/validation/occurrences/occurrenceSchema";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type FormValues = {
  type: string;
  region: string;
  date: string;
  vehicle: string;
  team: string;
  description: string;
  address: string;
};

export default function CreateOccurrenceScreen() {
  const router = useRouter();

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const { loadingPickers, viaturaItems, equipeItems } = useOccurrencePickers();
  const { uploadImages } = useOccurrenceUploads();

  const [images, setImages] = useState<string[]>([]);
  const [signatureText, setSignatureText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [online, setOnline] = useState(true);

  const { gps } = useGPS();
  const insets = useSafeAreaInsets();
  const customBottomPadding = insets.bottom + 75 + 10;

  // Detecta internet ao abrir a tela
  useEffect(() => {
    const check = async () => {
      const status = await temInternet();
      setOnline(status);
    };
    check();
  }, []);

  // Formik (sem context, simples)
  const formik = useFormik<FormValues>({
    initialValues: {
      type: "",
      region: "",
      date: "",
      vehicle: "",
      team: "",
      description: "",
      address: "",
    },
    validationSchema: occurrenceSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  // Selecionar imagem
  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImages((prev) => [...prev, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
      console.error("Error picking image:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // SUBMIT (online + offline)
  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);

      const occurrenceId = Date.now();

      const dados = {
        id: occurrenceId,
        titulo: values.type,
        descricao: values.description,
        regiao: values.region,
        tipo: values.type,
        status: "ABERTA",
        latitude: gps?.lat,
        longitude: gps?.lon,
        viatura_id: values.vehicle ? Number(values.vehicle) : null,
        equipe_id: values.team ? Number(values.team) : null,
        data_hora_abertura: new Date().toISOString(),
      };

      const isOnline = await temInternet();

      if (isOnline) {
        // Envia para Supabase
        const { error: insertError } = await supabase
          .from("ocorrencia")
          .insert(dados);

        if (insertError) throw insertError;

        // Upload de imagens
        if (images.length > 0) {
          await uploadImages(images, String(occurrenceId));
        }

        // Upload da assinatura
        if (signatureText) {
          const content = signatureText.replace("data:image/png;base64,", "");
          const buffer = Uint8Array.from(atob(content), (c) => c.charCodeAt(0));
          const filename = `assinaturas/${occurrenceId}-${Date.now()}.png`;

          const { error } = await supabase.storage
            .from("anexos")
            .upload(filename, buffer, { contentType: "image/png" });

          if (!error) {
            const { data: urlData } = supabase.storage
              .from("anexos")
              .getPublicUrl(filename);

            await supabase.from("ocorrencia_anexos").insert({
              ocorrencia_id: occurrenceId,
              url_anexo: urlData.publicUrl,
              tipo: "ASSINATURA",
            });
          }
        }

        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Ocorrência registrada com sucesso",
        });
      } else {
        // MODO OFFLINE: salva local e enfileira para sync
        await salvarOcorrenciaOffline({
          id: occurrenceId,
          titulo: values.type,
          descricao: values.description,
          regiao: values.region,
          tipo: values.type,
          status: "ABERTA",
          latitude: gps?.lat ?? 0,
          longitude: gps?.lon ?? 0,
          dataCriacao: new Date().toISOString(),
          viatura_id: values.vehicle ? Number(values.vehicle) : null,
          equipe_id: values.team ? Number(values.team) : null,
        });
        console.log("💾 [SQLite] Salvando ocorrência offline:", dados);

        await adicionarPendencia("CRIAR_OCORRENCIA", {
          ...dados,
          imagens: images,
          assinatura: signatureText || null,
        });

        Toast.show({
          type: "info",
          text1: "Modo Offline",
          text2: "Ocorrência salva localmente e será sincronizada depois.",
        });
      }

      // Redireciona
      setTimeout(() => {
        router.push({
          pathname: "/occurrences/fluxo-de-ocorrencias",
          params: { occurrenceId },
        });
      }, 1500);
    } catch (error) {
      console.error("Error submitting occurrence:", error);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Falha ao registrar ocorrência",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPickers) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C2020" />
      </View>
    );
  }

  // regra simples pro botão: online precisa estar válido; offline pode só exigir tipo/descrição/região
  const canSubmit =
    !submitting &&
    ((online && formik.isValid) ||
      (!online &&
        formik.values.type &&
        formik.values.region &&
        formik.values.description));

  return (
    <>
      <ProtectedRoute allowedRoles={["OPERADOR", "CHEFE", "ADMIN"]}>
        <HeaderSection onBack={() => router.push("/(tabs)/occurrences")} />

        {!online && (
          <View
            style={{
              padding: 10,
              backgroundColor: "#ffddcc",
              margin: 10,
              borderRadius: 3,
            }}
          >
            <Text style={{ color: "#a33" }}>
              Você está offline. Viaturas e equipes não estão disponíveis.
            </Text>
          </View>
        )}

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

        <View style={{ flex: 1, paddingBottom: customBottomPadding }}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <FormSection
              formik={{
                values: formik.values,
                errors: formik.errors,
                touched: formik.touched,
                handleChange: formik.handleChange,
                handleBlur: formik.handleBlur,
                setFieldValue: formik.setFieldValue,
              }}
              viaturaItems={viaturaItems}
              equipeItems={equipeItems}
            />

            <FormField label="Localização">
              <LocationButton
                onPress={() => {
                  if (gps?.lat && gps?.lon) {
                    const formatted = `Lat: ${gps.lat.toFixed(
                      5
                    )}, Lon: ${gps.lon.toFixed(5)}${
                      gps.accuracy ? ` (acc ${gps.accuracy.toFixed(1)}m)` : ""
                    }`;
                    formik.setFieldValue("address", formatted);
                  } else {
                    Alert.alert("GPS", "Coordenadas não disponíveis.");
                  }
                }}
              />

              <TextInput
                placeholder="Endereço (opcional)"
                style={[styles.input, { marginTop: 8 }]}
                value={formik.values.address}
                onChangeText={(text) => formik.setFieldValue("address", text)}
              />
            </FormField>

            <ImageSection
              images={images}
              onAddImage={handleAddImage}
              onRemoveImage={handleRemoveImage}
            />

            <SignatureSection
              signatureText={signatureText}
              onPress={() => setShowSignatureModal(true)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !canSubmit ? styles.submitButtonDisabled : null,
                ]}
                onPress={() => formik.handleSubmit()}
                disabled={!canSubmit}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Salvar Ocorrência</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ProtectedRoute>
      <Toast />
    </>
  );
}
