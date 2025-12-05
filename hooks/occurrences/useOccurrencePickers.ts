import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useOccurrencePickers = () => {
  const [loadingPickers, setLoadingPickers] = useState(true);
  const [viaturaItems, setViaturaItems] = useState<
    { id: string; nome: string }[]
  >([]);
  const [equipeItems, setEquipeItems] = useState<
    { id: string; nome: string }[]
  >([]);

  useEffect(() => {
    const loadPickersData = async () => {
      try {
        setLoadingPickers(true);
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.warn("Não foi possível obter o token de autenticação.");
          setLoadingPickers(false);
          return;
        }

        const [viaturaRes, equipeRes] = await Promise.all([
          fetchViaturas(token),
          fetchEquipes(token),
        ]);

        if (viaturaRes) setViaturaItems(viaturaRes);
        if (equipeRes) setEquipeItems(equipeRes);
      } catch (error) {
        console.error("Erro ao carregar dados dos pickers:", error);
      } finally {
        setLoadingPickers(false);
      }
    };

    loadPickersData();
  }, []);

  const fetchViaturas = async (
    token: string
  ): Promise<{ id: string; nome: string }[]> => {
    try {
      const { data, error } = await supabase
        .from("viatura")
        .select("id, tipo, descricao");

      if (error) throw error;

      return (
        data?.map((v) => ({
          id: String(v.id),
          nome: `${v.tipo} - ${v.descricao}`,
        })) || []
      );
    } catch (error) {
      console.error("Erro ao buscar viaturas:", error);
      return [];
    }
  };

  const fetchEquipes = async (
    token: string
  ): Promise<{ id: string; nome: string }[]> => {
    try {
      const { data, error } = await supabase.from("equipe").select("id, nome");

      if (error) throw error;

      return (
        data?.map((e) => ({
          id: String(e.id),
          nome: e.nome,
        })) || []
      );
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
      return [];
    }
  };

  return { loadingPickers, viaturaItems, equipeItems };
};
