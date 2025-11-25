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

export default function MergulhoScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // 1. Identificação
    pontoBase: "",
    ome: "",
    viatura: "",
    aviso: "",
    data: "",
    hora: "",

    // 2. Classificação
    grupo: "",
    tipoBusca: "",

    // 3. Local
    local: "",
    referencia: "",

    // 4. Vítimas
    qualificacao: "",
    qtdVitimas: "",
    vitimaLocalizada: "",
    cadaverLocalizado: "",
    bombeiroServico: "",

    // 5. Operação de Mergulho
    tipoOperacao: "",
    numMergulhadores: "",
    profundidade: "",
    tempoFundo: "",
    tempoTotal: "",
    correnteza: "",
    tipoFundo: "",
    ambiente: "",
    coordenadas: "",

    // 6. Recursos
    cilindroNum: "",
    barInicio: "",
    barFim: "",
    outrosRecursos: "",

    // 7. Responsáveis
    mergulhadorMatricula: "",
    mergulhadorNome: "",
    bombeiro: "",
    comandante: "",
    telefone: "",
    rubrica: "",
  });

  const handleExport = () => {
    Alert.alert(
      "Salvar Formulário",
      "Formulário de Operações de Mergulho salvo com sucesso!",
      [{ text: "OK" }]
    );
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
          <Ionicons name="arrow-back" size={24} color="#FE9900" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mergulho</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.card, { borderColor: "#FE9900" }]}>
          <Text style={[styles.title, { color: "#FE9900" }]}>
            Formulário de Operações de Mergulho
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
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Hora</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Hora"
                  value={formData.hora}
                  onChangeText={(text) => updateField("hora", text)}
                />
              </View>
            </View>
          </View>

          {/* 2. Classificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Classificação</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Grupo/Subgrupo</Text>
              <TextInput
                style={styles.input}
                placeholder="Grupo/Subgrupo"
                value={formData.grupo}
                onChangeText={(text) => updateField("grupo", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de Busca/Salvamento</Text>
              <TextInput
                style={styles.input}
                placeholder="Tipo de Busca/Salvamento"
                value={formData.tipoBusca}
                onChangeText={(text) => updateField("tipoBusca", text)}
              />
            </View>
          </View>

          {/* 3. Local */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Local da Operação</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Local</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Mar, Rio, Represa, Açude"
                value={formData.local}
                onChangeText={(text) => updateField("local", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Referência/Especificação</Text>
              <TextInput
                style={styles.input}
                placeholder="Referência/Especificação"
                value={formData.referencia}
                onChangeText={(text) => updateField("referencia", text)}
              />
            </View>
          </View>

          {/* 4. Vítimas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vítimas</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Qualificação da Vítima</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qualificação da Vítima"
                  value={formData.qualificacao}
                  onChangeText={(text) => updateField("qualificacao", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Quantidade de Vítimas</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Quantidade de Vítimas"
                  value={formData.qtdVitimas}
                  onChangeText={(text) => updateField("qtdVitimas", text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Vítima Localizada?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sim/Não"
                  value={formData.vitimaLocalizada}
                  onChangeText={(text) => updateField("vitimaLocalizada", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Cadáver Localizado?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sim/Não"
                  value={formData.cadaverLocalizado}
                  onChangeText={(text) =>
                    updateField("cadaverLocalizado", text)
                  }
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Bombeiro em Serviço?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sim/Não"
                  value={formData.bombeiroServico}
                  onChangeText={(text) => updateField("bombeiroServico", text)}
                />
              </View>
            </View>
          </View>

          {/* 5. Operação de Mergulho */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Operação de Mergulho</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Operação</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tipo de Operação"
                  value={formData.tipoOperacao}
                  onChangeText={(text) => updateField("tipoOperacao", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Nº de Mergulhadores</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nº de Mergulhadores"
                  value={formData.numMergulhadores}
                  onChangeText={(text) => updateField("numMergulhadores", text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Profundidade (m)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Profundidade (m)"
                  value={formData.profundidade}
                  onChangeText={(text) => updateField("profundidade", text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tempo de Fundo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tempo de Fundo"
                  value={formData.tempoFundo}
                  onChangeText={(text) => updateField("tempoFundo", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tempo Total Submerso</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tempo Total Submerso"
                  value={formData.tempoTotal}
                  onChangeText={(text) => updateField("tempoTotal", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Correnteza</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sim/Não"
                  value={formData.correnteza}
                  onChangeText={(text) => updateField("correnteza", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Fundo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Areia, Pedras..."
                  value={formData.tipoFundo}
                  onChangeText={(text) => updateField("tipoFundo", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Ambiente</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Normal, Poluído..."
                  value={formData.ambiente}
                  onChangeText={(text) => updateField("ambiente", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Coordenadas</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Coordenadas (Lat/Long)"
                  value={formData.coordenadas}
                  onChangeText={(text) => updateField("coordenadas", text)}
                />
              </View>
            </View>
          </View>

          {/* 6. Recursos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recursos Utilizados</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Cilindro Nº</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cilindro Nº"
                  value={formData.cilindroNum}
                  onChangeText={(text) => updateField("cilindroNum", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Pressão Inicial (bar)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Pressão Inicial (bar)"
                  value={formData.barInicio}
                  onChangeText={(text) => updateField("barInicio", text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Pressão Final (bar)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Pressão Final (bar)"
                  value={formData.barFim}
                  onChangeText={(text) => updateField("barFim", text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Outros Recursos</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Outros Recursos (máscara, computador de mergulho, etc.)"
                multiline
                numberOfLines={3}
                value={formData.outrosRecursos}
                onChangeText={(text) => updateField("outrosRecursos", text)}
              />
            </View>
          </View>

          {/* 7. Responsáveis */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsáveis</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Matrícula do Mergulhador</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Matrícula do Mergulhador"
                  value={formData.mergulhadorMatricula}
                  onChangeText={(text) =>
                    updateField("mergulhadorMatricula", text)
                  }
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Nome de Guerra do Mergulhador</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome de Guerra do Mergulhador"
                  value={formData.mergulhadorNome}
                  onChangeText={(text) => updateField("mergulhadorNome", text)}
                />
              </View>
            </View>

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
                placeholder="Rubrica"
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
    color: "#FE9900",
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FE9900",
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
