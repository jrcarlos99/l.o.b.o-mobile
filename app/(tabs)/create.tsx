import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function CreateTabRedirect() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Só navega quando o RootLayout estiver pronto
    if (!rootNavigationState?.key) return;

    if (!hasNavigated.current) {
      hasNavigated.current = true;
      router.replace("/occurrences/create");
    }
  }, [rootNavigationState]);

  return null;
}
