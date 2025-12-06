export interface OccurrenceFilters {
  status?: string;
  regiao?: "RMR" | "AGRE" | "ZDMT" | "SERT" | "todos" | undefined;
  cidade?: string;
  tipo?:
    | "INCENDIO"
    | "ACIDENTE_DE_TRANSITO"
    | "SALVAMENTO"
    | "RESGATE"
    | "PRE_HOSPITALAR"
    | "EPI"
    | "COMUNICACAO"
    | "VAZAMENTO";
  dataInicio?: Date;
  dataFim?: Date;
}
