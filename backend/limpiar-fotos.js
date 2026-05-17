import db from './database.js'

await db.execute("UPDATE coches SET foto = NULL WHERE foto IS NOT NULL AND foto NOT LIKE 'http%'")
await db.execute("UPDATE motos SET foto = NULL WHERE foto IS NOT NULL AND foto NOT LIKE 'http%'")
await db.execute("UPDATE bicicletas SET foto = NULL WHERE foto IS NOT NULL AND foto NOT LIKE 'http%'")
await db.execute("UPDATE juguetes SET foto = NULL WHERE foto IS NOT NULL AND foto NOT LIKE 'http%'")
await db.execute("UPDATE fotos_concentracion SET foto = NULL WHERE foto IS NOT NULL AND foto NOT LIKE 'http%'")
await db.execute("UPDATE fotos_museo SET foto = NULL WHERE foto IS NOT NULL AND foto NOT LIKE 'http%'")

console.log("Fotos antiguas eliminadas correctamente")
process.exit(0)
