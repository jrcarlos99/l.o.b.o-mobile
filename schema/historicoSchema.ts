import * as yup from "yup";

export const historicoSchema = yup.object({
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
  tipo: yup.string().required("Informe o tipo de ocorrência."),
  codigo: yup.string().required("Informe o código."),
  sigilo: yup.string().optional(),
  // 2. Histórico
  historico: yup.string().required("Informe o histórico detalhado."),
  // 3. Guarnição Empenhada
  posto: yup.string().required("Informe o posto/graduação."),
  nomeGuerra: yup.string().required("Informe o nome de guerra."),
  matricula: yup.string().required("Informe a matrícula."),
  demaisGuarnicao: yup.string().optional(),
  // 4. Visto da Divisão de Operações
  dataVisto: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data do visto."),
  assinatura: yup.string().required("Informe a assinatura/rubrica."),
});
