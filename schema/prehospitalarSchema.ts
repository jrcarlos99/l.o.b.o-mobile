import * as yup from "yup";

export const prehospitalarSchema = yup.object({
  // 1. Identificação
  pontoBase: yup.string().required("Informe o ponto base."),
  viatura: yup.string().required("Informe a viatura."),
  data: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data."),

  // 2. Classificação
  grupo: yup.string().required("Informe o grupo."),
  subgrupo: yup.string().required("Informe o subgrupo."),
  tipoEvento: yup.string().required("Informe o tipo de evento."),

  // 3. Dados da Vítima
  nome: yup.string().required("Informe o nome da vítima."),
  cpf: yup.string().optional(),
  idade: yup.string().matches(/^\d+$/, "Idade deve ser um número").optional(),
  sexo: yup.string().optional(),
  endereco: yup.string().required("Informe o endereço."),

  // 4. Avaliação Clínica
  principaisLesoes: yup.string().required("Informe as principais lesões."),
  pa: yup.string().optional(),
  pulso: yup.string().optional(),
  resp: yup.string().optional(),
  temp: yup.string().optional(),
  sat: yup.string().optional(),

  // 4b. Glasgow
  ocular: yup
    .string()
    .matches(/^[1-4]$/, "Deve estar entre 1 e 4")
    .optional(),
  verbal: yup
    .string()
    .matches(/^[1-5]$/, "Deve estar entre 1 e 5")
    .optional(),
  motora: yup
    .string()
    .matches(/^[1-6]$/, "Deve estar entre 1 e 6")
    .optional(),

  // 4c. Queimaduras
  superficie: yup
    .string()
    .matches(/^\d+\.?\d*$/, "Percentual deve ser um número")
    .optional(),
  viasAereas: yup.string().optional(),

  // 5. Ações Realizadas
  viasAereasCheck: yup.boolean(),
  rcpCheck: yup.boolean(),
  hemorragiaCheck: yup.boolean(),

  // 6. Destino da Vítima
  condicao: yup.string().required("Informe a condição final."),
  hospital: yup.string().required("Informe o destino/hospital."),
  profissional: yup
    .string()
    .required("Informe o médico/enfermeiro que recebeu."),
  registro: yup.string().optional(),

  // 7. Responsáveis
  bombeiro: yup.string().required("Informe o bombeiro responsável."),
  comandante: yup.string().required("Informe o comandante da operação."),
  telefone: yup.string().required("Informe o telefone."),
  rubrica: yup.string().required("Informe a rubrica."),
});
