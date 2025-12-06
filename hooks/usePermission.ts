import { useAuthStore } from "@/store/authStore";
import { useCallback, useMemo } from "react";

export function usePermission() {
  const user = useAuthStore((s) => s.user);

  const hasRole = useCallback(
    (...roles: string[]) => {
      return roles.includes(user?.perfil ?? "");
    },
    [user?.perfil]
  );

  const isAdmin = useCallback(() => {
    return user?.perfil === "ADMIN";
  }, [user?.perfil]);

  const isChefe = useCallback(() => {
    return user?.perfil === "CHEFE";
  }, [user?.perfil]);

  const isAnalista = useCallback(() => {
    return user?.perfil === "ANALISTA";
  }, [user?.perfil]);

  const canAccessRegion = useCallback(
    (regiao: string) => {
      if (!user) return false;

      const userRegion = user.regiaoAutorizada?.trim().toUpperCase();
      const targetRegion = regiao?.trim().toUpperCase();

      return user.perfil === "ADMIN" || userRegion === targetRegion;
    },
    [user?.perfil, user?.regiaoAutorizada]
  );

  return useMemo(
    () => ({
      user,
      hasRole,
      isAdmin,
      isChefe,
      isAnalista,
      canAccessRegion,
    }),
    [user, hasRole, isAdmin, isChefe, isAnalista, canAccessRegion]
  );
}
