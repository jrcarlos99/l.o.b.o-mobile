import FormCheckbox from "@/components/Forms/FormCheckbox";
import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { prevencaoSchema } from "@/schema/prevencaoSchema";
import { prevencaoStyles as styles } from "@/styles/prevencaoStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrevencaoScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(prevencaoSchema),
    defaultValues: {
      // 1. Identificação
      pontoBase: "",
      ome: "",
      viatura: "",
      aviso: "",
      data: "",
      // 2. Evento
      nomeEvento: "",
      horaChegada: "",
      horaSaida: "",
      documento: "",
      // 3. Classificação
      regularizadoSim: false,
      regularizadoNao: false,
      cgo: "",
      grupo: "",
      // 4. Responsável pelo Evento
      responsavel: "",
      cpfcnpj: "",
      publicoEstimado: "",
      publicoPresente: "",
      // 5. Prevenção Executada
      apoio: false,
      aquatica: false,
      festivo: false,
      esportivo: false,
      // 6. Condições e Estruturas
      condicaoSistema: "",
      responsaveis: "",
      estruturas: "",
      regularidade: "",
      // 7. Informações Adicionais
      adicionais: "",
      // 8. Responsáveis
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
          <Ionicons name="arrow-back" size={24} color="#6AC66F" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prevenção</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Formulário de Prevenção</Text>

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
          </FormRow>

          {/* 2. Evento */}
          <Text style={styles.sectionTitle}>Evento</Text>
          <FormInput
            control={control}
            name="nomeEvento"
            placeholder="Nome do Evento"
            style={styles.input}
          />
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="horaChegada"
              placeholder="Hora Chegada"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="horaSaida"
              placeholder="Hora Saída"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="documento"
            placeholder="Documento de Referência"
            style={styles.input}
          />

          {/* 3. Classificação */}
          <Text style={styles.sectionTitle}>Classificação</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox
              control={control}
              name="regularizadoSim"
              label="Evento Regularizado - Sim"
            />
            <FormCheckbox
              control={control}
              name="regularizadoNao"
              label="Evento Regularizado - Não"
            />
          </View>
          <FormInput
            control={control}
            name="cgo"
            placeholder="Código CGO"
            style={styles.input}
          />
          <FormInput
            control={control}
            name="grupo"
            placeholder="Grupo/Subgrupo (por extenso)"
            style={styles.input}
          />

          {/* 4. Responsável pelo Evento */}
          <Text style={styles.sectionTitle}>Responsável pelo Evento</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="responsavel"
              placeholder="Nome do Responsável"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="cpfcnpj"
              placeholder="CPF / CNPJ"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="publicoEstimado"
              placeholder="Público Estimado"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="publicoPresente"
              placeholder="Público Presente"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 5. Prevenção Executada */}
          <Text style={styles.sectionTitle}>Prevenção Executada</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox
              control={control}
              name="apoio"
              label="Apoio à Operação"
            />
            <FormCheckbox
              control={control}
              name="aquatica"
              label="Prevenção Aquática"
            />
            <FormCheckbox
              control={control}
              name="festivo"
              label="Evento Festivo"
            />
            <FormCheckbox
              control={control}
              name="esportivo"
              label="Evento Esportivo"
            />
          </View>

          {/* 6. Condições e Estruturas */}
          <Text style={styles.sectionTitle}>Condições e Estruturas</Text>
          <FormTextArea
            control={control}
            name="condicaoSistema"
            placeholder="Condição do Sistema Preventivo Existente"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />
          <FormInput
            control={control}
            name="responsaveis"
            placeholder="Quantidade / Nomes dos Responsáveis"
            style={styles.input}
          />
          <FormTextArea
            control={control}
            name="estruturas"
            placeholder="Estruturas de Apoio Disponíveis"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />
          <FormTextArea
            control={control}
            name="regularidade"
            placeholder="Regularidade da Documentação (AR, AVCB, Válido, Vencido...)"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />

          {/* 7. Informações Adicionais */}
          <Text style={styles.sectionTitle}>Informações Adicionais</Text>
          <FormTextArea
            control={control}
            name="adicionais"
            placeholder="Histórico resumido, observações relevantes"
            style={styles.input}
            height={110}
            numberOfLines={4}
          />

          {/* 8. Responsáveis */}
          <Text style={styles.sectionTitle}>Responsáveis</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="bombeiro"
              placeholder="Bombeiro Responsável"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="comandante"
              placeholder="Comandante da Operação"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="matricula"
              placeholder="Matrícula"
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
              placeholder="Rubrica"
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
