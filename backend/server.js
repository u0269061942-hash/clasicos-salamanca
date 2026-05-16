import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import 'dotenv/config'
import db from './database.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}, express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })

import { mkdirSync } from 'fs'
mkdirSync(path.join(__dirname, 'uploads'), { recursive: true })

// LOGIN
app.post('/api/login', (req, res) => {
  const { password } = req.body
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ ok: true })
  } else {
    res.json({ ok: false })
  }
})

// COCHES
app.get('/api/coches', async (req, res) => {
  const result = await db.execute('SELECT * FROM coches ORDER BY creado_en DESC')
  res.json(result.rows)
})
app.post('/api/coches', upload.single('foto'), async (req, res) => {
  const { marca, modelo, anyo, cilindrada, color, descripcion, propietario } = req.body
  const foto = req.file ? req.file.filename : null
  const result = await db.execute({ sql: `INSERT INTO coches (marca, modelo, anyo, cilindrada, color, descripcion, propietario, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, args: [marca, modelo, anyo, cilindrada, color, descripcion, propietario, foto] })
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/coches/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM coches WHERE id = ?', args: [req.params.id] })
  res.json({ ok: true })
})

// MOTOS
app.get('/api/motos', async (req, res) => {
  const result = await db.execute('SELECT * FROM motos ORDER BY creado_en DESC')
  res.json(result.rows)
})
app.post('/api/motos', upload.single('foto'), async (req, res) => {
  const { marca, modelo, anyo, cilindrada, tipo, descripcion, propietario } = req.body
  const foto = req.file ? req.file.filename : null
  const result = await db.execute({ sql: `INSERT INTO motos (marca, modelo, anyo, cilindrada, tipo, descripcion, propietario, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, args: [marca, modelo, anyo, cilindrada, tipo, descripcion, propietario, foto] })
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/motos/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM motos WHERE id = ?', args: [req.params.id] })
  res.json({ ok: true })
})

// BICICLETAS
app.get('/api/bicicletas', async (req, res) => {
  const result = await db.execute('SELECT * FROM bicicletas ORDER BY creado_en DESC')
  res.json(result.rows)
})
app.post('/api/bicicletas', upload.single('foto'), async (req, res) => {
  const { marca, modelo, anyo, tipo, descripcion, curiosidad } = req.body
  const foto = req.file ? req.file.filename : null
  const result = await db.execute({ sql: `INSERT INTO bicicletas (marca, modelo, anyo, tipo, descripcion, curiosidad, foto) VALUES (?, ?, ?, ?, ?, ?, ?)`, args: [marca, modelo, anyo, tipo, descripcion, curiosidad, foto] })
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/bicicletas/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM bicicletas WHERE id = ?', args: [req.params.id] })
  res.json({ ok: true })
})

// JUGUETES
app.get('/api/juguetes', async (req, res) => {
  const result = await db.execute('SELECT * FROM juguetes ORDER BY creado_en DESC')
  res.json(result.rows)
})
app.post('/api/juguetes', upload.single('foto'), async (req, res) => {
  const { marca, nombre, anyo, material, rareza, descripcion } = req.body
  const foto = req.file ? req.file.filename : null
  const result = await db.execute({ sql: `INSERT INTO juguetes (marca, nombre, anyo, material, rareza, descripcion, foto) VALUES (?, ?, ?, ?, ?, ?, ?)`, args: [marca, nombre, anyo, material, rareza, descripcion, foto] })
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/juguetes/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM juguetes WHERE id = ?', args: [req.params.id] })
  res.json({ ok: true })
})

// CONCENTRACIONES
app.get('/api/concentraciones', async (req, res) => {
  const result = await db.execute('SELECT * FROM concentraciones ORDER BY fecha DESC')
  res.json(result.rows)
})
app.post('/api/concentraciones', async (req, res) => {
  const { nombre, fecha, lugar, descripcion } = req.body
  const result = await db.execute({ sql: `INSERT INTO concentraciones (nombre, fecha, lugar, descripcion) VALUES (?, ?, ?, ?)`, args: [nombre, fecha, lugar, descripcion] })
  res.json({ id: Number(result.lastInsertRowid) })
})
app.post('/api/concentraciones/:id/fotos', upload.single('foto'), async (req, res) => {
  const { tipo, pie_foto } = req.body
  const foto = req.file ? req.file.filename : null
  await db.execute({ sql: `INSERT INTO fotos_concentracion (concentracion_id, foto, tipo, pie_foto) VALUES (?, ?, ?, ?)`, args: [req.params.id, foto, tipo, pie_foto] })
  res.json({ ok: true })
})
app.get('/api/concentraciones/:id/fotos', async (req, res) => {
  const result = await db.execute({ sql: 'SELECT * FROM fotos_concentracion WHERE concentracion_id = ?', args: [req.params.id] })
  res.json(result.rows)
})
app.post('/api/concentraciones/:id/videos', upload.single('video'), async (req, res) => {
  const { pie_video } = req.body
  const video = req.file ? req.file.filename : null
  await db.execute({ sql: `INSERT INTO videos_concentracion (concentracion_id, video, pie_video) VALUES (?, ?, ?)`, args: [req.params.id, video, pie_video] })
  res.json({ ok: true })
})
app.get('/api/concentraciones/:id/videos', async (req, res) => {
  const result = await db.execute({ sql: 'SELECT * FROM videos_concentracion WHERE concentracion_id = ?', args: [req.params.id] })
  res.json(result.rows)
})
app.delete('/api/concentraciones/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM fotos_concentracion WHERE concentracion_id = ?', args: [req.params.id] })
  await db.execute({ sql: 'DELETE FROM videos_concentracion WHERE concentracion_id = ?', args: [req.params.id] })
  await db.execute({ sql: 'DELETE FROM concentraciones WHERE id = ?', args: [req.params.id] })
  res.json({ ok: true })
})

