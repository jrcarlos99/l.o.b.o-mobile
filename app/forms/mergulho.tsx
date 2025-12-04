import FormInput from "@/components/Forms/FormInput";
import FormRow from "@/components/Forms/FormRow";
import FormTextArea from "@/components/Forms/FormTextArea";
import { mergulhoSchema } from "@/schema/mergulhoSchema";
import { mergulhoStyles as styles } from "@/styles/mergulhoStyles";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MergulhoScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(mergulhoSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados validados", data);
    Alert.alert(
      "Sucesso",
      "Formulário de Mergulho validado e pronto para exportar!"
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
        <Text style={styles.headerTitle}>Mergulho</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Formulário de Operações de Mergulho</Text>

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

          {/* 2. Classificação */}
          <Text style={styles.sectionTitle}>Classificação</Text>
          <FormInput
            control={control}
            name="grupo"
            placeholder="Grupo/Subgrupo"
            style={styles.input}
          />
          <FormInput
            control={control}
            name="tipoBusca"
            placeholder="Tipo de Busca/Salvamento"
            style={styles.input}
          />

          {/* 3. Local */}
          <Text style={styles.sectionTitle}>Local da Operação</Text>
          <FormInput
            control={control}
            name="local"
            placeholder="Ex: Mar, Rio, Represa, Açude"
            style={styles.input}
          />
          <FormInput
            control={control}
            name="referencia"
            placeholder="Referência/Especificação"
            style={styles.input}
          />

          {/* 4. Vítimas */}
          <Text style={styles.sectionTitle}>Vítimas</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="qualificacao"
              placeholder="Qualificação da Vítima"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="qtdVitimas"
              placeholder="Quantidade"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="vitimaLocalizada"
              placeholder="Vítima Localizada?"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="cadaverLocalizado"
              placeholder="Cadáver Localizado?"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="bombeiroServico"
              placeholder="Bombeiro em Serviço?"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 5. Operação de Mergulho */}
          <Text style={styles.sectionTitle}>Operação de Mergulho</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="tipoOperacao"
              placeholder="Tipo de Operação"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="numMergulhadores"
              placeholder="Nº de Mergulhadores"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="profundidade"
              placeholder="Profundidade (m)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="tempoFundo"
              placeholder="Tempo de Fundo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="tempoTotal"
              placeholder="Tempo Total Submerso"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="correnteza"
              placeholder="Correnteza?"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="tipoFundo"
              placeholder="Tipo de Fundo"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="ambiente"
              placeholder="Ambiente"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="coordenadas"
              placeholder="Coordenadas (Lat/Long)"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>

          {/* 6. Recursos */}
          <Text style={styles.sectionTitle}>Recursos Utilizados</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="cilindroNum"
              placeholder="Cilindro Nº"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="barInicio"
              placeholder="Pressão Inicial (bar)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="barFim"
              placeholder="Pressão Final (bar)"
              keyboardType="numeric"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
          <FormTextArea
            control={control}
            name="outrosRecursos"
            placeholder="Outros Recursos (máscara, computador de mergulho, etc.)"
            style={styles.input}
            height={90}
            numberOfLines={3}
          />

          {/* 7. Responsáveis */}
          <Text style={styles.sectionTitle}>Responsáveis</Text>
          <FormRow style={styles.row}>
            <FormInput
              control={control}
              name="mergulhadorMatricula"
              placeholder="Matrícula do Mergulhador"
              style={[styles.input, styles.flex1]}
            />
            <FormInput
              control={control}
              name="mergulhadorNome"
              placeholder="Nome de Guerra do Mergulhador"
              style={[styles.input, styles.flex1]}
            />
          </FormRow>
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
