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
