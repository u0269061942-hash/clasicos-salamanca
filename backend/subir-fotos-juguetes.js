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

const carpeta = '/home/alex/Escritorio/web santi/bd datos/bd juguetes'

const juguetes = [
  { id: 1, archivo: 'airgam-boys.png' },
  { id: 2, archivo: 'barriguitas.png' },
  { id: 3, archivo: 'cine-exin.png' },
  { id: 4, archivo: 'cinexin.png' },
  { id: 5, archivo: 'comansi-indios-y-vaqueros.png' },
  { id: 6, archivo: 'exin-castillos.png' },
  { id: 7, archivo: 'famobil.png' },
  { id: 8, archivo: 'fuerte-comansi.png' },
  { id: 9, archivo: 'geyperman.png' },
  { id: 10, archivo: 'ibertren.png' },
  { id: 11, archivo: 'juegos-reunidos-geyper.png' },
  { id: 12, archivo: 'juguete-hucha-del-domund.png' },
  { id: 13, archivo: 'juguete-nancy.png' },
  { id: 14, archivo: 'juguete-tente.png' },
  { id: 15, archivo: 'madelman.png' },
  { id: 16, archivo: 'mecano-de-paya.png' },
  { id: 17, archivo: 'muneca-mariquita-perez.png' },
  { id: 18, archivo: 'pin-y-pon-clasico.png' },
  { id: 19, archivo: 'pinypon.png' },
  { id: 20, archivo: 'scalextric-exin.png' },
]

for (const juguete of juguetes) {
  try {
    const buffer = readFileSync(join(carpeta, juguete.archivo))
    const resultado = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'clasicos-salamanca' }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
      stream.end(buffer)
    })
    await db.execute({ sql: 'UPDATE juguetes SET foto = ? WHERE id = ?', args: [resultado.secure_url, juguete.id] })
    console.log('Juguete ' + juguete.id + ' subido')
  } catch (err) {
    console.error('Error juguete ' + juguete.id + ': ' + err.message)
  }
}
console.log('Listo')
process.exit(0)
