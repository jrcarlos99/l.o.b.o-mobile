import { temInternet } from "@/src/database/repositories/syncRepository";

export async function safeFetch(url: string, options: RequestInit = {}) {
  const online = await temInternet();

  if (!online) {
    console.log("🌐 Offline → fetch ignorado:", url);
    return {
      ok: false,
      offline: true,
      status: 0,
      json: async () => null,
    };
  }

  try {
    return await fetch(url, options);
  } catch (err) {
    console.log("❌ Erro no fetch:", url, err);
    return {
      ok: false,
      error: err,
      status: 0,
      json: async () => null,
    };
  }
}
