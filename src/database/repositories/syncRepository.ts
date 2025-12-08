import {
  listarPendentes,
  marcarComoSincronizada,
} from "./ocorrenciasRepository";

import { listarPendencias, removerPendencia } from "./pendingQueueRepository";

const API_URL = "https://webapp-ocorrencias.onrender.com/api/ocorrencias";

export const sincronizarPendencias = async () => {
  try {
    const pendencias = await listarPendencias();

    for (const pendencia of pendencias) {
      const { id, tipo, payload } = pendencia;

      const dados = JSON.parse(payload);

      let resposta;

      if (tipo === "CRIAR_OCORRENCIA") {
        resposta = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
      }

      if (tipo === "ATUALIZAR_OCORRENCIA") {
        resposta = await fetch(`${API_URL}/${dados.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
      }

      if (tipo === "DELETAR_OCORRENCIA") {
        resposta = await fetch(`${API_URL}/${dados.id}`, {
          method: "DELETE",
        });
      }

      if (resposta && resposta.ok) {
        await removerPendencia(id);
      }
    }

    // ✅ 2. Sincronizar ocorrências salvas offline
    const ocorrenciasPendentes = await listarPendentes();

    for (const ocorrencia of ocorrenciasPendentes) {
      const payload = {
        id: ocorrencia.id,
        titulo: ocorrencia.titulo,
        descricao: ocorrencia.descricao,
        tipo: ocorrencia.tipo,
        regiao: ocorrencia.regiao,
        status: ocorrencia.status,
        latitude: ocorrencia.latitude,
        longitude: ocorrencia.longitude,
        viatura_id: ocorrencia.viatura_id,
        equipe_id: ocorrencia.equipe_id,
        data_hora_abertura: ocorrencia.dataCriacao,
      };

      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (resposta.ok) {
        await marcarComoSincronizada(ocorrencia.id!);
      }
    }

    return { sucesso: true };
  } catch (erro) {
    console.log("Erro ao sincronizar:", erro);
    return { sucesso: false };
  }
};

export const temInternet = async (): Promise<boolean> => {
  console.log("🔍 [temInternet] Iniciando verificação...");
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.log("⏳ [temInternet] Timeout disparado");
      controller.abort();
    }, 3000); // 3s timeout

    const response = await fetch("https://www.google.com", {
      method: "HEAD",
      signal: controller.signal,
    });

    clearTimeout(timeout);
    console.log("✅ [temInternet] Resultado:", response.ok);
    return response.ok;
  } catch (err) {
    console.log("❌ [temInternet] Erro:", err);
    return false;
  }
};

export const tentarSincronizar = async () => {
  const online = await temInternet();
  if (!online) return;
  await sincronizarPendencias();
};
