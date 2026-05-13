import { useState, useEffect } from 'react'

export default function Coches({ admin }) {
  const [coches, setCoches] = useState([])
  const [form, setForm] = useState({ marca: '', modelo: '', anyo: '', cilindrada: '', color: '', descripcion: '', propietario: '' })
  const [foto, setFoto] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const res = await fetch('https://clasicos-salamanca-backend.onrender.com/api/coches')
    const data = await res.json()
    setCoches(data)
  }

  const guardar = async () => {
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (foto) fd.append('foto', foto)
    await fetch('https://clasicos-salamanca-backend.onrender.com/api/coches', { method: 'POST', body: fd })
    setForm({ marca: '', modelo: '', anyo: '', cilindrada: '', color: '', descripcion: '', propietario: '' })
    setFoto(null)
    setMostrarForm(false)
    cargar()
  }

  const eliminar = async (id) => {
    await fetch(`https://clasicos-salamanca-backend.onrender.com/api/coches/${id}`, { method: 'DELETE' })
    cargar()
  }

  const estiloInput = { width: '100%', padding: '8px 12px', background: '#1a1410', border: '1px solid #3a2e22', color: '#e8dcc8', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '10px' }
  const estiloLabel = { fontSize: '11px', color: '#8B4513', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', letterSpacing: '5px', color: '#c8a96e', fontWeight: 'bold' }}>COCHES CLÁSICOS</h1>
          <p style={{ color: '#6a5a44', letterSpacing: '2px', fontSize: '12px' }}>{coches.length} VEHÍCULOS EN LA BASE DE DATOS</p>
        </div>
        {admin && (
          <button onClick={() => setMostrarForm(!mostrarForm)} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 24px', background: '#8B4513', color: '#e8dcc8', border: 'none', cursor: 'pointer' }}>
            {mostrarForm ? 'CANCELAR' : '+ AÑADIR COCHE'}
          </button>
        )}
      </div>

      {admin && mostrarForm && (
        <div style={{ background: '#120f0a', border: '1px solid #2a2018', borderLeft: '3px solid #8B4513', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8a96e', marginBottom: '20px', letterSpacing: '3px' }}>NUEVO COCHE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[['marca', 'Marca'], ['modelo', 'Modelo'], ['anyo', 'Año'], ['cilindrada', 'Cilindrada'], ['color', 'Color'], ['propietario', 'Propietario']].map(([key, label]) => (
              <div key={key}>
                <label style={estiloLabel}>{label}</label>
                <input style={estiloInput} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
          </div>
          <label style={estiloLabel}>Descripción</label>
          <textarea style={{ ...estiloInput, height: '80px', resize: 'vertical' }} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          <label style={estiloLabel}>Foto</label>
          <input type="file" accept="image/*" onChange={e => setFoto(e.target.files[0])} style={{ color: '#e8dcc8', marginBottom: '16px' }} />
          <br />
          <button onClick={guardar} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 32px', background: '#8B4513', color: '#e8dcc8', border: 'none', cursor: 'pointer' }}>
            GUARDAR
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {coches.map(coche => (
          <div key={coche.id} style={{ background: '#120f0a', border: '1px solid #2a2018', overflow: 'hidden' }}>
            {coche.foto
              ? <img src={`https://clasicos-salamanca-backend.onrender.com/uploads/${coche.foto}`} alt={coche.modelo} style={{ width: '100%', height: '180px', objectFit: 'cover', filter: 'sepia(20%)' }} />
              : <div style={{ width: '100%', height: '180px', background: '#1a1410', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🚗</div>
            }
            <div style={{ padding: '16px' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8a96e', fontWeight: 'bold', letterSpacing: '2px' }}>{coche.marca} {coche.modelo}</div>
              <div style={{ fontSize: '12px', color: '#8B4513', letterSpacing: '2px', margin: '4px 0' }}>{coche.anyo} {coche.cilindrada && `· ${coche.cilindrada}`}</div>
              {coche.color && <div style={{ fontSize: '12px', color: '#6a5a44' }}>Color: {coche.color}</div>}
              {coche.propietario && <div style={{ fontSize: '12px', color: '#6a5a44' }}>Propietario: {coche.propietario}</div>}
              {coche.descripcion && <div style={{ fontSize: '12px', color: '#a89070', marginTop: '8px', lineHeight: '1.5' }}>{coche.descripcion}</div>}
              {coche.historia && <div style={{ fontSize: '12px', color: '#c8a96e', marginTop: '8px', lineHeight: '1.6', fontStyle: 'italic', borderTop: '1px solid #2a2018', paddingTop: '8px' }}>{coche.historia}</div>}
              {admin && (
                <button onClick={() => eliminar(coche.id)} style={{ marginTop: '12px', fontSize: '11px', padding: '4px 12px', background: 'transparent', border: '1px solid #3a2e22', color: '#6a5a44', cursor: 'pointer' }}>
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {coches.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6a5a44', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
          AÚN NO HAY COCHES — ¡AÑADE EL PRIMERO!
        </div>
      )}
    </div>
  )
}