// MUSEOS
app.get('/api/museos', async (req, res) => {
  const result = await db.execute('SELECT * FROM museos ORDER BY fecha DESC')
  res.json(result.rows)
})
app.post('/api/museos', async (req, res) => {
  const { nombre, fecha, lugar, descripcion } = req.body
  const result = await db.execute({ sql: `INSERT INTO museos (nombre, fecha, lugar, descripcion) VALUES (?, ?, ?, ?)`, args: [nombre, fecha, lugar, descripcion] })
  res.json({ id: Number(result.lastInsertRowid) })
})
app.post('/api/museos/:id/fotos', upload.single('foto'), async (req, res) => {
  const { tipo, pie_foto } = req.body
  const foto = req.file ? req.file.filename : null
  await db.execute({ sql: `INSERT INTO fotos_museo (museo_id, foto, tipo, pie_foto) VALUES (?, ?, ?, ?)`, args: [req.params.id, foto, tipo, pie_foto] })
  res.json({ ok: true })
})
app.get('/api/museos/:id/fotos', async (req, res) => {
  const result = await db.execute({ sql: 'SELECT * FROM fotos_museo WHERE museo_id = ?', args: [req.params.id] })
  res.json(result.rows)
})
app.delete('/api/museos/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM fotos_museo WHERE museo_id = ?', args: [req.params.id] })
  await db.execute({ sql: 'DELETE FROM museos WHERE id = ?', args: [req.params.id] })
  res.json({ ok: true })
})

// EVENTOS
app.get('/api/eventos', async (req, res) => {
  const result = await db.execute('SELECT * FROM eventos ORDER BY fecha ASC')
  res.json(result.rows)
})
app.post('/api/eventos', async (req, res) => {
  const { nombre, fecha, lugar, descripcion, tipo } = req.body
  const result = await db.execute({ sql: `INSERT INTO eventos (nombre, fecha, lugar, descripcion, tipo) VALUES (?, ?, ?, ?, ?)`, args: [nombre, fecha, lugar, descripcion, tipo] })
  res.json({ id: Number(result.lastInsertRowid) })
})
app.delete('/api/eventos/:id', async (req, res) => {
  await db.execute({ sql: 'DELETE FROM eventos WHERE id = ?', args: [req.params.id] })
  res.json({ ok: true })
})

// IA con Groq
app.post('/api/chat', async (req, res) => {
  try {
    const { mensajes } = req.body
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'Eres un experto apasionado en vehículos clásicos españoles y de todo el mundo. Conoces coches, motos, bicicletas clásicas españolas y juguetes clásicos. Respondes en español, de forma cercana y precisa. Máximo 3 párrafos.' },
          ...mensajes
        ],
        max_tokens: 1000
      })
    })
    const data = await response.json()
    res.json({ respuesta: data.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con Groq' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Clásicos Salamanca backend corriendo en http://localhost:${PORT}`)
})