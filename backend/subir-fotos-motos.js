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

const carpeta = '/home/alex/Escritorio/web santi/bd datos/bd motos'

const motos = [
  { id: 1, archivo: 'bmw-r75.png' },
  { id: 2, archivo: 'bultaco-sherpa-t.png' },
  { id: 3, archivo: 'derbi-antorcha.png' },
  { id: 4, archivo: 'ducati-750-sport.png' },
  { id: 5, archivo: 'harley-davidson-knucklehead.png' },
  { id: 6, archivo: 'honda-cb750.png' },
  { id: 7, archivo: 'kawasaki-z1.png' },
  { id: 8, archivo: 'lambretta-li-150.png' },
  { id: 9, archivo: 'mobylette-av-88.png' },
  { id: 10, archivo: 'montesa-impala.png' },
  { id: 11, archivo: 'moto-guzzi-v7.png' },
  { id: 12, archivo: 'mv-agusta-750s.png' },
  { id: 13, archivo: 'norton-commando-750.png' },
  { id: 14, archivo: 'ossa-160.png' },
  { id: 15, archivo: 'puch-cobra.png' },
  { id: 16, archivo: 'sanglas-400.png' },
  { id: 17, archivo: 'suzuki-gt750.png' },
  { id: 18, archivo: 'triumph-bonneville-t120.png' },
  { id: 19, archivo: 'vespa-125.png' },
  { id: 20, archivo: 'yamaha-rd350.png' },
]

for (const moto of motos) {
  try {
    const buffer = readFileSync(join(carpeta, moto.archivo))
    const resultado = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'clasicos-salamanca' }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
      stream.end(buffer)
    })
    await db.execute({ sql: 'UPDATE motos SET foto = ? WHERE id = ?', args: [resultado.secure_url, moto.id] })
    console.log('Moto ' + moto.id + ' subida')
  } catch (err) {
    console.error('Error moto ' + moto.id + ': ' + err.message)
  }
}
console.log('Listo')
process.exit(0)
