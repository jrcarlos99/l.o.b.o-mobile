import {
  listarPendentes,
  marcarComoSincronizada,
} from "./ocorrenciasRepository";
import { listarPendencias, removerPendencia } from "./pendingQueueRepository";

// URL do seu backend
const API_URL = "https://webapp-ocorrencias.onrender.com/api/ocorrencias";

// Função principal de sincronização
export const sincronizarPendencias = async () => {
  try {
    // 1. Buscar pendências da fila
    const pendencias = await listarPendencias();

    if (pendencias.length === 0) {
      return { sucesso: true, mensagem: "Nenhuma pendência para sincronizar" };
    }

    for (const pendencia of pendencias) {
      const { id, tipo, payload } = pendencia;

      // 2. Enviar para o backend dependendo do tipo
      let resposta;

      if (tipo === "CRIAR_OCORRENCIA") {
        resposta = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (tipo === "ATUALIZAR_OCORRENCIA") {
        resposta = await fetch(`${API_URL}/${payload.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (tipo === "DELETAR_OCORRENCIA") {
        resposta = await fetch(`${API_URL}/${payload.id}`, {
          method: "DELETE",
        });
      }

      // 3. Se o backend aceitou, remover da fila
      if (resposta && resposta.ok) {
        await removerPendencia(id);
      }
    }

    // 4. Sincronizar ocorrências criadas offline
    const ocorrenciasPendentes = await listarPendentes();

    for (const ocorrencia of ocorrenciasPendentes) {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ocorrencia),
      });

      if (resposta.ok) {
        await marcarComoSincronizada(ocorrencia.id!);
      }
    }

    return { sucesso: true, mensagem: "Sincronização concluída" };
  } catch (erro) {
    console.log("Erro ao sincronizar:", erro);
    return { sucesso: false, mensagem: "Erro ao sincronizar" };
  }
};

// Função para verificar conexão com a internet
export const temInternet = async () => {
  try {
    const online = await fetch("https://www.google.com", { method: "HEAD" });
    return online.ok;
  } catch {
    return false;
  }
};

// Função que tenta sincronizar automaticamente
export const tentarSincronizar = async () => {
  const online = await temInternet();

  if (!online) return;

  await sincronizarPendencias();
};
