import * as yup from "yup";

export const basicoSchema = yup.object({
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
  formaAcionamento: yup.string().required("Informe a forma de acionamento."),
  situacao: yup.string().required("Informe a situação da ocorrência."),
  // 2. Local
  logradouro: yup.string().required("Informe o logradouro."),
  numero: yup.string().required("Informe o número."),
  bairro: yup.string().required("Informe o bairro."),
  referencia: yup.string().optional(),
  coordenadas: yup.string().optional(),
  // 3. Solicitante
  nomeSolicitante: yup.string().required("Informe o nome do solicitante."),
  cpfSolicitante: yup
    .string()
    .matches(/^\d{11}$/, "CPF deve ter 11 dígitos")
    .required("Informe o CPF."),
  telefoneSolicitante: yup.string().required("Informe o telefone."),
  // 4. Natureza
  natureza: yup.string().required("Informe a natureza da ocorrência."),
  // 5. Vítimas
  vitimaIlesa: yup.boolean(),
  vitimaLeve: yup.boolean(),
  vitimaGrave: yup.boolean(),
  vitimaObito: yup.boolean(),
  // 6. Apoio
  viaturasApoio: yup.string().optional(),
  instituicoesApoio: yup.string().optional(),
  // 7. Histórico
  historico: yup.string().required("Informe o histórico resumido."),
  // 8. Guarnição
  posto: yup.string().required("Informe o posto/graduação."),
  nomeGuerra: yup.string().required("Informe o nome de guerra."),
  matricula: yup.string().required("Informe a matrícula."),
  // 9. Visto
  dataVisto: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data do visto."),
  assinatura: yup.string().required("Informe a assinatura."),
});
