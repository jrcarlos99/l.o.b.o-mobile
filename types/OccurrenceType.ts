export type OccurrenceStatus =
  | "EM_ANDAMENTO"
  | "ABERTA"
  | "CANCELADO"
  | "PENDENTE"
  | "CONCLUIDO";

export type OccurrenceType =
  | "INCENDIO"
  | "ACIDENTE_DE_TRANSITO"
  | "SALVAMENTO"
  | "RESGATE"
  | "PRE_HOSPITALAR"
  | "EPI"
  | "COMUNICACAO"
  | "VAZAMENTO";

export interface Occurrence {
  id: number;
  titulo: string;
  descricao: string;
  solicitante?: string;
  regiao: string;
  cidade: string;
  status: OccurrenceStatus;
  tipo: OccurrenceType;
  dataHoraAbertura: string;
  dataHoraAtualizacao: string;
  latitude: number;
  longitude: number;
  historico?: unknown[];
  criadoPor?: string;
  atualizadoPor?: string;
  anexos?: {
    id: number;
    url_anexo: string;
    tipo: "IMAGEM" | "ASSINATURA";
  };
}
