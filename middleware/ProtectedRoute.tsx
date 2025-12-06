import { useAuthStore } from "@/store/authStore";
import { useRootNavigationState, useRouter } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s._hasHydrated);

  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (!hydrated) return;
    if (hasNavigated.current) return;

    // Sem usuário → login
    if (!user) {
      hasNavigated.current = true;
      router.replace("/login");
      return;
    }

    // Sem permissão → erro-permissao
    if (allowedRoles && !allowedRoles.includes(user.perfil)) {
      hasNavigated.current = true;
      router.replace("/erro-permissao");
      return;
    }
  }, [user, allowedRoles, hydrated, rootNavigationState]);

  //  Enquanto não estiver pronto, não renderiza
  if (!rootNavigationState?.key || !hydrated) return null;

  // Sem usuário → não renderiza
  if (!user) return null;

  //  Sem permissão → não renderiza
  if (allowedRoles && !allowedRoles.includes(user.perfil)) return null;

  return children;
}
