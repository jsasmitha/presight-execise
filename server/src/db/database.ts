import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseDirectory = path.resolve(
  __dirname,
  '../../database',
);

const databasePath = path.join(
  databaseDirectory,
  'users.db',
);

const schemaPath = path.resolve(
  __dirname,
  './schema.sql',
);

fs.mkdirSync(databaseDirectory, {
  recursive: true,
});

const db = new Database(databasePath);

db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

if (!fs.existsSync(schemaPath)) {
  throw new Error(
    `schema.sql not found at ${schemaPath}`,
  );
}

const schemaSql = fs.readFileSync(
  schemaPath,
  'utf8',
);

db.exec(schemaSql);

console.log(
  'Database schema initialized successfully.',
);

export default db;