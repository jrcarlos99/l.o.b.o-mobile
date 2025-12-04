import * as yup from "yup";

export const salvamentoSchema = yup.object({
  // 1. Identificação
  pontoBase: yup.string().required("Informe o ponto base."),
  viatura: yup.string().required("Informe a viatura."),
  data: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data."),

  // 2. Classificação
  tipo: yup.string().required("Informe o tipo de salvamento."),
  grupo: yup.string().required("Informe o grupo/subgrupo."),

  // 3. Local
  endereco: yup.string().required("Informe o endereço."),
  ambiente: yup.string().required("Informe o tipo de ambiente."),
  condicoes: yup.string().required("Informe as condições do local."),

  // 4. Vítima(s)
  nome: yup.string().required("Informe o nome da vítima."),
  idade: yup.string().required("Informe a idade."),
  sexo: yup.string().required("Informe o sexo."),
  situacao: yup.string().required("Informe a situação encontrada."),

  // 5. Ações Realizadas
  desencarceramento: yup.boolean(),
  resgateAltura: yup.boolean(),
  mergulho: yup.boolean(),

  // 6. Resultado
  condicaoFinal: yup.string().required("Informe a condição final."),
  destino: yup.string().required("Informe o destino."),

  // 7. Responsáveis
  bombeiro: yup.string().required("Informe o bombeiro responsável."),
  comandante: yup.string().required("Informe o comandante da operação."),
  telefone: yup.string().required("Informe o telefone."),
});
