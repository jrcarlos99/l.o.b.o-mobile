import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";

// Abre (ou cria) o banco local
export const db: SQLiteDatabase = openDatabaseSync("app.db");

// Função para rodar migrations (criação de tabelas)
export const initializeDatabase = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS ocorrencias_offline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT NOT NULL,
      dataCriacao TEXT NOT NULL,
      sincronizado INTEGER DEFAULT 0
    );
  `);

  db.execAsync(`
    CREATE TABLE IF NOT EXISTS pending_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      payload TEXT NOT NULL,
      dataCriacao TEXT NOT NULL
    );
  `);
};

// Helper para executar SQL com Promise
export const executeSqlAsync = async (sql: string, params: any[] = []) => {
  return await db.runAsync(sql, params);
};
