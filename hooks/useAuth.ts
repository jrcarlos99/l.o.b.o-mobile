import { getCurrentUser } from "../api/usuarios/usuariosApi";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { token, setUser } = useAuthStore();

  async function loadUserProfile() {
    if (!token) return;

    try {
      const profile = await getCurrentUser(token);
      setUser(profile);
    } catch (err) {
      console.log("Erro ao carregar perfil:", err);
    }
  }

  return { loadUserProfile };
}
