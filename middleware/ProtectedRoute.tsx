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
    //  Espera o RootLayout montar
    if (!rootNavigationState?.key) return;

    // Espera Zustand hidratar
    if (!hydrated) return;

    //  Evita navegação duplicada
    if (hasNavigated.current) return;

    //  Sem usuário → login
    if (!user) {
      hasNavigated.current = true;
      router.replace("/login");
      return;
    }

    //  Sem permissão → erro-permissao
    if (allowedRoles && !allowedRoles.includes(user.perfil)) {
      hasNavigated.current = true;
      router.replace("/erro-permissao");
      return;
    }
  }, [user, allowedRoles, hydrated, rootNavigationState]);

  //  Enquanto não estiver tudo pronto, não renderiza nada
  if (!rootNavigationState?.key || !hydrated) return null;

  //  Sem usuário → não renderiza
  if (!user) return null;

  //  Sem permissão → não renderiza
  if (allowedRoles && !allowedRoles.includes(user.perfil)) return null;

  return children;
}
