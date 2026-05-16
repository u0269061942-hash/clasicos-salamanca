import { createClient } from '@libsql/client'
import 'dotenv/config'

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN
})

await db.execute(`CREATE TABLE IF NOT EXISTS coches (
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
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS motos (
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
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS bicicletas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  anyo INTEGER,
  tipo TEXT,
  descripcion TEXT,
  curiosidad TEXT,
  foto TEXT,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS juguetes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  marca TEXT NOT NULL,
  nombre TEXT NOT NULL,
  anyo INTEGER,
  material TEXT,
  rareza TEXT,
  descripcion TEXT,
  foto TEXT,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS concentraciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  fecha TEXT,
  lugar TEXT,
  descripcion TEXT,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS fotos_concentracion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  concentracion_id INTEGER,
  foto TEXT,
  tipo TEXT,
  pie_foto TEXT
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS videos_concentracion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  concentracion_id INTEGER,
  video TEXT,
  pie_video TEXT
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS museos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  fecha TEXT,
  lugar TEXT,
  descripcion TEXT,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS fotos_museo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  museo_id INTEGER,
  foto TEXT,
  tipo TEXT,
  pie_foto TEXT
)`)

await db.execute(`CREATE TABLE IF NOT EXISTS eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  fecha TEXT,
  lugar TEXT,
  descripcion TEXT,
  tipo TEXT,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

export default db