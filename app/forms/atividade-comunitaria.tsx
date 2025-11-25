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

// Componente Checkbox customizado (reutilizável)
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

export default function AtividadeComunitariaScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    ciops: "",
    viatura: "",
    aviso: "",
    data: "",

    // 2. Evento
    nomeEvento: "",
    horaInicio: "",
    horaFim: "",
    endereco: "",

    // 3. Responsável
    responsavel: "",
    cpf: "",
    instituicao: "",

    // 4. Classificação
    grupo: "",
    missao: "",
    publico: "",
    participantes: "",

    // 5. Atividades Executadas
    apoio: false,
    educativa: false,
    social: false,
    religiosa: false,
    acoesSociais: false,

    // 6. Recursos
    efetivo: "",
    viaturas: "",
    embarcacoes: "",
    equipamentos: "",
    estruturas: "",

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
      "Formulário de Atividade Comunitária salvo com sucesso!",
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
          <Ionicons name="arrow-back" size={24} color="#C4953B" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atividade Comunitária</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.card, { borderColor: "#C4953B" }]}>
          <Text style={[styles.title, { color: "#C4953B" }]}>
            Formulário de Atividade Comunitária
          </Text>

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
                placeholder="CIOPS / Seção"
                value={formData.ciops}
                onChangeText={(text) => updateField("ciops", text)}
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
            </View>
          </View>

          {/* 2. Evento */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Evento</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do Evento"
              value={formData.nomeEvento}
              onChangeText={(text) => updateField("nomeEvento", text)}
            />

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Hora Início"
                value={formData.horaInicio}
                onChangeText={(text) => updateField("horaInicio", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Hora Fim"
                value={formData.horaFim}
                onChangeText={(text) => updateField("horaFim", text)}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Endereço completo"
              value={formData.endereco}
              onChangeText={(text) => updateField("endereco", text)}
            />
          </View>

          {/* 3. Responsável */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsável pela Atividade</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Nome do Responsável"
                value={formData.responsavel}
                onChangeText={(text) => updateField("responsavel", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="CPF"
                value={formData.cpf}
                onChangeText={(text) => updateField("cpf", text)}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Instituição"
              value={formData.instituicao}
              onChangeText={(text) => updateField("instituicao", text)}
            />
          </View>

          {/* 4. Classificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Classificação</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Grupo/Subgrupo"
                value={formData.grupo}
                onChangeText={(text) => updateField("grupo", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Tipo de Missão"
                value={formData.missao}
                onChangeText={(text) => updateField("missao", text)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Público Atendido"
                value={formData.publico}
                onChangeText={(text) => updateField("publico", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Nº de Pessoas"
                value={formData.participantes}
                onChangeText={(text) => updateField("participantes", text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* 5. Atividades Executadas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Atividades Executadas</Text>

            <View style={styles.checkboxGroup}>
              <Checkbox
                label="Apoio à Instituição"
                value={formData.apoio}
                onValueChange={(value) => updateField("apoio", value)}
              />
              <Checkbox
                label="Interação Educativa"
                value={formData.educativa}
                onValueChange={(value) => updateField("educativa", value)}
              />
              <Checkbox
                label="Interação Social"
                value={formData.social}
                onValueChange={(value) => updateField("social", value)}
              />
              <Checkbox
                label="Interação Religiosa"
                value={formData.religiosa}
                onValueChange={(value) => updateField("religiosa", value)}
              />
              <Checkbox
                label="Encaminhamento para Ações Sociais"
                value={formData.acoesSociais}
                onValueChange={(value) => updateField("acoesSociais", value)}
              />
            </View>
          </View>

          {/* 6. Recursos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recursos Empregados</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Efetivo"
                value={formData.efetivo}
                onChangeText={(text) => updateField("efetivo", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Viaturas"
                value={formData.viaturas}
                onChangeText={(text) => updateField("viaturas", text)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Embarcações"
                value={formData.embarcacoes}
                onChangeText={(text) => updateField("embarcacoes", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Equipamentos"
                value={formData.equipamentos}
                onChangeText={(text) => updateField("equipamentos", text)}
              />
            </View>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Estruturas de Apoio"
              multiline
              numberOfLines={3}
              value={formData.estruturas}
              onChangeText={(text) => updateField("estruturas", text)}
            />
          </View>

          {/* 7. Informações Adicionais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Adicionais</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Histórico resumido, observações relevantes"
              multiline
              numberOfLines={4}
              value={formData.adicionais}
              onChangeText={(text) => updateField("adicionais", text)}
            />
          </View>

          {/* 8. Responsáveis */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsáveis</Text>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Bombeiro Responsável"
                value={formData.bombeiro}
                onChangeText={(text) => updateField("bombeiro", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Comandante da Operação"
                value={formData.comandante}
                onChangeText={(text) => updateField("comandante", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Matrícula"
                value={formData.matricula}
                onChangeText={(text) => updateField("matricula", text)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Telefone (81) 99999-9999"
                value={formData.telefone}
                onChangeText={(text) => updateField("telefone", text)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Rubrica"
                value={formData.rubrica}
                onChangeText={(text) => updateField("rubrica", text)}
              />
            </View>
          </View>

          {/* Botão Final */}
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#C4953B" }]}
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
    color: "#C4953B",
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#C4953B",
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  checkboxGroup: {
    flexDirection: "column",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
    backgroundColor: "#C4953B",
    borderColor: "#C4953B",
  },
  checkboxText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
    flex: 1,
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
