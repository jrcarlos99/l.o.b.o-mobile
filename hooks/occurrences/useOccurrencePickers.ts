import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

interface ViaturaItem {
  id: string;
  nome: string;
}

interface EquipeItem {
  id: string;
  nome: string;
}

export const useOccurrencePickers = () => {
  const [loadingPickers, setLoadingPickers] = useState(true);
  const [viaturaItems, setViaturaItems] = useState<ViaturaItem[]>([]);
  const [equipeItems, setEquipeItems] = useState<EquipeItem[]>([]);

  useEffect(() => {
    const loadPickersData = async () => {
      try {
        setLoadingPickers(true);
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          console.warn("No auth token found");
          setLoadingPickers(false);
          return;
        }

        const [viaturaRes, equipeRes] = await Promise.all([
          fetchViaturas(token),
          fetchEquipes(token),
        ]);

        if (viaturaRes) {
          setViaturaItems(viaturaRes);
        }
        if (equipeRes) {
          setEquipeItems(equipeRes);
        }
      } catch (error) {
        console.error("Error loading pickers data:", error);
      } finally {
        setLoadingPickers(false);
      }
    };

    loadPickersData();
  }, []);

  const fetchViaturas = async (token: string): Promise<ViaturaItem[]> => {
    try {
      const { data, error } = await supabase
        .from("viaturas")
        .select("id, nome");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching viaturas:", error);
      return [];
    }
  };

  const fetchEquipes = async (token: string): Promise<EquipeItem[]> => {
    try {
      const { data, error } = await supabase.from("equipes").select("id, nome");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching equipes:", error);
      return [];
    }
  };

  return { loadingPickers, viaturaItems, equipeItems };
};
