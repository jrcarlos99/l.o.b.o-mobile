import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { incendioSchema } from "@/schema/incendioSchema";
import { incendioStyles as styles } from "@/styles/incendioStyles";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Tooltip simples
const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <View style={styles.tooltipContainer}>
      <TouchableOpacity
        onPress={() => setShowTooltip(!showTooltip)}
        style={styles.tooltipTrigger}
      >
        {children}
      </TouchableOpacity>
      {showTooltip && (
        <View style={styles.tooltipContent}>
          <Text style={styles.tooltipText}>{text}</Text>
        </View>
      )}
    </View>
  );
};

export default function FormularioIncendioScreen() {
  const router = useRouter();
  const { occurrenceId } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(incendioSchema),
    defaultValues: {
      pontoBase: "",
      viatura: "",
      data: "",
      desastre: "",
      codigoDesastre: "",
      grupo: "",
      endereco: "",
      tipoEdificacao: "",
      agente: "",
      agua: "",
      espuma: "",
      bens: "",
      proprietario: "",
      telefone: "",
      comandante: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (!occurrenceId) {
        Alert.alert("Erro", "ID da ocorrência não encontrado.");
        return;
      }

      const { error } = await supabase.from("form_incendio").insert({
        ocorrencia_id: Number(occurrenceId),
        ponto_base: data.pontoBase,
        viatura: data.viatura,
        data: data.data,

        desastre: data.desastre,
        codigo_desastre: data.codigoDesastre,
        grupo: data.grupo,

        endereco: data.endereco,
        tipo_edificacao: data.tipoEdificacao,
        agente: data.agente,

        agua: data.agua,
        espuma: data.espuma,

        bens: data.bens,

        proprietario: data.proprietario,
        telefone: data.telefone,
        comandante: data.comandante,
      });

      if (error) throw error;

      Alert.alert("Sucesso", "Formulário de Incêndio salvo com sucesso!");
      router.replace("/(tabs)/occurrences");
    } catch (error) {
      console.error("Erro ao salvar formulário de incêndio:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o formulário.");
    }
  };

  const handleExportClick = () => {
    handleSubmit(onSubmit, (invalid) => {
      console.log("Formulário inválido:", invalid);
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
    })();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#951B2A" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Incêndio</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Formulário de Incêndio</Text>

          {/* 1. Identificação */}
          <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="pontoBase"
              placeholder="Ponto Base"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="viatura"
              placeholder="Viatura Responsável"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="data"
              placeholder="Data (DD/MM/AAAA)"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 2. Classificação */}
          <Text style={styles.sectionTitle}>Classificação</Text>

          <View style={styles.row}>
            {/* DESASTRE COM CONTROLLER */}
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>Associado a Desastre?</Text>

              <Controller
                control={control}
                name="desastre"
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.input}
                  >
                    <Picker.Item label="Selecione..." value="" />
                    <Picker.Item label="Sim" value="Sim" />
                    <Picker.Item label="Não" value="Não" />
                  </Picker>
                )}
              />
            </View>

            <View style={[styles.inputContainer, styles.flex1]}>
              <View style={styles.labelWithTooltip}>
                <Text style={styles.label}>Código do Desastre</Text>
                <Tooltip text="Código conforme classificação brasileira de desastres.">
                  <Ionicons
                    name="information-circle-outline"
                    size={16}
                    color="#666"
                  />
                </Tooltip>
              </View>
              <FormInput
                control={control}
                name="codigoDesastre"
                placeholder="Ex: 2.3.12"
                style={[styles.input, styles.flex1]}
              />
            </View>
          </View>

          <FormInput
            control={control}
            name="grupo"
            placeholder="Grupo/Subgrupo"
            style={styles.input}
          />

          {/* 3. Local */}
          <Text style={styles.sectionTitle}>Local e Especificação</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="endereco"
              placeholder="Endereço"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="tipoEdificacao"
              placeholder="Tipo de Edificação"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          <FormInput
            control={control}
            name="agente"
            placeholder="Agente Causador"
            style={styles.input}
          />

          {/* 4. Recursos */}
          <Text style={styles.sectionTitle}>Recursos Utilizados</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="agua"
              placeholder="Consumo de Água (litros)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="espuma"
              placeholder="Consumo de Espuma (litros)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 5. Danos */}
          <Text style={styles.sectionTitle}>Danos</Text>
          <FormTextArea
            control={control}
            name="bens"
            placeholder="Bens Atingidos"
            style={styles.input}
            height={100}
            numberOfLines={4}
          />

          {/* 6. Responsáveis */}
          <Text style={styles.sectionTitle}>Responsáveis</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="proprietario"
              placeholder="Proprietário"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="telefone"
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="comandante"
              placeholder="Comandante da Operação"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* Botão Final */}
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportClick}
          >
            <Text style={styles.exportButtonText}>Salvar Formulário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
