// services/occurrences.ts
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import axios from "axios";

const API_BASE_URL = "https://webapp-ocorrencias.onrender.com/api";

export async function fetchOccurrences(
  token: string,
  filters: OccurrenceFilters = {},
  page: number = 0,
  size: number = 20
) {
  const params: Record<string, any> = { page, size };

  if (filters.status) params.status = filters.status;
  if (filters.regiao) params.regiao = filters.regiao as any;
  if (filters.cidade) params.cidade = filters.cidade;
  if (filters.tipo) params.tipo = filters.tipo;

  if (filters.dataInicio) {
    params.dataInicio = filters.dataInicio.toISOString();
  }
  if (filters.dataFim) {
    params.dataFim = filters.dataFim.toISOString();
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/ocorrencias`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    return response.data;
  } catch (error: any) {
    console.error("OCCURRENCES 403 DEBUG:", {
      url: `${API_BASE_URL}/ocorrencias`,
      status: error?.response?.status,
      data: error?.response?.data,
      params: error?.config?.params,
      headers: error?.config?.headers,
    });
    throw error;
  }
}
