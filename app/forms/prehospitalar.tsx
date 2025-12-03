import { prehospitalarStyles as styles } from "@/styles/prehospitalarStyles";
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

export default function FormularioAPHScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    viatura: "",
    data: "",

    // 2. Classificação
    grupo: "",
    subgrupo: "",
    tipoEvento: "",

    // 3. Dados da Vítima
    nome: "",
    cpf: "",
    idade: "",
    sexo: "",
    endereco: "",

    // 4. Avaliação Clínica
    principaisLesoes: "",
    pa: "",
    pulso: "",
    resp: "",
    temp: "",
    sat: "",

    // 4b. Glasgow
    ocular: "",
    verbal: "",
    motora: "",

    // 4c. Queimaduras
    superficie: "",
    viasAereas: "",

    // 5. Ações Realizadas
    viasAereasCheck: false,
    rcpCheck: false,
    hemorragiaCheck: false,

    // 6. Destino da Vítima
    condicao: "",
    hospital: "",
    profissional: "",
    registro: "",

    // 7. Responsáveis
    bombeiro: "",
    comandante: "",
    telefone: "",
    rubrica: "",
  });

  const handleExport = () => {
    Alert.alert(
      "Salvar Formulário",
      "Formulário de Atendimento Pré-Hospitalar salvo com sucesso!",
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
        <Text style={styles.headerTitle}>Pré-Hospitalar</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.card, { borderColor: "#FE9900" }]}>
          <Text style={[styles.title, { color: "#FE9900" }]}>
            Formulário de Atendimento Pré-Hospitalar
          </Text>

          {/* 1. Identificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Ponto Base</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: GBAPH - 1º SBPH"
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
                <Text style={styles.label}>Grupo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: GRUPO 01"
                  value={formData.grupo}
                  onChangeText={(text) => updateField("grupo", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Subgrupo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: SUBGRUPO 02"
                  value={formData.subgrupo}
                  onChangeText={(text) => updateField("subgrupo", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Evento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Acidente de trânsito"
                  value={formData.tipoEvento}
                  onChangeText={(text) => updateField("tipoEvento", text)}
                />
              </View>
            </View>
          </View>

          {/* 3. Dados da Vítima */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados da Vítima</Text>

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
                <Text style={styles.label}>RG/CPF</Text>
                <TextInput
                  style={styles.input}
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChangeText={(text) => updateField("cpf", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Idade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 35"
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
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={styles.input}
                placeholder="Rua, nº, bairro, cidade"
                value={formData.endereco}
                onChangeText={(text) => updateField("endereco", text)}
              />
            </View>
          </View>

          {/* 4. Avaliação Clínica */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avaliação Clínica</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Principais Lesões</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ex: Fratura fechada, hemorragia externa"
                multiline
                numberOfLines={3}
                value={formData.principaisLesoes}
                onChangeText={(text) => updateField("principaisLesoes", text)}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>PA</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 12x8"
                  value={formData.pa}
                  onChangeText={(text) => updateField("pa", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Pulso</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 80 bpm"
                  value={formData.pulso}
                  onChangeText={(text) => updateField("pulso", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Respiração</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 18 mr"
                  value={formData.resp}
                  onChangeText={(text) => updateField("resp", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Temperatura</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 36°C"
                  value={formData.temp}
                  onChangeText={(text) => updateField("temp", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Saturação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 98%"
                  value={formData.sat}
                  onChangeText={(text) => updateField("sat", text)}
                />
              </View>
            </View>
          </View>

          {/* 4b. Escala de Glasgow */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Escala de Coma de Glasgow</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Abertura Ocular</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1 a 4"
                  value={formData.ocular}
                  onChangeText={(text) => updateField("ocular", text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Resposta Verbal</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1 a 5"
                  value={formData.verbal}
                  onChangeText={(text) => updateField("verbal", text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Resposta Motora</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1 a 6"
                  value={formData.motora}
                  onChangeText={(text) => updateField("motora", text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.helperText}>
              A soma dos três parâmetros define o grau de Glasgow (3 a 15
              pontos).
            </Text>
          </View>

          {/* 4c. Queimaduras */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Queimaduras</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>% Superfície Corporal Queimada</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 18"
                  value={formData.superficie}
                  onChangeText={(text) => updateField("superficie", text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Vias Aéreas Atingidas?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sim / Não"
                  value={formData.viasAereas}
                  onChangeText={(text) => updateField("viasAereas", text)}
                />
              </View>
            </View>

            <Text style={styles.helperText}>
              Utilize a regra dos 9 ou diagrama de superfície corporal para
              estimar.
            </Text>
          </View>

          {/* 5. Ações Realizadas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Realizadas</Text>

            <View style={styles.checkboxGroup}>
              <Checkbox
                label="Vias Aéreas"
                value={formData.viasAereasCheck}
                onValueChange={(value) => updateField("viasAereasCheck", value)}
              />
              <Checkbox
                label="RCP"
                value={formData.rcpCheck}
                onValueChange={(value) => updateField("rcpCheck", value)}
              />
              <Checkbox
                label="Controle de Hemorragia"
                value={formData.hemorragiaCheck}
                onValueChange={(value) => updateField("hemorragiaCheck", value)}
              />
            </View>
          </View>

          {/* 6. Destino da Vítima */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Destino da Vítima</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Condição Final</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Com vida / Sem vida"
                  value={formData.condicao}
                  onChangeText={(text) => updateField("condicao", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Hospital / Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: UPA Caxangá, Hospital Estadual"
                  value={formData.hospital}
                  onChangeText={(text) => updateField("hospital", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Médico/Enfermeiro que recebeu</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  value={formData.profissional}
                  onChangeText={(text) => updateField("profissional", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>CRM / COREN</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: CRM 12345 / COREN 67890"
                  value={formData.registro}
                  onChangeText={(text) => updateField("registro", text)}
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

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Rubrica</Text>
              <TextInput
                style={styles.input}
                placeholder="Assinatura abreviada"
                value={formData.rubrica}
                onChangeText={(text) => updateField("rubrica", text)}
              />
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
