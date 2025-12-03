import { basicoStyles as styles } from "@/styles/basicoStyles";
import { Ionicons } from "@expo/vector-icons"; // Para ícone de voltar
import { useRouter } from "expo-router"; // Import para navegação de volta
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

export default function FormBasicoScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",
    hora: "",
    formaAcionamento: "",
    situacao: "",
    logradouro: "",
    numero: "",
    bairro: "",
    referencia: "",
    coordenadas: "",
    nomeSolicitante: "",
    cpfSolicitante: "",
    telefoneSolicitante: "",
    natureza: "",
    vitimaIlesa: false,
    vitimaLeve: false,
    vitimaGrave: false,
    vitimaObito: false,
    viaturasApoio: "",
    instituicoesApoio: "",
    historico: "",
    posto: "",
    nomeGuerra: "",
    matricula: "",
    dataVisto: "",
    assinatura: "",
  });

  const handleExport = () => {
    Alert.alert(
      "Exportar PDF",
      "Funcionalidade de exportação em desenvolvimento",
      [{ text: "OK" }]
    );
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#6C2020" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atendimento Básico</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Formulário de Atendimento Básico</Text>

          {/* 1. Identificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Ponto Base"
                value={formData.pontoBase}
                onChangeText={(text) => updateField("pontoBase", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="OME / Seção"
                value={formData.ome}
                onChangeText={(text) => updateField("ome", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Viatura Responsável"
                value={formData.viatura}
                onChangeText={(text) => updateField("viatura", text)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Nº do Aviso"
                value={formData.aviso}
                onChangeText={(text) => updateField("aviso", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Data (DD/MM/AAAA)"
                value={formData.data}
                onChangeText={(text) => updateField("data", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Hora"
                value={formData.hora}
                onChangeText={(text) => updateField("hora", text)}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Forma de Acionamento (CIODS, Direto...)"
              value={formData.formaAcionamento}
              onChangeText={(text) => updateField("formaAcionamento", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Situação da Ocorrência (Atendida, Não Atendida...)"
              value={formData.situacao}
              onChangeText={(text) => updateField("situacao", text)}
            />
          </View>

          {/* 2. Local */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Local da Ocorrência</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Logradouro"
                value={formData.logradouro}
                onChangeText={(text) => updateField("logradouro", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Número"
                value={formData.numero}
                onChangeText={(text) => updateField("numero", text)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Bairro"
                value={formData.bairro}
                onChangeText={(text) => updateField("bairro", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Ponto de Referência"
                value={formData.referencia}
                onChangeText={(text) => updateField("referencia", text)}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Coordenadas (Lat/Long)"
              value={formData.coordenadas}
              onChangeText={(text) => updateField("coordenadas", text)}
            />
          </View>

          {/* 3. Solicitante */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Solicitante</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Nome"
                value={formData.nomeSolicitante}
                onChangeText={(text) => updateField("nomeSolicitante", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="CPF / RG"
                value={formData.cpfSolicitante}
                onChangeText={(text) => updateField("cpfSolicitante", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Telefone"
                value={formData.telefoneSolicitante}
                onChangeText={(text) =>
                  updateField("telefoneSolicitante", text)
                }
              />
            </View>
          </View>

          {/* 4. Natureza */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Natureza da Ocorrência</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Acidente de trânsito, apoio a órgão público..."
              value={formData.natureza}
              onChangeText={(text) => updateField("natureza", text)}
            />
          </View>

          {/* 5. Vítimas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vítimas Envolvidas</Text>

            <View style={styles.checkboxGroup}>
              <Checkbox
                label="Ilesa"
                value={formData.vitimaIlesa}
                onValueChange={(value) => updateField("vitimaIlesa", value)}
              />
              <Checkbox
                label="Ferido Leve"
                value={formData.vitimaLeve}
                onValueChange={(value) => updateField("vitimaLeve", value)}
              />
              <Checkbox
                label="Ferido Grave"
                value={formData.vitimaGrave}
                onValueChange={(value) => updateField("vitimaGrave", value)}
              />
              <Checkbox
                label="Óbito"
                value={formData.vitimaObito}
                onValueChange={(value) => updateField("vitimaObito", value)}
              />
            </View>
          </View>

          {/* 6. Apoio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Viaturas / Apoio</Text>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Viaturas envolvidas"
              multiline
              numberOfLines={3}
              value={formData.viaturasApoio}
              onChangeText={(text) => updateField("viaturasApoio", text)}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Instituições de apoio (SAMU, PM, Guarda Municipal...)"
              multiline
              numberOfLines={3}
              value={formData.instituicoesApoio}
              onChangeText={(text) => updateField("instituicoesApoio", text)}
            />
          </View>

          {/* 7. Histórico */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Histórico Resumido</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva de forma objetiva os fatos"
              multiline
              numberOfLines={6}
              value={formData.historico}
              onChangeText={(text) => updateField("historico", text)}
            />
          </View>

          {/* 8. Guarnição */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guarnição Empenhada</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Posto/Graduação"
                value={formData.posto}
                onChangeText={(text) => updateField("posto", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Nome de Guerra"
                value={formData.nomeGuerra}
                onChangeText={(text) => updateField("nomeGuerra", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Matrícula"
                value={formData.matricula}
                onChangeText={(text) => updateField("matricula", text)}
              />
            </View>
          </View>

          {/* 9. Visto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Visto da Divisão de Operações
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Data Visto (DD/MM/AAAA)"
              value={formData.dataVisto}
              onChangeText={(text) => updateField("dataVisto", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Assinatura / Rubrica"
              value={formData.assinatura}
              onChangeText={(text) => updateField("assinatura", text)}
            />
          </View>

          {/* Botão Final */}
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Text style={styles.exportButtonText}>Exportar PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
