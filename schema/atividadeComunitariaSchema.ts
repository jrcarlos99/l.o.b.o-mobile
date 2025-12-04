import * as yup from "yup";

export const atividadeComunitariaSchema = yup.object({
  // 1. Identificação
  pontoBase: yup.string().required("Informe o ponto base."),
  ciops: yup.string().required("Informe o CIOPS/Seção."),
  viatura: yup.string().required("Informe a viatura responsável."),
  aviso: yup.string().required("Informe o número do aviso."),
  data: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data deve estar no formato DD/MM/AAAA")
    .required("Informe a data."),

  // 2. Evento
  nomeEvento: yup.string().required("Informe o nome do evento."),
  horaInicio: yup.string().required("Informe a hora de início."),
  horaFim: yup.string().required("Informe a hora de fim."),
  endereco: yup.string().required("Informe o endereço completo."),

  // 3. Responsável
  responsavel: yup.string().required("Informe o nome do responsável."),
  cpf: yup.string().required("Informe o CPF."),
  instituicao: yup.string().required("Informe a instituição."),

  // 4. Classificação
  grupo: yup.string().required("Informe o grupo/subgrupo."),
  missao: yup.string().required("Informe o tipo de missão."),
  publico: yup.string().required("Informe o público atendido."),
  participantes: yup.string().required("Informe o número de pessoas."),

  // 5. Atividades Executadas
  apoio: yup.boolean(),
  educativa: yup.boolean(),
  social: yup.boolean(),
  religiosa: yup.boolean(),
  acoesSociais: yup.boolean(),

  // 6. Recursos
  efetivo: yup.string().required("Informe o efetivo."),
  viaturas: yup.string().required("Informe o número de viaturas."),
  embarcacoes: yup.string().required("Informe o número de embarcações."),
  equipamentos: yup.string().required("Informe os equipamentos."),
  estruturas: yup.string().required("Informe as estruturas de apoio."),

  // 7. Informações Adicionais
  adicionais: yup.string().required("Informe informações adicionais."),

  // 8. Responsáveis
  bombeiro: yup.string().required("Informe o bombeiro responsável."),
  comandante: yup.string().required("Informe o comandante da operação."),
  matricula: yup.string().required("Informe a matrícula."),
  telefone: yup.string().required("Informe o telefone."),
  rubrica: yup.string().required("Informe a rubrica."),
});
