import { getCurrentUser } from "@/api/usuarios/usuariosApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface User {
  id: number;
  nomeCompleto: string;
  email: string;
  perfil: "ADMIN" | "CHEFE" | "ANALISTA" | "USUARIO";
  regiao: string;
  regiaoAutorizada: string;
  avatar_url?: string;
}

interface AuthState {
  _hasHydrated: boolean;
  token: string | null;
  user: User | null;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;

  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  _hasHydrated: false,
  token: null,
  user: null,

  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),

  initializeAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        set({ _hasHydrated: true });
        return;
      }

      const profile = await getCurrentUser(token);

      set({
        token,
        user: {
          id: profile.id,
          nomeCompleto: profile.nomeCompleto,
          email: profile.email,
          perfil: profile.perfil,
          regiao: profile.regiao,
          regiaoAutorizada: profile.regiaoAutorizada,
          avatar_url: profile.avatar_url,
        },
        _hasHydrated: true,
      });
    } catch (err) {
      console.log("Sessão expirada:", err);
      await AsyncStorage.removeItem("token");
      set({ token: null, user: null, _hasHydrated: true });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ token: null, user: null, _hasHydrated: true });
  },
}));
