import FormCheckbox from "@/components/Forms/FormCheckbox";
import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { prehospitalarSchema } from "@/schema/prehospitalarSchema";
import { prehospitalarStyles as styles } from "@/styles/prehospitalarStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormularioAPHScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(prehospitalarSchema),
    defaultValues: {
      // 1. Identificação
      pontoBase: "",
      viatura: "",
      data: "",
      // 2. Classificação
      grupo: "",
      subgrupo: "",
      tipoEvento: "",
      // 3. Dados da Vítima
      nome: "",
      cpf: "",
      idade: "",
      sexo: "",
      endereco: "",
      // 4. Avaliação Clínica
      principaisLesoes: "",
      pa: "",
      pulso: "",
      resp: "",
      temp: "",
      sat: "",
      // 4b. Glasgow
      ocular: "",
      verbal: "",
      motora: "",
      // 4c. Queimaduras
      superficie: "",
      viasAereas: "",
      // 5. Ações Realizadas
      viasAereasCheck: false,
      rcpCheck: false,
      hemorragiaCheck: false,
      // 6. Destino da Vítima
      condicao: "",
      hospital: "",
      profissional: "",
      registro: "",
      // 7. Responsáveis
      bombeiro: "",
      comandante: "",
      telefone: "",
      rubrica: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados validados", data);
    Alert.alert(
      "Sucesso",
      "Formulário de Pré-Hospitalar validado e pronto para exportar!"
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
          <Ionicons name="arrow-back" size={24} color="#FE9900" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pré-Hospitalar</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Formulário de Atendimento Pré-Hospitalar
          </Text>

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
              name="viatura"
              placeholder="Viatura"
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
              name="grupo"
              placeholder="Grupo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="subgrupo"
              placeholder="Subgrupo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="tipoEvento"
              placeholder="Tipo de Evento"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 3. Dados da Vítima */}
          <Text style={styles.sectionTitle}>Dados da Vítima</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="nome"
              placeholder="Nome"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="cpf"
              placeholder="RG/CPF"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="idade"
              placeholder="Idade"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="sexo"
              placeholder="Sexo"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="endereco"
            placeholder="Endereço"
            style={styles.input}
          />

          {/* 4. Avaliação Clínica */}
          <Text style={styles.sectionTitle}>Avaliação Clínica</Text>
          <FormTextArea
            control={control}
            name="principaisLesoes"
            placeholder="Principais Lesões"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="pa"
              placeholder="PA"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="pulso"
              placeholder="Pulso"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="resp"
              placeholder="Respiração"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="temp"
              placeholder="Temperatura"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="sat"
              placeholder="Saturação"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 4b. Escala de Glasgow */}
          <Text style={styles.sectionTitle}>Escala de Coma de Glasgow</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="ocular"
              placeholder="Abertura Ocular (1-4)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="verbal"
              placeholder="Resposta Verbal (1-5)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="motora"
              placeholder="Resposta Motora (1-6)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <Text style={styles.helperText}>
            A soma dos três parâmetros define o grau de Glasgow (3 a 15 pontos).
          </Text>

          {/* 4c. Queimaduras */}
          <Text style={styles.sectionTitle}>Queimaduras</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="superficie"
              placeholder="% Superfície Corporal"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="viasAereas"
              placeholder="Vias Aéreas Atingidas?"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <Text style={styles.helperText}>
            Utilize a regra dos 9 ou diagrama de superfície corporal para
            estimar.
          </Text>

          {/* 5. Ações Realizadas */}
          <Text style={styles.sectionTitle}>Ações Realizadas</Text>
          <View style={styles.checkboxGroup}>
            <FormCheckbox
              control={control}
              name="viasAereasCheck"
              label="Vias Aéreas"
            />
            <FormCheckbox control={control} name="rcpCheck" label="RCP" />
            <FormCheckbox
              control={control}
              name="hemorragiaCheck"
              label="Controle de Hemorragia"
            />
          </View>

          {/* 6. Destino da Vítima */}
          <Text style={styles.sectionTitle}>Destino da Vítima</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="condicao"
              placeholder="Condição Final"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="hospital"
              placeholder="Hospital / Destino"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="profissional"
              placeholder="Médico/Enfermeiro que recebeu"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="registro"
              placeholder="CRM / COREN"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 7. Responsáveis */}
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
              name="telefone"
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormInput
            control={control}
            name="rubrica"
            placeholder="Rubrica"
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
