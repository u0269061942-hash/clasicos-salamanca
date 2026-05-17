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

const carpeta = '/home/alex/Escritorio/web santi/bd datos/bd coches'

const coches = [
  { id: 1, archivo: 'Audi_Sport_Quattro_S1_E2_1985-1986.jpeg' },
  { id: 2, archivo: 'Citro_n_C15_Tissier_6x2_van_Década_de_1980-1990.jpeg' },
  { id: 3, archivo: 'Ferrari_348_TS_1989-1993.jpeg' },
  { id: 4, archivo: 'Ford_Sierra_Ghia_MK2_1987-1993.jpeg' },
  { id: 5, archivo: 'Lancia_037_Rally_1982-1984.jpeg' },
  { id: 6, archivo: 'Lancia_Delta_Integrale_Martini_6.jpeg' },
  { id: 7, archivo: 'Moskvich_408_sedan_1964-1975.jpeg' },
  { id: 8, archivo: 'Múltiple_Múltiple.jpeg' },
  { id: 9, archivo: 'Porsche_911_997_Carrera_S_2004-2008_generación_pre-facelift.jpeg' },
  { id: 10, archivo: 'Porsche_911_Carrera_RS_circa_1973-1994_basado_en_el_estilo_pero_modificado.jpeg' },
  { id: 11, archivo: 'Renault_4_F4_furgoneta_1970s-1980s_estimado_por_la_matrícula_H_y_el_diseño.jpeg' },
  { id: 12, archivo: 'Renault_8_1962-1973_primera_generación.jpeg' },
  { id: 13, archivo: 'Renault_18_Turbo_1980-1986.jpeg' },
  { id: 14, archivo: 'Renault_Dauphine_circa_1956-1967.jpeg' },
  { id: 15, archivo: 'SEAT_127_1972-1982.jpeg' },
  { id: 16, archivo: 'SEAT_600_D_1963-1970.jpeg' },
  { id: 17, archivo: 'Toyota_Celica_GT-Four_1988-1989_aproximado_según_la_versión_ST165_de_rally.jpeg' },
  { id: 18, archivo: 'Trabant_601_desconocido_la_escultura_no_tiene_año_definido_pero_el_modelo_fue_producido_de_1963_a_1990.jpeg' },
  { id: 19, archivo: 'UAZ_469_3151_Décadas_de_1970_a_1990_producción_temprana_del_3151_que_es_una_evolución_directa_del_469.jpeg' },
  { id: 20, archivo: 'Wartburg_311_2-Door_Sedan_1956-1965.jpeg' },
]

for (const coche of coches) {
  try {
    const ruta = join(carpeta, coche.archivo)
    const buffer = readFileSync(ruta)
    const resultado = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'clasicos-salamanca' }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
      stream.end(buffer)
    })
    await db.execute({ sql: 'UPDATE coches SET foto = ? WHERE id = ?', args: [resultado.secure_url, coche.id] })
    console.log('Coche ' + coche.id + ' subido')
  } catch (err) {
    console.error('Error en coche ' + coche.id + ': ' + err.message)
  }
}

console.log('Listo')
process.exit(0)
