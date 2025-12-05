import * as yup from "yup";

export const incendioSchema = yup.object({
  pontoBase: yup.string().required("Informe o ponto base."),
  viatura: yup.string().required("Informe a viatura responsável."),
  data: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data."),

  desastre: yup.string().required("Informe se está associado a desastre."),
  codigoDesastre: yup.string().optional(),
  grupo: yup.string().required("Informe o grupo/subgrupo."),

  endereco: yup.string().required("Informe o endereço."),
  tipoEdificacao: yup.string().required("Informe o tipo de edificação."),
  agente: yup.string().required("Informe o agente causador."),

  agua: yup
    .string()
    .matches(/^\d+$/, "Consumo de água deve ser um número")
    .optional(),
  espuma: yup
    .string()
    .matches(/^\d+$/, "Consumo de espuma deve ser um número")
    .optional(),

  bens: yup.string().required("Informe os bens atingidos."),

  proprietario: yup.string().required("Informe o proprietário."),
  telefone: yup.string().required("Informe o telefone."),
  comandante: yup.string().required("Informe o comandante da operação."),
});
