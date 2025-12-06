import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface ViaturaItem {
  id: string;
  descricao: string;
}

interface EquipeItem {
  id: string;
  nome: string;
}

export const useOccurrencePickers = () => {
  const [loadingPickers, setLoadingPickers] = useState(true);
  const [viaturaItems, setViaturaItems] = useState<ViaturaItem[]>([]);
  const [equipeItems, setEquipeItems] = useState<EquipeItem[]>([]);

  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hasHydrated);

  useEffect(() => {
    if (!hydrated || !token) return;

    const loadPickersData = async () => {
      try {
        setLoadingPickers(true);

        const [viaturaRes, equipeRes] = await Promise.all([
          fetchViaturas(),
          fetchEquipes(),
        ]);

        setViaturaItems(viaturaRes);
        setEquipeItems(equipeRes);
      } catch (error) {
        console.error("Error loading pickers data:", error);
      } finally {
        setLoadingPickers(false);
      }
    };

    loadPickersData();
  }, [hydrated, token]);

  const fetchViaturas = async (): Promise<ViaturaItem[]> => {
    try {
      const { data, error } = await supabase
        .from("viatura")
        .select("id, descricao");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erro ao buscar viaturas:", error);
      return [];
    }
  };

  const fetchEquipes = async (): Promise<EquipeItem[]> => {
    try {
      const { data, error } = await supabase.from("equipe").select("id, nome");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
      return [];
    }
  };

  return { loadingPickers, viaturaItems, equipeItems };
};
