import FormCheckbox from "@/components/Forms/FormCheckbox";
import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { atividadeComunitariaSchema } from "@/schema/atividadeComunitariaSchema";
import { atividadeComunitariaStyles as styles } from "@/styles/atividadeComunitariaStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AtividadeComunitariaScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(atividadeComunitariaSchema),
    defaultValues: {
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
          <Ionicons name="arrow-back" size={24} color="#C4953B" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atividade Comunitária</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Formulário de Atividade Comunitária</Text>

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
              name="ciops"
              placeholder="CIOPS / Seção"
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
              name="horaInicio"
              placeholder="Hora Início"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="horaFim"
              placeholder="Hora Fim"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="endereco"
            placeholder="Endereço completo"
            style={styles.input}
          />

          {/* 3. Responsável */}
          <Text style={styles.sectionTitle}>Responsável pela Atividade</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="responsavel"
              placeholder="Nome do Responsável"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="cpf"
              placeholder="CPF"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="instituicao"
            placeholder="Instituição"
            style={styles.input}
          />

          {/* 4. Classificação */}
          <Text style={styles.sectionTitle}>Classificação</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="grupo"
              placeholder="Grupo/Subgrupo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="missao"
              placeholder="Tipo de Missão"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="publico"
              placeholder="Público Atendido"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="participantes"
              placeholder="Nº de Pessoas"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 5. Atividades Executadas */}
          <Text style={styles.sectionTitle}>Atividades Executadas</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox
              control={control}
              name="apoio"
              label="Apoio à Instituição"
            />
            <FormCheckbox
              control={control}
              name="educativa"
              label="Interação Educativa"
            />
            <FormCheckbox
              control={control}
              name="social"
              label="Interação Social"
            />
            <FormCheckbox
              control={control}
              name="religiosa"
              label="Interação Religiosa"
            />
            <FormCheckbox
              control={control}
              name="acoesSociais"
              label="Encaminhamento para Ações Sociais"
            />
          </View>

          {/* 6. Recursos */}
          <Text style={styles.sectionTitle}>Recursos Empregados</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="efetivo"
              placeholder="Efetivo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="viaturas"
              placeholder="Viaturas"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="embarcacoes"
              placeholder="Embarcações"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="equipamentos"
              placeholder="Equipamentos"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormTextArea
            control={control}
            name="estruturas"
            placeholder="Estruturas de Apoio"
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
              placeholder="Telefone (81) 99999-9999"
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
