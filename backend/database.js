import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const db = new Database(join(__dirname, 'clasicos.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS coches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anyo INTEGER,
    cilindrada TEXT,
    color TEXT,
    descripcion TEXT,
    propietario TEXT,
    foto TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS motos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anyo INTEGER,
    cilindrada TEXT,
    tipo TEXT,
    descripcion TEXT,
    propietario TEXT,
    foto TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bicicletas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anyo INTEGER,
    tipo TEXT,
    descripcion TEXT,
    curiosidad TEXT,
    foto TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS juguetes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marca TEXT NOT NULL,
    nombre TEXT NOT NULL,
    anyo INTEGER,
    material TEXT,
    rareza TEXT,
    descripcion TEXT,
    foto TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS concentraciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    fecha TEXT,
    lugar TEXT,
    descripcion TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS fotos_concentracion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    concentracion_id INTEGER,
    foto TEXT,
    tipo TEXT,
    pie_foto TEXT,
    FOREIGN KEY (concentracion_id) REFERENCES concentraciones(id)
  );

  CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    fecha TEXT,
    lugar TEXT,
    descripcion TEXT,
    tipo TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

export default db