import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { historicoSchema } from "@/schema/historicoSchema";
import { historicoStyles as styles } from "@/styles/historicoStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FolhaHistoricoScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(historicoSchema),
    defaultValues: {
      // 1. Identificação
      pontoBase: "",
      ome: "",
      viatura: "",
      aviso: "",
      data: "",
      hora: "",
      tipo: "",
      codigo: "",
      sigilo: "",
      // 2. Histórico
      historico: "",
      // 3. Guarnição Empenhada
      posto: "",
      nomeGuerra: "",
      matricula: "",
      demaisGuarnicao: "",
      // 4. Visto
      dataVisto: "",
      assinatura: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados validados", data);
    Alert.alert(
      "Sucesso",
      "Folha de Histórico validada e pronta para exportar!"
    );
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
          <Ionicons name="arrow-back" size={24} color="#A29F90" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Folha de Histórico</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Folha de Histórico</Text>

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

          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="tipo"
              placeholder="Tipo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="codigo"
              placeholder="Código"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="sigilo"
              placeholder="Sigilo"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 2. Histórico */}
          <Text style={styles.sectionTitle}>Histórico</Text>
          <FormTextArea
            control={control}
            name="historico"
            placeholder="Descreva detalhadamente os fatos: data, hora, local, ações realizadas, desfecho..."
            style={styles.input}
            height={140}
            numberOfLines={6}
          />

          {/* 3. Guarnição Empenhada */}
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

          <FormTextArea
            control={control}
            name="demaisGuarnicao"
            placeholder="Demais componentes da guarnição"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />

          {/* 4. Visto da Divisão de Operações */}
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
