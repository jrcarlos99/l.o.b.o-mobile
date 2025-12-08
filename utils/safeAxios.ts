import { temInternet } from "@/src/database/repositories/syncRepository";
import axios, { AxiosRequestConfig } from "axios";

export async function safeAxios(config: AxiosRequestConfig) {
  console.log("🔍 [safeAxios] Chamado:", config.url);
  // ✅ Verifica internet com timeout (não trava mais)
  const online = await temInternet();
  console.log("🌐 [safeAxios] Online?", online);

  if (!online) {
    console.log("🚫 [safeAxios] Offline → ignorando request");
    console.log("🌐 Offline → axios ignorado:", config.url);

    return {
      ok: false,
      offline: true,
      status: 0,
      data: null,
      error: null,
    };
  }

  try {
    const response = await axios(config);
    console.log("✅ [safeAxios] Sucesso:", config.url);

    return {
      ok: true,
      offline: false,
      status: response.status,
      data: response.data,
      error: null,
    };
  } catch (err: any) {
    console.log("❌ [safeAxios] Erro:", config.url, err.message);
    console.log("❌ Erro no axios:", config.url, err?.message);

    return {
      ok: false,
      offline: false,
      status: err?.response?.status ?? 0,
      data: null,
      error: err,
    };
  }
}
