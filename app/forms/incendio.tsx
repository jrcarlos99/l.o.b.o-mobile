import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E3E2DD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#E5E4E4",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#951B2A",
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#951B2A",
  },
  headerPlaceholder: {
    width: 60,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  labelWithTooltip: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxGroupHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#951B2A",
    borderColor: "#951B2A",
  },
  checkboxText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  tooltipContainer: {
    position: "relative",
  },
  tooltipTrigger: {
    marginLeft: 4,
  },
  tooltipContent: {
    position: "absolute",
    top: 20,
    left: -80,
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 4,
    width: 200,
    zIndex: 1000,
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
  },
  exportButton: {
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  exportButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
