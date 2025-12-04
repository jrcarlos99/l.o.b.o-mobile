import * as yup from "yup";

export const produtosPerigososSchema = yup.object({
  // 1. Identificação
  data: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data."),
  hora: yup.string().required("Informe a hora."),
  municipio: yup.string().required("Informe o município."),
  bairro: yup.string().required("Informe o bairro."),
  rua: yup.string().required("Informe a rua."),
  numero: yup.string().required("Informe o número."),
  referencia: yup.string().optional(),

  // 2. Classificação
  tipoDesastre: yup.string().required("Informe o tipo de desastre."),
  grupo: yup.string().required("Informe o grupo/subgrupo."),

  // 3. Produto Envolvido
  produto: yup.string().required("Informe o nome do produto."),
  onu: yup.string().required("Informe o número ONU."),
  classe: yup.string().required("Informe a classe de risco."),
  estado: yup.string().required("Informe o estado físico."),
  recipiente: yup.string().required("Informe o tipo de recipiente."),
  volume: yup.string().required("Informe o volume/massa estimada."),
  responsavel: yup.string().required("Informe o responsável pelo produto."),
  cpfcnpj: yup.string().required("Informe o CPF/CNPJ."),

  // 4. Impactos
  contaminados: yup.string().required("Informe a quantidade de contaminados."),
  irradiados: yup.string().required("Informe a quantidade de irradiados."),
  evacuados: yup.string().required("Informe a quantidade de evacuados."),
  obitos: yup.string().required("Informe a quantidade de óbitos."),
  feridos: yup.string().required("Informe a quantidade de feridos."),
  areaIsolada: yup.string().required("Informe a área isolada."),
  areaContaminada: yup.string().required("Informe a área contaminada."),
  areaEvacuada: yup.string().required("Informe a área evacuada."),
  solo: yup.boolean(),
  manancial: yup.boolean(),
  atmosfera: yup.boolean(),
  edificacoes: yup.boolean(),

  // 5. Ações Realizadas
  isolamento: yup.boolean(),
  contencao: yup.boolean(),
  neutralizacao: yup.boolean(),
  transbordo: yup.boolean(),
  interdicao: yup.boolean(),

  // 6. Resultado
  situacaoFinal: yup.string().required("Informe a situação final."),
  orgaos: yup.string().required("Informe os órgãos acionados."),

  // 7. Responsáveis
  bombeiro: yup.string().required("Informe o bombeiro responsável."),
  comandante: yup.string().required("Informe o comandante da operação."),
  matricula: yup.string().required("Informe a matrícula."),
  telefone: yup.string().required("Informe o telefone."),
  rubrica: yup.string().required("Informe a rubrica."),
});
