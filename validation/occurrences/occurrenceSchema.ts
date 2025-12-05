import * as yup from "yup";

export const occurrenceSchema = yup.object({
  type: yup.string().required("Tipo de ocorrência é obrigatório"),
  region: yup.string().required("Região é obrigatória"),
  date: yup.string().required("Data é obrigatória"),
  vehicle: yup.string().required("Viatura é obrigatória"),
  team: yup.string().required("Equipe é obrigatória"),
  description: yup.string().required("Descrição é obrigatória"),
  address: yup.string().optional(),
});

export type OccurrenceFormValues = yup.InferType<typeof occurrenceSchema>;
