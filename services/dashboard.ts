import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import { safeAxios } from "@/utils/safeAxios";

const API_BASE_URL = "https://webapp-ocorrencias.onrender.com/api/ocorrencias";

export async function fetchDashboardStats(
  token: string,
  filters: OccurrenceFilters,
  role: string
) {
  if (role === "OPERADOR") return null;

  const params: Record<string, any> = {};

  if (filters.dataInicio) {
    params.dataInicio = filters.dataInicio.toISOString().split("T")[0];
  }
  if (filters.dataFim) {
    params.dataFim = filters.dataFim.toISOString().split("T")[0];
  }
  if (filters.regiao) {
    params.regiao = filters.regiao;
  }

  const response = await safeAxios({
    url: `${API_BASE_URL}/dashboard`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  if (response.offline) {
    console.log("Dashboard offline → retornando null");
    return null;
  }

  if (!response.ok) {
    console.error("DASHBOARD 403 DEBUG:", response);
    throw response.error;
  }

  return response.data;
}
