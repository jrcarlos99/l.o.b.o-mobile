import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import axios from "axios";

const API_BASE_URL = "https://webapp-ocorrencias.onrender.com/api/ocorrencias";

export async function fetchDashboardStats(
  token: string,
  filters: OccurrenceFilters
) {
  try {
    const now = new Date();
    const start =
      filters.dataInicio ?? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const end = filters.dataFim ?? now;

    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        dataInicio: start.toISOString().split("T")[0],
        dataFim: end.toISOString().split("T")[0],
        regiao: filters.regiao || undefined, // envia região apenas se existir
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estatísticas do dashboard:", error);
    throw error;
  }
}
