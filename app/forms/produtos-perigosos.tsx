import { produtosPerigososStyles as styles } from "@/styles/produtosPerigososStyles";
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

export default function ProdutosPerigososScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // 1. Identificação
    data: "",
    hora: "",
    municipio: "",
    bairro: "",
    rua: "",
    numero: "",
    referencia: "",

    // 2. Classificação
    tipoDesastre: "",
    grupo: "",

    // 3. Produto Envolvido
    produto: "",
    onu: "",
    classe: "",
    estado: "",
    recipiente: "",
    volume: "",
    responsavel: "",
    cpfcnpj: "",

    // 4. Impactos
    contaminados: "",
    irradiados: "",
    evacuados: "",
    obitos: "",
    feridos: "",
    areaIsolada: "",
    areaContaminada: "",
    areaEvacuada: "",
    solo: false,
    manancial: false,
    atmosfera: false,
    edificacoes: false,

    // 5. Ações Realizadas
    isolamento: false,
    contencao: false,
    neutralizacao: false,
    transbordo: false,
    interdicao: false,

    // 6. Resultado
    situacaoFinal: "",
    orgaos: "",

    // 7. Responsáveis
    bombeiro: "",
    comandante: "",
    matricula: "",
    telefone: "",
    rubrica: "",
  });

  const handleExport = () => {
    Alert.alert(
      "Salvar Formulário",
      "Formulário de Produtos Perigosos salvo com sucesso!",
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
          <Ionicons name="arrow-back" size={24} color="#FFB901" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Produtos Perigosos</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={[styles.card, { borderColor: "#FFB901" }]}>
          <Text style={[styles.title, { color: "#FFB901" }]}>
            Formulário de Produtos Perigosos
          </Text>

          {/* 1. Identificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>

            <View style={styles.row}>
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
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Município</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Recife"
                  value={formData.municipio}
                  onChangeText={(text) => updateField("municipio", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Bairro</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bairro"
                  value={formData.bairro}
                  onChangeText={(text) => updateField("bairro", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Rua</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Rua"
                  value={formData.rua}
                  onChangeText={(text) => updateField("rua", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Número</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número"
                  value={formData.numero}
                  onChangeText={(text) => updateField("numero", text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Referência</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Próximo ao posto de gasolina"
                value={formData.referencia}
                onChangeText={(text) => updateField("referencia", text)}
              />
            </View>
          </View>

          {/* 2. Classificação */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Classificação</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Desastre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Vazamento, Explosão"
                  value={formData.tipoDesastre}
                  onChangeText={(text) => updateField("tipoDesastre", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Grupo/Subgrupo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: COBRADE 2.2.1.1.0"
                  value={formData.grupo}
                  onChangeText={(text) => updateField("grupo", text)}
                />
              </View>
            </View>
          </View>

          {/* 3. Produto Envolvido */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Produto Envolvido</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Nome do Produto</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: GLP, Ácido Sulfúrico"
                  value={formData.produto}
                  onChangeText={(text) => updateField("produto", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Nº ONU</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 1830"
                  value={formData.onu}
                  onChangeText={(text) => updateField("onu", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Classe de Risco</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Inflamável"
                  value={formData.classe}
                  onChangeText={(text) => updateField("classe", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Estado Físico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sólido / Líquido / Gasoso"
                  value={formData.estado}
                  onChangeText={(text) => updateField("estado", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Tipo de Recipiente</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Botijão, Tanque, Container"
                  value={formData.recipiente}
                  onChangeText={(text) => updateField("recipiente", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Volume/Massa Estimada</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 200 litros"
                  value={formData.volume}
                  onChangeText={(text) => updateField("volume", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Responsável pelo Produto</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  value={formData.responsavel}
                  onChangeText={(text) => updateField("responsavel", text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF/CNPJ</Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00 / 00.000.000/0001-00"
                value={formData.cpfcnpj}
                onChangeText={(text) => updateField("cpfcnpj", text)}
              />
            </View>
          </View>

          {/* 4. Impactos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Impactos</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Contaminados</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contaminados"
                  value={formData.contaminados}
                  onChangeText={(text) => updateField("contaminados", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Irradiados</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Irradiados"
                  value={formData.irradiados}
                  onChangeText={(text) => updateField("irradiados", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Evacuados</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Evacuados"
                  value={formData.evacuados}
                  onChangeText={(text) => updateField("evacuados", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Óbitos</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Óbitos"
                  value={formData.obitos}
                  onChangeText={(text) => updateField("obitos", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Feridos</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Feridos"
                  value={formData.feridos}
                  onChangeText={(text) => updateField("feridos", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Área Isolada (m²/km²)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Área Isolada"
                  value={formData.areaIsolada}
                  onChangeText={(text) => updateField("areaIsolada", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Área Contaminada (m²/km²)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Área Contaminada"
                  value={formData.areaContaminada}
                  onChangeText={(text) => updateField("areaContaminada", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Área Evacuada (m²/km²)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Área Evacuada"
                  value={formData.areaEvacuada}
                  onChangeText={(text) => updateField("areaEvacuada", text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ambiente Afetado</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox
                  label="Solo"
                  value={formData.solo}
                  onValueChange={(value) => updateField("solo", value)}
                />
                <Checkbox
                  label="Manancial"
                  value={formData.manancial}
                  onValueChange={(value) => updateField("manancial", value)}
                />
                <Checkbox
                  label="Atmosfera"
                  value={formData.atmosfera}
                  onValueChange={(value) => updateField("atmosfera", value)}
                />
                <Checkbox
                  label="Edificações"
                  value={formData.edificacoes}
                  onValueChange={(value) => updateField("edificacoes", value)}
                />
              </View>
            </View>
          </View>

          {/* 5. Ações Realizadas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Realizadas</Text>

            <View style={styles.checkboxGroup}>
              <Checkbox
                label="Isolamento"
                value={formData.isolamento}
                onValueChange={(value) => updateField("isolamento", value)}
              />
              <Checkbox
                label="Contenção"
                value={formData.contencao}
                onValueChange={(value) => updateField("contencao", value)}
              />
              <Checkbox
                label="Neutralização"
                value={formData.neutralizacao}
                onValueChange={(value) => updateField("neutralizacao", value)}
              />
              <Checkbox
                label="Transbordo / Remoção"
                value={formData.transbordo}
                onValueChange={(value) => updateField("transbordo", value)}
              />
              <Checkbox
                label="Interdição de via"
                value={formData.interdicao}
                onValueChange={(value) => updateField("interdicao", value)}
              />
            </View>
          </View>

          {/* 6. Resultado */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resultado</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Situação Final</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Controlado, em andamento"
                  value={formData.situacaoFinal}
                  onChangeText={(text) => updateField("situacaoFinal", text)}
                />
              </View>
              <View style={[styles.inputContainer, styles.flex1]}>
                <Text style={styles.label}>Órgãos Acionados</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Defesa Civil, IBAMA"
                  value={formData.orgaos}
                  onChangeText={(text) => updateField("orgaos", text)}
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
                <Text style={styles.label}>Matrícula</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 123456-7"
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
                  placeholder="Assinatura abreviada"
                  value={formData.rubrica}
                  onChangeText={(text) => updateField("rubrica", text)}
                />
              </View>
            </View>
          </View>

          {/* Botão Final */}
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#FFB901" }]}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>Salvar Formulário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
