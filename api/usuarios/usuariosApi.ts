import { api } from "../http";

export async function getCurrentUser(token: string) {
  const response = await api.get("/usuarios/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
