import * as yup from "yup";

export const mergulhoSchema = yup.object({
  // 1. Identificação
  pontoBase: yup.string().required("Informe o ponto base."),
  ome: yup.string().required("Informe a OME/Seção."),
  viatura: yup.string().required("Informe a viatura responsável."),
  aviso: yup.string().required("Informe o número do aviso."),
  data: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data."),
  hora: yup.string().required("Informe a hora."),

  // 2. Classificação
  grupo: yup.string().required("Informe o grupo/subgrupo."),
  tipoBusca: yup.string().required("Informe o tipo de busca/salvamento."),

  // 3. Local
  local: yup.string().required("Informe o local da operação."),
  referencia: yup.string().optional(),

  // 4. Vítimas
  qualificacao: yup.string().required("Informe a qualificação da vítima."),
  qtdVitimas: yup
    .string()
    .matches(/^\d+$/, "Quantidade deve ser um número")
    .required("Informe a quantidade de vítimas."),
  vitimaLocalizada: yup
    .string()
    .required("Informe se a vítima foi localizada."),
  cadaverLocalizado: yup
    .string()
    .required("Informe se o cadáver foi localizado."),
  bombeiroServico: yup.string().required("Informe se há bombeiro em serviço."),

  // 5. Operação de Mergulho
  tipoOperacao: yup.string().required("Informe o tipo de operação."),
  numMergulhadores: yup
    .string()
    .matches(/^\d+$/, "Número deve ser um número")
    .required("Informe o número de mergulhadores."),
  profundidade: yup
    .string()
    .matches(/^\d+\.?\d*$/, "Profundidade deve ser um número")
    .required("Informe a profundidade."),
  tempoFundo: yup.string().required("Informe o tempo de fundo."),
  tempoTotal: yup.string().required("Informe o tempo total submerso."),
  correnteza: yup.string().required("Informe se há correnteza."),
  tipoFundo: yup.string().required("Informe o tipo de fundo."),
  ambiente: yup.string().required("Informe o ambiente."),
  coordenadas: yup.string().optional(),

  // 6. Recursos
  cilindroNum: yup.string().required("Informe o número do cilindro."),
  barInicio: yup
    .string()
    .matches(/^\d+\.?\d*$/, "Pressão deve ser um número")
    .required("Informe a pressão inicial."),
  barFim: yup
    .string()
    .matches(/^\d+\.?\d*$/, "Pressão deve ser um número")
    .required("Informe a pressão final."),
  outrosRecursos: yup.string().optional(),

  // 7. Responsáveis
  mergulhadorMatricula: yup
    .string()
    .required("Informe a matrícula do mergulhador."),
  mergulhadorNome: yup
    .string()
    .required("Informe o nome de guerra do mergulhador."),
  bombeiro: yup.string().required("Informe o bombeiro responsável."),
  comandante: yup.string().required("Informe o comandante da operação."),
  telefone: yup.string().required("Informe o telefone."),
  rubrica: yup.string().required("Informe a rubrica."),
});
