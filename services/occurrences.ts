import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import axios from "axios";

const API_BASE_URL = "https://webapp-ocorrencias.onrender.com/api";

//  Listar ocorrências com filtros
export async function fetchOccurrences(
  token: string,
  filters?: OccurrenceFilters
) {
  const params: any = {};

  if (filters?.status) params.status = filters.status;
  if (filters?.regiao) params.regiao = filters.regiao;
  if (filters?.cidade) params.cidade = filters.cidade;
  if (filters?.tipo) params.tipo = filters.tipo;

  if (filters?.dataInicio) {
    params.dataInicio =
      filters.dataInicio instanceof Date
        ? filters.dataInicio.toISOString().split("T")[0]
        : filters.dataInicio;
  }

  if (filters?.dataFim) {
    params.dataFim =
      filters.dataFim instanceof Date
        ? filters.dataFim.toISOString().split("T")[0]
        : filters.dataFim;
  }

  const response = await axios.get(`${API_BASE_URL}/ocorrencias`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data.content;
}

//  Criar ocorrência
export async function createOccurrence(token: string, occurrenceData: any) {
  const response = await axios.post(
    `${API_BASE_URL}/ocorrencias`,
    occurrenceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

//  Buscar viaturas
export async function fetchViaturas(token: string) {
  const response = await axios.get(`${API_BASE_URL}/viaturas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

//  Buscar equipes
export async function fetchEquipes(token: string) {
  const response = await axios.get(`${API_BASE_URL}/equipes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
