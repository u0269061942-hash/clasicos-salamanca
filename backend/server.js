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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

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
app.get('/api/coches', (req, res) => {
  const coches = db.prepare('SELECT * FROM coches ORDER BY creado_en DESC').all()
  res.json(coches)
})
app.post('/api/coches', upload.single('foto'), (req, res) => {
  const { marca, modelo, anyo, cilindrada, color, descripcion, propietario } = req.body
  const foto = req.file ? req.file.filename : null
  const result = db.prepare(`INSERT INTO coches (marca, modelo, anyo, cilindrada, color, descripcion, propietario, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(marca, modelo, anyo, cilindrada, color, descripcion, propietario, foto)
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/coches/:id', (req, res) => {
  db.prepare('DELETE FROM coches WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// MOTOS
app.get('/api/motos', (req, res) => {
  const motos = db.prepare('SELECT * FROM motos ORDER BY creado_en DESC').all()
  res.json(motos)
})
app.post('/api/motos', upload.single('foto'), (req, res) => {
  const { marca, modelo, anyo, cilindrada, tipo, descripcion, propietario } = req.body
  const foto = req.file ? req.file.filename : null
  const result = db.prepare(`INSERT INTO motos (marca, modelo, anyo, cilindrada, tipo, descripcion, propietario, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(marca, modelo, anyo, cilindrada, tipo, descripcion, propietario, foto)
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/motos/:id', (req, res) => {
  db.prepare('DELETE FROM motos WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// BICICLETAS
app.get('/api/bicicletas', (req, res) => {
  const bicicletas = db.prepare('SELECT * FROM bicicletas ORDER BY creado_en DESC').all()
  res.json(bicicletas)
})
app.post('/api/bicicletas', upload.single('foto'), (req, res) => {
  const { marca, modelo, anyo, tipo, descripcion, curiosidad } = req.body
  const foto = req.file ? req.file.filename : null
  const result = db.prepare(`INSERT INTO bicicletas (marca, modelo, anyo, tipo, descripcion, curiosidad, foto) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(marca, modelo, anyo, tipo, descripcion, curiosidad, foto)
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/bicicletas/:id', (req, res) => {
  db.prepare('DELETE FROM bicicletas WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// JUGUETES
app.get('/api/juguetes', (req, res) => {
  const juguetes = db.prepare('SELECT * FROM juguetes ORDER BY creado_en DESC').all()
  res.json(juguetes)
})
app.post('/api/juguetes', upload.single('foto'), (req, res) => {
  const { marca, nombre, anyo, material, rareza, descripcion } = req.body
  const foto = req.file ? req.file.filename : null
  const result = db.prepare(`INSERT INTO juguetes (marca, nombre, anyo, material, rareza, descripcion, foto) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(marca, nombre, anyo, material, rareza, descripcion, foto)
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/juguetes/:id', (req, res) => {
  db.prepare('DELETE FROM juguetes WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// CONCENTRACIONES
app.get('/api/concentraciones', (req, res) => {
  const concentraciones = db.prepare('SELECT * FROM concentraciones ORDER BY fecha DESC').all()
  res.json(concentraciones)
})
app.post('/api/concentraciones', (req, res) => {
  const { nombre, fecha, lugar, descripcion } = req.body
  const result = db.prepare(`INSERT INTO concentraciones (nombre, fecha, lugar, descripcion) VALUES (?, ?, ?, ?)`).run(nombre, fecha, lugar, descripcion)
  res.json({ id: result.lastInsertRowid })
})
app.post('/api/concentraciones/:id/fotos', upload.single('foto'), (req, res) => {
  const { tipo, pie_foto } = req.body
  const foto = req.file ? req.file.filename : null
  db.prepare(`INSERT INTO fotos_concentracion (concentracion_id, foto, tipo, pie_foto) VALUES (?, ?, ?, ?)`).run(req.params.id, foto, tipo, pie_foto)
  res.json({ ok: true })
})
app.get('/api/concentraciones/:id/fotos', (req, res) => {
  const fotos = db.prepare('SELECT * FROM fotos_concentracion WHERE concentracion_id = ?').all(req.params.id)
  res.json(fotos)
})
app.delete('/api/concentraciones/:id', (req, res) => {
  db.prepare('DELETE FROM fotos_concentracion WHERE concentracion_id = ?').run(req.params.id)
  db.prepare('DELETE FROM concentraciones WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// MUSEOS
app.get('/api/museos', (req, res) => {
  const museos = db.prepare('SELECT * FROM museos ORDER BY fecha DESC').all()
  res.json(museos)
})
app.post('/api/museos', (req, res) => {
  const { nombre, fecha, lugar, descripcion } = req.body
  const result = db.prepare(`INSERT INTO museos (nombre, fecha, lugar, descripcion) VALUES (?, ?, ?, ?)`).run(nombre, fecha, lugar, descripcion)
  res.json({ id: result.lastInsertRowid })
})
app.post('/api/museos/:id/fotos', upload.single('foto'), (req, res) => {
  const { tipo, pie_foto } = req.body
  const foto = req.file ? req.file.filename : null
  db.prepare(`INSERT INTO fotos_museo (museo_id, foto, tipo, pie_foto) VALUES (?, ?, ?, ?)`).run(req.params.id, foto, tipo, pie_foto)
  res.json({ ok: true })
})
app.get('/api/museos/:id/fotos', (req, res) => {
  const fotos = db.prepare('SELECT * FROM fotos_museo WHERE museo_id = ?').all(req.params.id)
  res.json(fotos)
})
app.delete('/api/museos/:id', (req, res) => {
  db.prepare('DELETE FROM fotos_museo WHERE museo_id = ?').run(req.params.id)
  db.prepare('DELETE FROM museos WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// EVENTOS
app.get('/api/eventos', (req, res) => {
  const eventos = db.prepare('SELECT * FROM eventos ORDER BY fecha ASC').all()
  res.json(eventos)
})
app.post('/api/eventos', (req, res) => {
  const { nombre, fecha, lugar, descripcion, tipo } = req.body
  const result = db.prepare(`INSERT INTO eventos (nombre, fecha, lugar, descripcion, tipo) VALUES (?, ?, ?, ?, ?)`).run(nombre, fecha, lugar, descripcion, tipo)
  res.json({ id: result.lastInsertRowid })
})
app.delete('/api/eventos/:id', (req, res) => {
  db.prepare('DELETE FROM eventos WHERE id = ?').run(req.params.id)
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