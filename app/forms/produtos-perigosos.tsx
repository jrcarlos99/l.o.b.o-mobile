import FormCheckbox from "@/components/Forms/FormCheckbox";
import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import { produtosPerigososSchema } from "@/schema/produtosPerigososSchema";
import { produtosPerigososStyles as styles } from "@/styles/produtosPerigososStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProdutosPerigososScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(produtosPerigososSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados validados", data);
    Alert.alert("Sucesso", "Formulário validado e pronto para exportar!");
  };

  const handleExportClick = () => {
    handleSubmit(onSubmit)();
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
        <View style={styles.card}>
          <Text style={styles.title}>Formulário de Produtos Perigosos</Text>

          {/* 1. Identificação */}
          <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="data"
              placeholder="Data (DD/MM/AAAA)"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="hora"
              placeholder="Hora"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="municipio"
              placeholder="Ex: Recife"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="bairro"
              placeholder="Bairro"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="rua"
              placeholder="Rua"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="numero"
              placeholder="Número"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="referencia"
            placeholder="Ex: Próximo ao posto de gasolina"
            style={styles.input}
          />

          {/* 2. Classificação */}
          <Text style={styles.sectionTitle}>Classificação</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="tipoDesastre"
              placeholder="Ex: Vazamento, Explosão"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="grupo"
              placeholder="Ex: COBRADE 2.2.1.1.0"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 3. Produto Envolvido */}
          <Text style={styles.sectionTitle}>Produto Envolvido</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="produto"
              placeholder="Ex: GLP, Ácido Sulfúrico"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="onu"
              placeholder="Ex: 1830"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="classe"
              placeholder="Ex: Inflamável"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="estado"
              placeholder="Sólido / Líquido / Gasoso"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="recipiente"
              placeholder="Ex: Botijão, Tanque, Container"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="volume"
              placeholder="Ex: 200 litros"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="responsavel"
              placeholder="Nome completo"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="cpfcnpj"
            placeholder="000.000.000-00 / 00.000.000/0001-00"
            style={styles.input}
          />

          {/* 4. Impactos */}
          <Text style={styles.sectionTitle}>Impactos</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="contaminados"
              placeholder="Contaminados"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="irradiados"
              placeholder="Irradiados"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="evacuados"
              placeholder="Evacuados"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="obitos"
              placeholder="Óbitos"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="feridos"
              placeholder="Feridos"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="areaIsolada"
              placeholder="Área Isolada (m²/km²)"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="areaContaminada"
              placeholder="Área Contaminada (m²/km²)"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="areaEvacuada"
              placeholder="Área Evacuada (m²/km²)"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <Text style={styles.label}>Ambiente Afetado</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox control={control} name="solo" label="Solo" />
            <FormCheckbox
              control={control}
              name="manancial"
              label="Manancial"
            />
            <FormCheckbox
              control={control}
              name="atmosfera"
              label="Atmosfera"
            />
            <FormCheckbox
              control={control}
              name="edificacoes"
              label="Edificações"
            />
          </View>

          {/* 5. Ações Realizadas */}
          <Text style={styles.sectionTitle}>Ações Realizadas</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox
              control={control}
              name="isolamento"
              label="Isolamento"
            />
            <FormCheckbox
              control={control}
              name="contencao"
              label="Contenção"
            />
            <FormCheckbox
              control={control}
              name="neutralizacao"
              label="Neutralização"
            />
            <FormCheckbox
              control={control}
              name="transbordo"
              label="Transbordo / Remoção"
            />
            <FormCheckbox
              control={control}
              name="interdicao"
              label="Interdição de via"
            />
          </View>

          {/* 6. Resultado */}
          <Text style={styles.sectionTitle}>Resultado</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="situacaoFinal"
              placeholder="Ex: Controlado, em andamento"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="orgaos"
              placeholder="Ex: Defesa Civil, IBAMA"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 7. Responsáveis */}
          <Text style={styles.sectionTitle}>Responsáveis</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="bombeiro"
              placeholder="Nome completo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="comandante"
              placeholder="Nome de guerra"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="matricula"
              placeholder="Ex: 123456-7"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="telefone"
              placeholder="(81) 99999-9999"
              keyboardType="phone-pad"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="rubrica"
              placeholder="Assinatura abreviada"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* Botão Final */}
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportClick}
          >
            <Text style={styles.exportButtonText}>Exportar PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
