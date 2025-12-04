import FormCheckbox from "@/components/Forms/FormCheckbox";
import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { salvamentoSchema } from "@/schema/salvamentoSchema";
import { salvamentoStyles as styles } from "@/styles/salvamentoStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SalvamentoScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(salvamentoSchema),
    defaultValues: {
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
          <Ionicons name="arrow-back" size={24} color="#FE9900" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salvamento</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Formulário de Salvamento</Text>

          {/* 1. Identificação */}
          <Text style={styles.sectionTitle}>Identificação da Ocorrência</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="pontoBase"
              placeholder="Ex: 1º GB – 2ª Cia"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="viatura"
              placeholder="Ex: ABS 1234"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="data"
              placeholder="Data (DD/MM/AAAA)"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 2. Classificação */}
          <Text style={styles.sectionTitle}>Classificação</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="tipo"
              placeholder="Ex: Aquático, Altura, Veicular"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="grupo"
              placeholder="Ex: Resgate em altura"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 3. Local */}
          <Text style={styles.sectionTitle}>Local e Especificação</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="endereco"
              placeholder="Rua, nº, bairro, cidade"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="ambiente"
              placeholder="Ex: Urbano, Rural, Aquático"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormTextArea
            control={control}
            name="condicoes"
            placeholder="Ex: Acesso difícil, risco de desabamento"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />

          {/* 4. Vítima(s) */}
          <Text style={styles.sectionTitle}>Vítima(s)</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="nome"
              placeholder="Nome completo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="idade"
              placeholder="Ex: 30"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="sexo"
              placeholder="M / F"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="situacao"
            placeholder="Ex: Presa em ferragens, submersa"
            style={styles.input}
          />

          {/* 5. Ações Realizadas */}
          <Text style={styles.sectionTitle}>Ações Realizadas</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox
              control={control}
              name="desencarceramento"
              label="Desencarceramento"
            />
            <FormCheckbox
              control={control}
              name="resgateAltura"
              label="Resgate em Altura"
            />
            <FormCheckbox control={control} name="mergulho" label="Mergulho" />
          </View>

          {/* 6. Resultado */}
          <Text style={styles.sectionTitle}>Resultado</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="condicaoFinal"
              placeholder="Com vida / Sem vida"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="destino"
              placeholder="Ex: Hospital, UPA, Permaneceu no local"
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
              name="telefone"
              placeholder="(81) 99999-9999"
              keyboardType="phone-pad"
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
