import { executeSqlAsync } from "../database";

export interface PendingAction {
  id: number;
  tipo: string;
  payload: any;
  dataCriacao: string;
}

// ✅ Adicionar ação à fila
export const adicionarPendencia = async (tipo: string, payload: any) => {
  const sql = `
    INSERT INTO pending_queue (tipo, payload, dataCriacao)
    VALUES (?, ?, ?)
  `;

  const params = [tipo, JSON.stringify(payload), new Date().toISOString()];

  return await executeSqlAsync(sql, params);
};

// ✅ Listar pendências
export const listarPendencias = async (): Promise<PendingAction[]> => {
  const sql = `SELECT * FROM pending_queue ORDER BY id ASC`;

  const result: any = await executeSqlAsync(sql);

  const rows = result.rows ?? [];

  return rows.map((row: any) => ({
    ...row,
    payload: JSON.parse(row.payload),
  }));
};

// ✅ Remover pendência
export const removerPendencia = async (id: number) => {
  const sql = `DELETE FROM pending_queue WHERE id = ?`;

  return await executeSqlAsync(sql, [id]);
};

// ✅ Limpar pendências
export const limparPendencias = async () => {
  const sql = `DELETE FROM pending_queue`;

  return await executeSqlAsync(sql);
};
