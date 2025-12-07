// services/dashboard.ts
import { OccurrenceFilters } from "@/types/OccurrenceFilters";
import axios from "axios";

const API_BASE_URL = "https://webapp-ocorrencias.onrender.com/api/ocorrencias";

export async function fetchDashboardStats(
  token: string,
  filters: OccurrenceFilters,
  role: string
) {
  if (role === "OPERADOR") {
    return null;
  }

  const params: Record<string, any> = {};

  if (filters.dataInicio) {
    params.dataInicio = filters.dataInicio.toISOString().split("T")[0];
  }
  if (filters.dataFim) {
    params.dataFim = filters.dataFim.toISOString().split("T")[0];
  }

  if (filters.regiao) {
    params.regiao = filters.regiao as any;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    return response.data;
  } catch (error: any) {
    console.error("DASHBOARD 403 DEBUG:", {
      url: `${API_BASE_URL}/dashboard`,
      status: error?.response?.status,
      data: error?.response?.data,
      params: error?.config?.params,
      headers: error?.config?.headers,
    });
    throw error;
  }
}
