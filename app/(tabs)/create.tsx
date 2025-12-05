import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function RedirectToCreateOccurrence() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/occurrences/create");
  }, []);

  return null;
}
