import axios from "axios";

const API_BASE_URL = "https://usuarios-service-2e2t.onrender.com";

export async function login(email: string, senha: string): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      senha,
    });

    return response.data.token;
  } catch (error: any) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw new Error("Credenciais inválidas");
  }
}

/**
 * Busca o usuário logado usando o token JWT
 */
export async function getCurrentUser(token: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao buscar usuário:",
      error.response?.data || error.message
    );
    throw new Error("Não foi possível carregar os dados do usuário");
  }
}
