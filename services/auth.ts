import { safeAxios } from "@/utils/safeAxios";

const API_BASE_URL = "https://usuarios-service-2e2t.onrender.com";

export async function login(email: string, senha: string): Promise<string> {
  const response = await safeAxios({
    url: `${API_BASE_URL}/auth/login`,
    method: "POST",
    data: { email, senha },
  });

  if (response.offline) {
    throw new Error("Sem internet para fazer login");
  }

  if (!response.ok) {
    console.error("Erro no login:", response);
    throw new Error("Credenciais inválidas");
  }

  return response.data.token;
}

export async function getCurrentUser(token: string) {
  const response = await safeAxios({
    url: `${API_BASE_URL}/usuarios/me`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.offline) {
    throw new Error("Sem internet para carregar usuário");
  }

  if (!response.ok) {
    console.error("Erro ao buscar usuário:", response);
    throw new Error("Não foi possível carregar os dados do usuário");
  }

  return response.data;
}
