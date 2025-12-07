import { executeSqlAsync } from "../database";

export interface PendingAction {
  id: number;
  tipo: string; // ex: "CRIAR_OCORRENCIA", "ATUALIZAR_OCORRENCIA"
  payload: any; // JSON com os dados da ação
  dataCriacao: string;
}

// Adicionar ação à fila
export const adicionarPendencia = async (tipo: string, payload: any) => {
  const sql = `
    INSERT INTO pending_queue (tipo, payload, dataCriacao)
    VALUES (?, ?, ?)
  `;

  const params = [tipo, JSON.stringify(payload), new Date().toISOString()];

  return await executeSqlAsync(sql, params);
};

// Listar todas as pendências
export const listarPendencias = async (): Promise<PendingAction[]> => {
  const sql = `SELECT * FROM pending_queue ORDER BY id ASC`;

  const result: any = await executeSqlAsync(sql);

  const rows = result.rows._array ?? [];

  return rows.map((row: any) => ({
    ...row,
    payload: JSON.parse(row.payload),
  }));
};

// Remover pendência após sincronizar
export const removerPendencia = async (id: number) => {
  const sql = `DELETE FROM pending_queue WHERE id = ?`;

  return await executeSqlAsync(sql, [id]);
};

// Limpar todas as pendências (opcional)
export const limparPendencias = async () => {
  const sql = `DELETE FROM pending_queue`;

  return await executeSqlAsync(sql);
};
