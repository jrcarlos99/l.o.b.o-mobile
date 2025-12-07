import { executeSqlAsync } from "../database";

// Tipo da ocorrência offline
export interface OcorrenciaOffline {
  id?: number;
  titulo: string;
  descricao?: string;
  status: string;
  dataCriacao: string;
  sincronizado?: number; // 0 = não sincronizado, 1 = sincronizado
}

// Salvar uma ocorrência offline
export const salvarOcorrenciaOffline = async (
  ocorrencia: OcorrenciaOffline
) => {
  const sql = `
    INSERT INTO ocorrencias_offline 
    (titulo, descricao, status, dataCriacao, sincronizado)
    VALUES (?, ?, ?, ?, 0)
  `;

  const params = [
    ocorrencia.titulo,
    ocorrencia.descricao ?? "",
    ocorrencia.status,
    ocorrencia.dataCriacao,
  ];

  return await executeSqlAsync(sql, params);
};

// Listar todas as ocorrências offline
export const listarOcorrenciasOffline = async (): Promise<
  OcorrenciaOffline[]
> => {
  const sql = `SELECT * FROM ocorrencias_offline ORDER BY id DESC`;

  const result: any = await executeSqlAsync(sql);

  const rows = result.rows._array ?? [];

  return rows as OcorrenciaOffline[];
};

// Buscar uma ocorrência offline por ID
export const buscarOcorrenciaOffline = async (
  id: number
): Promise<OcorrenciaOffline | null> => {
  const sql = `SELECT * FROM ocorrencias_offline WHERE id = ?`;

  const result: any = await executeSqlAsync(sql, [id]);

  if (result.rows.length > 0) {
    return result.rows.item(0) as OcorrenciaOffline;
  }

  return null;
};

// Marcar ocorrência como sincronizada
export const marcarComoSincronizada = async (id: number) => {
  const sql = `
    UPDATE ocorrencias_offline
    SET sincronizado = 1
    WHERE id = ?
  `;

  return await executeSqlAsync(sql, [id]);
};

// Atualizar ocorrência offline (caso o usuário edite antes de sincronizar)
export const atualizarOcorrenciaOffline = async (
  id: number,
  dados: Partial<OcorrenciaOffline>
) => {
  const campos = [];
  const valores: any[] = [];

  if (dados.titulo) {
    campos.push("titulo = ?");
    valores.push(dados.titulo);
  }

  if (dados.descricao) {
    campos.push("descricao = ?");
    valores.push(dados.descricao);
  }

  if (dados.status) {
    campos.push("status = ?");
    valores.push(dados.status);
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

// Deletar ocorrência offline (após sincronizar)
export const deletarOcorrenciaOffline = async (id: number) => {
  const sql = `DELETE FROM ocorrencias_offline WHERE id = ?`;

  return await executeSqlAsync(sql, [id]);
};

// Listar ocorrências pendentes de sincronização
export const listarPendentes = async (): Promise<OcorrenciaOffline[]> => {
  const sql = `
    SELECT * FROM ocorrencias_offline
    WHERE sincronizado = 0
    ORDER BY id ASC
  `;

  const result: any = await executeSqlAsync(sql);

  return result.rows._array ?? [];
};
