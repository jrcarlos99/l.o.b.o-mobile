import { incendioStyles as styles } from "@/styles/incendioStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente Checkbox customizado
const Checkbox = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkboxText}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

// Componente Tooltip simples
const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
  const [formData, setFormData] = useState({
    // Identificação
    pontoBase: "",
    viatura: "",
    data: "",

    // Classificação
    desastreSim: false,
    desastreNao: false,
    codigoDesastre: "",
    grupo: "",

    // Local
    endereco: "",
    tipoEdificacao: "",
    agente: "",

    // Recursos
    agua: "",
    espuma: "",

    // Danos
    bens: "",

    // Responsáveis
    proprietario: "",
    telefone: "",
    comandante: "",
  });

  const handleExport = () => {
    Alert.alert(
      "Salvar Formulário",
      "Formulário de Incêndio salvo com sucesso!",
      [{ text: "OK" }]
    );
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Corrigir a lógica dos checkboxes (mutuamente exclusivos)
  const handleDesastreChange = (type: "sim" | "nao", value: boolean) => {
    if (type === "sim") {
      setFormData((prev) => ({
        ...prev,
        desastreSim: value,
        desastreNao: value ? false : prev.desastreNao,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        desastreNao: value,
        desastreSim: value ? false : prev.desastreSim,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header com botão de voltar */}
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
        <View style={[styles.card, { borderColor: "#951B2A" }]}>
          <Text style={[styles.title, { color: "#951B2A" }]}>
            Formulário de Incêndio
          </Text>

          {/* Identificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Ponto Base</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 5º GB – 1ª Cia"
                  value={formData.pontoBase}
                  onChangeText={(text) => updateField("pontoBase", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Viatura Responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: ABT 3106"
                  value={formData.viatura}
                  onChangeText={(text) => updateField("viatura", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Data</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Data (DD/MM/AAAA)"
                  value={formData.data}
                  onChangeText={(text) => updateField("data", text)}
                />
              </View>
            </View>
          </View>

          {/* Classificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Classificação</Text>

            <View style={styles.checkboxRow}>
              <Text style={styles.label}>Associado a Desastre?</Text>
              <View style={styles.checkboxGroupHorizontal}>
                <Checkbox
                  label="Sim"
                  value={formData.desastreSim}
                  onValueChange={(value) => handleDesastreChange("sim", value)}
                />
                <Checkbox
                  label="Não"
                  value={formData.desastreNao}
                  onValueChange={(value) => handleDesastreChange("nao", value)}
                />
              </View>
            </View>

            <View style={styles.row}>
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
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 2.3.12"
                  value={formData.codigoDesastre}
                  onChangeText={(text) => updateField("codigoDesastre", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Grupo/Subgrupo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Incêndio em edificação"
                  value={formData.grupo}
                  onChangeText={(text) => updateField("grupo", text)}
                />
              </View>
            </View>
          </View>

          {/* Local */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Local e Especificação</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Rua, nº, bairro, cidade"
                  value={formData.endereco}
                  onChangeText={(text) => updateField("endereco", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Edificação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Comercial, Residencial"
                  value={formData.tipoEdificacao}
                  onChangeText={(text) => updateField("tipoEdificacao", text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Agente Causador</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Instalação elétrica"
                value={formData.agente}
                onChangeText={(text) => updateField("agente", text)}
              />
            </View>
          </View>

          {/* Recursos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recursos Utilizados</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Consumo de Água (litros)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 5000"
                  value={formData.agua}
                  onChangeText={(text) => updateField("agua", text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Consumo de Espuma (litros)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 200"
                  value={formData.espuma}
                  onChangeText={(text) => updateField("espuma", text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Danos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Danos</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bens Atingidos</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ex: Instalações elétricas, móveis"
                multiline
                numberOfLines={4}
                value={formData.bens}
                onChangeText={(text) => updateField("bens", text)}
              />
            </View>
          </View>

          {/* Responsáveis */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsáveis</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Proprietário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  value={formData.proprietario}
                  onChangeText={(text) => updateField("proprietario", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="(81) 99999-9999"
                  value={formData.telefone}
                  onChangeText={(text) => updateField("telefone", text)}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Comandante da Operação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome de guerra"
                  value={formData.comandante}
                  onChangeText={(text) => updateField("comandante", text)}
                />
              </View>
            </View>
          </View>

          {/* Botão Final */}
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#951B2A" }]}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>Salvar Formulário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
