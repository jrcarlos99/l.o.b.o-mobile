import { useAuthStore } from "@/store/authStore";
import { useCallback } from "react";

export function usePermission() {
  const user = useAuthStore((s) => s.user);

  const hasRole = useCallback(
    (...roles: string[]) => {
      if (!user) return false;
      return roles.includes(user.perfil);
    },
    [user]
  );

  const isAdmin = useCallback(() => user?.perfil === "ADMIN", [user]);
  const isChefe = useCallback(() => user?.perfil === "CHEFE", [user]);
  const isOperador = () =>
    user?.perfil === "OPERADOR" || user?.perfil === "ANALISTA";
  const canAccessRegion = useCallback(
    (regiao: string) => {
      if (!user) return false;

      const userRegion = user.regiaoAutorizada?.trim().toUpperCase();
      const targetRegion = regiao?.trim().toUpperCase();

      return user.perfil === "ADMIN" || userRegion === targetRegion;
    },
    [user]
  );

  return {
    user,
    hasRole,
    isAdmin,
    isChefe,
    isOperador,
    canAccessRegion,
  };
}
