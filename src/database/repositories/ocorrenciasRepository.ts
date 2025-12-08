import { executeSqlAsync } from "../database";

export interface OcorrenciaOffline {
  id?: number;
  titulo: string;
  descricao?: string;
  status: string;
  regiao: string | null;
  dataCriacao: string;
  tipo: string;
  latitude?: number;
  longitude?: number;
  sincronizado?: number;
  viatura_id?: number | null;
  equipe_id?: number | null;
}

// ✅ Salvar ocorrência offline
export const salvarOcorrenciaOffline = async (
  ocorrencia: OcorrenciaOffline
) => {
  const sql = `
    INSERT INTO ocorrencias_offline 
    (id, titulo, descricao, tipo, regiao, status, latitude, longitude, dataCriacao, viatura_id, equipe_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    ocorrencia.id,
    ocorrencia.titulo,
    ocorrencia.descricao ?? "",
    ocorrencia.tipo,
    ocorrencia.regiao,
    ocorrencia.status,
    ocorrencia.latitude ?? 0,
    ocorrencia.longitude ?? 0,
    ocorrencia.dataCriacao,
    ocorrencia.viatura_id ?? null,
    ocorrencia.equipe_id ?? null,
  ];

  return await executeSqlAsync(sql, params);
};

// ✅ Listar todas as ocorrências offline
export const listarOcorrenciasOffline = async (): Promise<
  OcorrenciaOffline[]
> => {
  const sql = `SELECT * FROM ocorrencias_offline ORDER BY id DESC`;

  const result: any = await executeSqlAsync(sql);

  const rows = result.rows ?? [];

  return rows as OcorrenciaOffline[];
};

// ✅ Buscar ocorrência offline por ID
export const buscarOcorrenciaOffline = async (id: number) => {
  const sql = `SELECT * FROM ocorrencias_offline WHERE id = ?`;

  const result: any = await executeSqlAsync(sql, [id]);

  if (result.rows && result.rows.length > 0) {
    return result.rows[0] as OcorrenciaOffline;
  }

  return null;
};

// ✅ Marcar como sincronizada
export const marcarComoSincronizada = async (id: number) => {
  const sql = `
    UPDATE ocorrencias_offline
    SET sincronizado = 1
    WHERE id = ?
  `;

  return await executeSqlAsync(sql, [id]);
};

// ✅ Atualizar ocorrência offline
export const atualizarOcorrenciaOffline = async (
  id: number,
  dados: Partial<OcorrenciaOffline>
) => {
  const campos = [];
  const valores: any[] = [];

  if (dados.titulo !== undefined) {
    campos.push("titulo = ?");
    valores.push(dados.titulo);
  }

  if (dados.descricao !== undefined) {
    campos.push("descricao = ?");
    valores.push(dados.descricao);
  }

  if (dados.status !== undefined) {
    campos.push("status = ?");
    valores.push(dados.status);
  }

  if (dados.tipo !== undefined) {
    campos.push("tipo = ?");
    valores.push(dados.tipo);
  }

  if (dados.latitude !== undefined) {
    campos.push("latitude = ?");
    valores.push(dados.latitude);
  }

  if (dados.longitude !== undefined) {
    campos.push("longitude = ?");
    valores.push(dados.longitude);
  }

  if (campos.length === 0) return;

  const sql = `
    UPDATE ocorrencias_offline
    SET ${campos.join(", ")}
    WHERE id = ?
  `;

  valores.push(id);

  return await executeSqlAsync(sql, valores);
};

// ✅ Deletar ocorrência offline
export const deletarOcorrenciaOffline = async (id: number) => {
  const sql = `DELETE FROM ocorrencias_offline WHERE id = ?`;

  return await executeSqlAsync(sql, [id]);
};

// ✅ Listar pendentes de sincronização
export const listarPendentes = async (): Promise<OcorrenciaOffline[]> => {
  const sql = `
    SELECT * FROM ocorrencias_offline
    WHERE sincronizado = 0
    ORDER BY id ASC
  `;

  const result: any = await executeSqlAsync(sql);

  return result.rows ?? [];
};
