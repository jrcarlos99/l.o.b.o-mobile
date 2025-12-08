import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";

// Abre (ou cria) o banco local
export const db: SQLiteDatabase = openDatabaseSync("app_v2.db");

// Função para rodar migrations (criação de tabelas)
export const initializeDatabase = async () => {
  console.log("🔧 Inicializando banco SQLite...");

  // ✅ Tabela de ocorrências offline (corrigida e completa)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ocorrencias_offline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT NOT NULL,
      tipo TEXT NOT NULL,
      regiao TEXT,
      dataCriacao TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      viatura_id INTEGER,
      equipe_id INTEGER,
      sincronizado INTEGER DEFAULT 0
    );
  `);

  // ✅ Tabela de pendências
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS pending_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      payload TEXT NOT NULL,
      dataCriacao TEXT NOT NULL
    );
  `);

  console.log("✅ Banco inicializado com sucesso!");
};

// Helper para executar SQL com Promise
export const executeSqlAsync = async (sql: string, params: any[] = []) => {
  try {
    const result = await db.runAsync(sql, params);

    // ✅ SELECT retorna array direto
    if (Array.isArray(result)) {
      return { rows: result };
    }

    // ✅ INSERT/UPDATE/DELETE retornam objeto com changes
    return result;
  } catch (err) {
    console.log("❌ ERRO SQL:", sql, params, err);
    throw err;
  }
};
