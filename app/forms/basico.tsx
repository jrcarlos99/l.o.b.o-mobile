import FormCheckbox from "@/components/Forms/FormCheckbox";
import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { basicoSchema } from "@/schema/basicoSchema";
import { basicoStyles as styles } from "@/styles/basicoStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormBasicoScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(basicoSchema),
    defaultValues: {
      // Identificação
      pontoBase: "",
      ome: "",
      viatura: "",
      aviso: "",
      data: "",
      hora: "",
      formaAcionamento: "",
      situacao: "",
      // Local
      logradouro: "",
      numero: "",
      bairro: "",
      referencia: "",
      coordenadas: "",
      // Solicitante
      nomeSolicitante: "",
      cpfSolicitante: "",
      telefoneSolicitante: "",
      // Natureza
      natureza: "",
      // Vítimas
      vitimaIlesa: false,
      vitimaLeve: false,
      vitimaGrave: false,
      vitimaObito: false,
      // Apoio
      viaturasApoio: "",
      instituicoesApoio: "",
      // Histórico
      historico: "",
      // Guarnição
      posto: "",
      nomeGuerra: "",
      matricula: "",
      // Visto
      dataVisto: "",
      assinatura: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados validados", data);
    Alert.alert("Sucesso", "Formulário validado e pronto para exportar!");
  };

  const handleExportClick = () => {
    handleSubmit(onSubmit)();
  };

  const handleExport = () => {
    Alert.alert(
      "Exportar PDF",
      "Funcionalidade de exportação em desenvolvimento",
      [{ text: "OK" }]
    );
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
          <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="pontoBase"
              placeholder="Ponto Base"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="ome"
              placeholder="OME / Seção"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="viatura"
              placeholder="Viatura Responsável"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="aviso"
              placeholder="Nº do Aviso"
              style={[styles.input, styles.flex1]}
            />
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
          </FormRow>
          <FormInput
            control={control}
            name="formaAcionamento"
            placeholder="Forma de Acionamento (CIODS, Direto...)"
            style={styles.input}
          />
          <FormInput
            control={control}
            name="situacao"
            placeholder="Situação da Ocorrência (Atendida, Não Atendida...)"
            style={styles.input}
          />

          {/* 2. Local */}
          <Text style={styles.sectionTitle}>Local da Ocorrência</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="logradouro"
              placeholder="Logradouro"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="numero"
              placeholder="Número"
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
              name="referencia"
              placeholder="Ponto de Referência"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="coordenadas"
            placeholder="Coordenadas (Lat/Long)"
            style={styles.input}
          />

          {/* 3. Solicitante */}
          <Text style={styles.sectionTitle}>Solicitante</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="nomeSolicitante"
              placeholder="Nome"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="cpfSolicitante"
              placeholder="CPF (somente números)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="telefoneSolicitante"
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 4. Natureza */}
          <Text style={styles.sectionTitle}>Natureza da Ocorrência</Text>
          <FormInput
            control={control}
            name="natureza"
            placeholder="Ex: Acidente de trânsito, apoio a órgão público..."
            style={styles.input}
          />

          {/* 5. Vítimas */}
          <Text style={styles.sectionTitle}>Vítimas Envolvidas</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox control={control} name="vitimaIlesa" label="Ilesa" />
            <FormCheckbox
              control={control}
              name="vitimaLeve"
              label="Ferido Leve"
            />
            <FormCheckbox
              control={control}
              name="vitimaGrave"
              label="Ferido Grave"
            />
            <FormCheckbox control={control} name="vitimaObito" label="Óbito" />
          </View>

          {/* 6. Apoio */}
          <Text style={styles.sectionTitle}>Viaturas / Apoio</Text>
          <FormTextArea
            control={control}
            name="viaturasApoio"
            placeholder="Viaturas envolvidas"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />
          <FormTextArea
            control={control}
            name="instituicoesApoio"
            placeholder="Instituições de apoio (SAMU, PM, Guarda Municipal...)"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />

          {/* 7. Histórico */}
          <Text style={styles.sectionTitle}>Histórico Resumido</Text>
          <FormTextArea
            control={control}
            name="historico"
            placeholder="Descreva de forma objetiva os fatos"
            style={styles.input}
            height={140}
            numberOfLines={6}
          />

          {/* 8. Guarnição */}
          <Text style={styles.sectionTitle}>Guarnição Empenhada</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="posto"
              placeholder="Posto/Graduação"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="nomeGuerra"
              placeholder="Nome de Guerra"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="matricula"
              placeholder="Matrícula"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 9. Visto */}
          <Text style={styles.sectionTitle}>Visto da Divisão de Operações</Text>
          <FormInput
            control={control}
            name="dataVisto"
            placeholder="Data Visto (DD/MM/AAAA)"
            style={styles.input}
          />
          <FormInput
            control={control}
            name="assinatura"
            placeholder="Assinatura / Rubrica"
            style={styles.input}
          />

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
