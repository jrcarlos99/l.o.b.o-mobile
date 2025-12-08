import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import { safeAxios } from "@/utils/safeAxios";

const API_BASE_URL = "https://webapp-ocorrencias.onrender.com/api";

export async function fetchOccurrences(
  token: string,
  filters: OccurrenceFilters = {},
  page: number = 0,
  size: number = 20
) {
  const params: Record<string, any> = { page, size };

  if (filters.status) params.status = filters.status;
  if (filters.regiao) params.regiao = filters.regiao;
  if (filters.cidade) params.cidade = filters.cidade;
  if (filters.tipo) params.tipo = filters.tipo;

  if (filters.dataInicio) params.dataInicio = filters.dataInicio.toISOString();
  if (filters.dataFim) params.dataFim = filters.dataFim.toISOString();

  const response = await safeAxios({
    url: `${API_BASE_URL}/ocorrencias`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  if (response.offline) {
    console.log("Ocorrências offline → usar SQLite");
    return null; // você trata isso na tela
  }

  if (!response.ok) {
    console.error("OCCURRENCES 403 DEBUG:", response);
    throw response.error;
  }

  return response.data;
}
