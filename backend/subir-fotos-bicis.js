import { v2 as cloudinary } from 'cloudinary'
import db from './database.js'
import { readFileSync } from 'fs'
import { join } from 'path'
import 'dotenv/config'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const carpeta = '/home/alex/Escritorio/web santi/bd datos/bd bicis'

const bicis = [
  { id: 1, archivo: 'bh-bicicross.png' },
  { id: 2, archivo: 'bh-california.png' },
  { id: 3, archivo: 'bh-gacela.png' },
  { id: 4, archivo: 'bh-plegable-clasica.png' },
  { id: 5, archivo: 'bh-top-line.png' },
  { id: 6, archivo: 'bici-macario-profesional.png' },
  { id: 7, archivo: 'bici-zeus-olimpica.png' },
  { id: 8, archivo: 'bici-zeus-ruta.png' },
  { id: 9, archivo: 'gac-motoreta.png' },
  { id: 10, archivo: 'gimson-bicicleta.png' },
  { id: 11, archivo: 'mendiz-touring.png' },
  { id: 12, archivo: 'orbea-gran-lujo.png' },
  { id: 13, archivo: 'orbea-infantil.png' },
  { id: 14, archivo: 'orbea-moncayo.png' },
  { id: 15, archivo: 'orbea-sierra-nevada.png' },
  { id: 16, archivo: 'rabasa-derbi-bicicleta.png' },
  { id: 17, archivo: 'razesa-competicion.png' },
  { id: 18, archivo: 'torrot-bmx.png' },
  { id: 19, archivo: 'torrot-cross-mx.png' },
  { id: 20, archivo: 'torrot-trial.png' },
]

for (const bici of bicis) {
  try {
    const buffer = readFileSync(join(carpeta, bici.archivo))
    const resultado = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'clasicos-salamanca' }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
      stream.end(buffer)
    })
    await db.execute({ sql: 'UPDATE bicicletas SET foto = ? WHERE id = ?', args: [resultado.secure_url, bici.id] })
    console.log('Bici ' + bici.id + ' subida')
  } catch (err) {
    console.error('Error bici ' + bici.id + ': ' + err.message)
  }
}
console.log('Listo')
process.exit(0)
