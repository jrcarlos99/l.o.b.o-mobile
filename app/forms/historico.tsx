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

export default function FolhaHistoricoScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",
    hora: "",
    tipo: "",
    codigo: "",
    sigilo: "",
    historico: "",
    posto: "",
    nomeGuerra: "",
    matricula: "",
    demaisGuarnicao: "",
    dataVisto: "",
    assinatura: "",
  });

  const handleExport = () => {
    Alert.alert("Salvar Histórico", "Folha de Histórico salva com sucesso!", [
      { text: "OK" },
    ]);
  };

  const updateField = (field: string, value: string) => {
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
          <Ionicons name="arrow-back" size={24} color="#A29F90" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Folha de Histórico</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.card, { borderColor: "#A29F90" }]}>
          <Text style={[styles.title, { color: "#A29F90" }]}>
            Folha de Histórico
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

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Tipo"
                value={formData.tipo}
                onChangeText={(text) => updateField("tipo", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Código"
                value={formData.codigo}
                onChangeText={(text) => updateField("codigo", text)}
              />
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder="Sigilo"
                value={formData.sigilo}
                onChangeText={(text) => updateField("sigilo", text)}
              />
            </View>
          </View>

          {/* 2. Histórico */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Histórico</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva detalhadamente os fatos: data, hora, local, ações realizadas, desfecho..."
              multiline
              numberOfLines={8}
              value={formData.historico}
              onChangeText={(text) => updateField("historico", text)}
            />
          </View>

          {/* 3. Guarnição Empenhada */}
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

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Demais componentes da guarnição"
              multiline
              numberOfLines={3}
              value={formData.demaisGuarnicao}
              onChangeText={(text) => updateField("demaisGuarnicao", text)}
            />
          </View>

          {/* 4. Visto da Divisão de Operações */}
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
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#A29F90" }]}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>Salvar Histórico</Text>
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
    color: "#A29F90",
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A29F90",
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
    minHeight: 120,
    textAlignVertical: "top",
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
