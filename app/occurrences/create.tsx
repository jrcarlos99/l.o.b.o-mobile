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
import { occurrenceCreateStyles as styles } from "@/styles/occurrenceCreateStyles";
import { supabase } from "@/utils/supabase";
import {
  OccurrenceFormValues,
  occurrenceSchema,
} from "@/validation/occurrences/occurrenceSchema";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
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
import Toast from "react-native-toast-message";

export default function CreateOccurrenceScreen() {
  const router = useRouter();

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const { loadingPickers, viaturaItems, equipeItems } = useOccurrencePickers();
  const { uploadImages } = useOccurrenceUploads();

  const [images, setImages] = useState<string[]>([]);
  const [signatureText, setSignatureText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { gps } = useGPS();

  const formik = useFormik<OccurrenceFormValues>({
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

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
      console.error("Error picking image:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);

      const occurrenceId = Date.now();

      const { error: insertError } = await supabase.from("ocorrencia").insert({
        id: occurrenceId,
        tipo: values.type,
        regiao: values.region,
        data_hora_abertura: values.date,
        viatura_id: values.vehicle,
        equipe_id: values.team,
        descricao: values.description,
        status: "criada",
        latitude: gps?.lat,
        longitude: gps?.lon,
      });

      if (insertError) throw insertError;

      if (images.length > 0) {
        await uploadImages(images, String(occurrenceId));
      }

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
        } else {
          console.error("Erro ao salvar assinatura:", error);
        }
      }

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Ocorrência registrada com sucesso",
      });

      setTimeout(() => {
        router.push({
          pathname: "/occurrences/fluxo-de-ocorrencias",
          params: { occurrenceId },
        });
        console.log("Redirecionando com ID:", occurrenceId);
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

  return (
    <>
      <HeaderSection onBack={() => router.back()} />

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

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/*  FORM PRINCIPAL */}
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

        {/*  LOCALIZAÇÃO (GPS) */}
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

        {/*  IMAGENS */}
        <ImageSection
          images={images}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
        />

        {/* ASSINATURA */}
        <SignatureSection
          signatureText={signatureText}
          onPress={() => setShowSignatureModal(true)}
        />

        {/*  BOTÃO SALVAR */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              !formik.isValid || submitting
                ? styles.submitButtonDisabled
                : null,
            ]}
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid || submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Salvar Ocorrência</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </>
  );
}
