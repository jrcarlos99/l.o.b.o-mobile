import { prevencaoStyles as styles } from "@/styles/prevencaoStyles";
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

export default function PrevencaoScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",

    // 2. Evento
    nomeEvento: "",
    horaChegada: "",
    horaSaida: "",
    documento: "",

    // 3. Classificação
    regularizadoSim: false,
    regularizadoNao: false,
    cgo: "",
    grupo: "",

    // 4. Responsável pelo Evento
    responsavel: "",
    cpfcnpj: "",
    publicoEstimado: "",
    publicoPresente: "",

    // 5. Prevenção Executada
    apoio: false,
    aquatica: false,
    festivo: false,
    esportivo: false,

    // 6. Condições e Estruturas
    condicaoSistema: "",
    responsaveis: "",
    estruturas: "",
    regularidade: "",

    // 7. Informações Adicionais
    adicionais: "",

    // 8. Responsáveis
    bombeiro: "",
    comandante: "",
    matricula: "",
    telefone: "",
    rubrica: "",
  });

  const handleExport = () => {
    Alert.alert(
      "Salvar Formulário",
      "Formulário de Prevenção salvo com sucesso!",
      [{ text: "OK" }]
    );
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Lógica para checkboxes mutuamente exclusivos
  const handleRegularizadoChange = (type: "sim" | "nao", value: boolean) => {
    if (type === "sim") {
      setFormData((prev) => ({
        ...prev,
        regularizadoSim: value,
        regularizadoNao: value ? false : prev.regularizadoNao,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        regularizadoNao: value,
        regularizadoSim: value ? false : prev.regularizadoSim,
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
          <Ionicons name="arrow-back" size={24} color="#6AC66F" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prevenção</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.card, { borderColor: "#6AC66F" }]}>
          <Text style={[styles.title, { color: "#6AC66F" }]}>
            Formulário de Prevenção
          </Text>

          {/* 1. Identificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Ponto Base</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ponto Base"
                  value={formData.pontoBase}
                  onChangeText={(text) => updateField("pontoBase", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>OME / Seção</Text>
                <TextInput
                  style={styles.input}
                  placeholder="OME / Seção"
                  value={formData.ome}
                  onChangeText={(text) => updateField("ome", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Viatura Responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Viatura Responsável"
                  value={formData.viatura}
                  onChangeText={(text) => updateField("viatura", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Nº do Aviso</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nº do Aviso"
                  value={formData.aviso}
                  onChangeText={(text) => updateField("aviso", text)}
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

          {/* 2. Evento */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Evento</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome do Evento</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do Evento"
                value={formData.nomeEvento}
                onChangeText={(text) => updateField("nomeEvento", text)}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Hora Chegada</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Hora Chegada"
                  value={formData.horaChegada}
                  onChangeText={(text) => updateField("horaChegada", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Hora Saída</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Hora Saída"
                  value={formData.horaSaida}
                  onChangeText={(text) => updateField("horaSaida", text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Documento de Referência</Text>
              <TextInput
                style={styles.input}
                placeholder="Documento de Referência"
                value={formData.documento}
                onChangeText={(text) => updateField("documento", text)}
              />
            </View>
          </View>

          {/* 3. Classificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Classificação</Text>

            <View style={styles.checkboxRow}>
              <Text style={styles.label}>Evento Regularizado?</Text>
              <View style={styles.checkboxGroupHorizontal}>
                <Checkbox
                  label="Sim"
                  value={formData.regularizadoSim}
                  onValueChange={(value) =>
                    handleRegularizadoChange("sim", value)
                  }
                />
                <Checkbox
                  label="Não"
                  value={formData.regularizadoNao}
                  onValueChange={(value) =>
                    handleRegularizadoChange("nao", value)
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Código CGO</Text>
              <TextInput
                style={styles.input}
                placeholder="Código CGO"
                value={formData.cgo}
                onChangeText={(text) => updateField("cgo", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Grupo/Subgrupo</Text>
              <TextInput
                style={styles.input}
                placeholder="Grupo/Subgrupo (por extenso)"
                value={formData.grupo}
                onChangeText={(text) => updateField("grupo", text)}
              />
            </View>
          </View>

          {/* 4. Responsável pelo Evento */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsável pelo Evento</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Nome do Responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome do Responsável"
                  value={formData.responsavel}
                  onChangeText={(text) => updateField("responsavel", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>CPF / CNPJ</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CPF / CNPJ"
                  value={formData.cpfcnpj}
                  onChangeText={(text) => updateField("cpfcnpj", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Público Estimado</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Público Estimado"
                  value={formData.publicoEstimado}
                  onChangeText={(text) => updateField("publicoEstimado", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Público Presente</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Público Presente"
                  value={formData.publicoPresente}
                  onChangeText={(text) => updateField("publicoPresente", text)}
                />
              </View>
            </View>
          </View>

          {/* 5. Prevenção Executada */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prevenção Executada</Text>

            <View style={styles.checkboxGroup}>
              <Checkbox
                label="Apoio à Operação"
                value={formData.apoio}
                onValueChange={(value) => updateField("apoio", value)}
              />
              <Checkbox
                label="Prevenção Aquática"
                value={formData.aquatica}
                onValueChange={(value) => updateField("aquatica", value)}
              />
              <Checkbox
                label="Evento Festivo"
                value={formData.festivo}
                onValueChange={(value) => updateField("festivo", value)}
              />
              <Checkbox
                label="Evento Esportivo"
                value={formData.esportivo}
                onValueChange={(value) => updateField("esportivo", value)}
              />
            </View>
          </View>

          {/* 6. Condições e Estruturas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Condições e Estruturas</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Condição do Sistema Preventivo Existente
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Condição do Sistema Preventivo Existente"
                multiline
                numberOfLines={3}
                value={formData.condicaoSistema}
                onChangeText={(text) => updateField("condicaoSistema", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Quantidade / Nomes dos Responsáveis
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Quantidade / Nomes dos Responsáveis"
                value={formData.responsaveis}
                onChangeText={(text) => updateField("responsaveis", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Estruturas de Apoio Disponíveis</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Estruturas de Apoio Disponíveis"
                multiline
                numberOfLines={3}
                value={formData.estruturas}
                onChangeText={(text) => updateField("estruturas", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Regularidade da Documentação</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Regularidade da Documentação (AR, AVCB, Válido, Vencido...)"
                multiline
                numberOfLines={3}
                value={formData.regularidade}
                onChangeText={(text) => updateField("regularidade", text)}
              />
            </View>
          </View>

          {/* 7. Informações Adicionais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Adicionais</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Informações Adicionais</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Histórico resumido, observações relevantes"
                multiline
                numberOfLines={4}
                value={formData.adicionais}
                onChangeText={(text) => updateField("adicionais", text)}
              />
            </View>
          </View>

          {/* 8. Responsáveis */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsáveis</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Bombeiro Responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bombeiro Responsável"
                  value={formData.bombeiro}
                  onChangeText={(text) => updateField("bombeiro", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Comandante da Operação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Comandante da Operação"
                  value={formData.comandante}
                  onChangeText={(text) => updateField("comandante", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Matrícula</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Matrícula"
                  value={formData.matricula}
                  onChangeText={(text) => updateField("matricula", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
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
                <Text style={styles.label}>Rubrica</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Rubrica"
                  value={formData.rubrica}
                  onChangeText={(text) => updateField("rubrica", text)}
                />
              </View>
            </View>
          </View>

          {/* Botão Final */}
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#6AC66F" }]}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>Salvar Formulário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
