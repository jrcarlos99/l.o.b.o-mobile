import { salvamentoStyles as styles } from "@/styles/salvamentoStyles";
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

export default function SalvamentoScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    viatura: "",
    data: "",

    // 2. Classificação
    tipo: "",
    grupo: "",

    // 3. Local
    endereco: "",
    ambiente: "",
    condicoes: "",

    // 4. Vítima(s)
    nome: "",
    idade: "",
    sexo: "",
    situacao: "",

    // 5. Ações Realizadas
    desencarceramento: false,
    resgateAltura: false,
    mergulho: false,

    // 6. Resultado
    condicaoFinal: "",
    destino: "",

    // 7. Responsáveis
    bombeiro: "",
    comandante: "",
    telefone: "",
  });

  const handleExport = () => {
    Alert.alert(
      "Salvar Formulário",
      "Formulário de Salvamento salvo com sucesso!",
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
          <Ionicons name="arrow-back" size={24} color="#FE9900" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salvamento</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.card, { borderColor: "#FE9900" }]}>
          <Text style={[styles.title, { color: "#FE9900" }]}>
            Formulário de Salvamento
          </Text>

          {/* 1. Identificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Ponto Base</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 1º GB – 2ª Cia"
                  value={formData.pontoBase}
                  onChangeText={(text) => updateField("pontoBase", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Viatura</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: ABS 1234"
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

          {/* 2. Classificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Classificação</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Salvamento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Aquático, Altura, Veicular"
                  value={formData.tipo}
                  onChangeText={(text) => updateField("tipo", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Grupo/Subgrupo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Resgate em altura"
                  value={formData.grupo}
                  onChangeText={(text) => updateField("grupo", text)}
                />
              </View>
            </View>
          </View>

          {/* 3. Local */}
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
                <Text style={styles.label}>Tipo de Ambiente</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Urbano, Rural, Aquático"
                  value={formData.ambiente}
                  onChangeText={(text) => updateField("ambiente", text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Condições do Local</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ex: Acesso difícil, risco de desabamento"
                multiline
                numberOfLines={3}
                value={formData.condicoes}
                onChangeText={(text) => updateField("condicoes", text)}
              />
            </View>
          </View>

          {/* 4. Vítima(s) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vítima(s)</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChangeText={(text) => updateField("nome", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Idade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 30"
                  value={formData.idade}
                  onChangeText={(text) => updateField("idade", text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Sexo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="M / F"
                  value={formData.sexo}
                  onChangeText={(text) => updateField("sexo", text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Situação Encontrada</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Presa em ferragens, submersa"
                value={formData.situacao}
                onChangeText={(text) => updateField("situacao", text)}
              />
            </View>
          </View>

          {/* 5. Ações Realizadas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Realizadas</Text>

            <View style={styles.checkboxGroup}>
              <Checkbox
                label="Desencarceramento"
                value={formData.desencarceramento}
                onValueChange={(value) =>
                  updateField("desencarceramento", value)
                }
              />
              <Checkbox
                label="Resgate em Altura"
                value={formData.resgateAltura}
                onValueChange={(value) => updateField("resgateAltura", value)}
              />
              <Checkbox
                label="Mergulho"
                value={formData.mergulho}
                onValueChange={(value) => updateField("mergulho", value)}
              />
            </View>
          </View>

          {/* 6. Resultado */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resultado</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Condição Final</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Com vida / Sem vida"
                  value={formData.condicaoFinal}
                  onChangeText={(text) => updateField("condicaoFinal", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Destino</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Hospital, UPA, Permaneceu no local"
                  value={formData.destino}
                  onChangeText={(text) => updateField("destino", text)}
                />
              </View>
            </View>
          </View>

          {/* 7. Responsáveis */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsáveis</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Bombeiro Responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  value={formData.bombeiro}
                  onChangeText={(text) => updateField("bombeiro", text)}
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
            </View>
          </View>

          {/* Botão Final */}
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#FE9900" }]}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>Salvar Formulário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
