import * as yup from "yup";

export const occurrenceSchema = yup.object({
  type: yup.string().required("Tipo de ocorrência é obrigatório"),
  region: yup.string().required("Região é obrigatória"),
  date: yup.string().required("Data é obrigatória"),

  //  Obrigatório somente ONLINE
  vehicle: yup.string().when("$online", {
    is: true,
    then: (schema) => schema.required("Viatura é obrigatória"),
    otherwise: (schema) => schema.nullable(),
  }),

  //  Obrigatório somente ONLINE
  team: yup.string().when("$online", {
    is: true,
    then: (schema) => schema.required("Equipe é obrigatória"),
    otherwise: (schema) => schema.nullable(),
  }),

  description: yup.string().required("Descrição é obrigatória"),
  address: yup.string().optional(),
});

export type OccurrenceFormValues = yup.InferType<typeof occurrenceSchema>;
