import db from './database.js'
import 'dotenv/config'

async function generarHistoria(tipo, marca, modelo, anyo, descripcion) {
  const prompt = `Genera una historia corta y apasionante (3-4 frases) sobre este vehículo/objeto clásico:
  Tipo: ${tipo}
  Marca: ${marca}
  Modelo: ${modelo || ''}
  Año: ${anyo || ''}
  Descripción: ${descripcion || ''}
  
  La historia debe ser emotiva, con datos históricos reales y que transmita la pasión por los clásicos. En español.`

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300
    })
  })
  const data = await response.json()
  return data.choices[0].message.content
}

async function main() {
  console.log('Generando historias con IA...\n')

  const coches = db.prepare('SELECT * FROM coches WHERE historia IS NULL').all()
  for (const c of coches) {
    console.log(`Coche: ${c.marca} ${c.modelo}`)
    const historia = await generarHistoria('Coche clásico', c.marca, c.modelo, c.anyo, c.descripcion)
    db.prepare('UPDATE coches SET historia = ? WHERE id = ?').run(historia, c.id)
    console.log('✓ Historia generada\n')
  }

  const motos = db.prepare('SELECT * FROM motos WHERE historia IS NULL').all()
  for (const m of motos) {
    console.log(`Moto: ${m.marca} ${m.modelo}`)
    const historia = await generarHistoria('Moto clásica', m.marca, m.modelo, m.anyo, m.descripcion)
    db.prepare('UPDATE motos SET historia = ? WHERE id = ?').run(historia, m.id)
    console.log('✓ Historia generada\n')
  }

  const bicis = db.prepare('SELECT * FROM bicicletas WHERE historia IS NULL').all()
  for (const b of bicis) {
    console.log(`Bici: ${b.marca} ${b.modelo}`)
    const historia = await generarHistoria('Bicicleta clásica española', b.marca, b.modelo, b.anyo, b.descripcion)
    db.prepare('UPDATE bicicletas SET historia = ? WHERE id = ?').run(historia, b.id)
    console.log('✓ Historia generada\n')
  }

  const juguetes = db.prepare('SELECT * FROM juguetes WHERE historia IS NULL').all()
  for (const j of juguetes) {
    console.log(`Juguete: ${j.marca} ${j.nombre}`)
    const historia = await generarHistoria('Juguete clásico español', j.marca, j.nombre, j.anyo, j.descripcion)
    db.prepare('UPDATE juguetes SET historia = ? WHERE id = ?').run(historia, j.id)
    console.log('✓ Historia generada\n')
  }

  console.log('¡Todas las historias generadas!')
}

main()