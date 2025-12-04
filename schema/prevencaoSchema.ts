import * as yup from "yup";

export const prevencaoSchema = yup.object({
  // 1. Identificação
  pontoBase: yup.string().required("Informe o ponto base."),
  ome: yup.string().required("Informe a OME/Seção."),
  viatura: yup.string().required("Informe a viatura responsável."),
  aviso: yup.string().required("Informe o número do aviso."),
  data: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data."),

  // 2. Evento
  nomeEvento: yup.string().required("Informe o nome do evento."),
  horaChegada: yup.string().required("Informe a hora de chegada."),
  horaSaida: yup.string().required("Informe a hora de saída."),
  documento: yup.string().required("Informe o documento de referência."),

  // 3. Classificação
  regularizadoSim: yup.boolean(),
  regularizadoNao: yup.boolean(),
  cgo: yup.string().required("Informe o código CGO."),
  grupo: yup.string().required("Informe o grupo/subgrupo."),

  // 4. Responsável pelo Evento
  responsavel: yup.string().required("Informe o nome do responsável."),
  cpfcnpj: yup.string().required("Informe o CPF/CNPJ."),
  publicoEstimado: yup.string().required("Informe o público estimado."),
  publicoPresente: yup.string().required("Informe o público presente."),

  // 5. Prevenção Executada
  apoio: yup.boolean(),
  aquatica: yup.boolean(),
  festivo: yup.boolean(),
  esportivo: yup.boolean(),

  // 6. Condições e Estruturas
  condicaoSistema: yup
    .string()
    .required("Informe a condição do sistema preventivo."),
  responsaveis: yup
    .string()
    .required("Informe a quantidade/nomes dos responsáveis."),
  estruturas: yup
    .string()
    .required("Informe as estruturas de apoio disponíveis."),
  regularidade: yup
    .string()
    .required("Informe a regularidade da documentação."),

  // 7. Informações Adicionais
  adicionais: yup.string().required("Informe informações adicionais."),

  // 8. Responsáveis
  bombeiro: yup.string().required("Informe o bombeiro responsável."),
  comandante: yup.string().required("Informe o comandante da operação."),
  matricula: yup.string().required("Informe a matrícula."),
  telefone: yup.string().required("Informe o telefone."),
  rubrica: yup.string().required("Informe a rubrica."),
});
