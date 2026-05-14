import { useState, useEffect } from 'react'
import BotonInicio from '../components/BotonInicio'

export default function Juguetes({ admin, setPagina }) {
  const [juguetes, setJuguetes] = useState([])
  const [form, setForm] = useState({ marca: '', nombre: '', anyo: '', material: '', rareza: '', descripcion: '' })
  const [foto, setFoto] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const res = await fetch('https://clasicos-salamanca-backend.onrender.com/api/juguetes')
    const data = await res.json()
    setJuguetes(data)
  }

  const guardar = async () => {
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (foto) fd.append('foto', foto)
    await fetch('https://clasicos-salamanca-backend.onrender.com/api/juguetes', { method: 'POST', body: fd })
    setForm({ marca: '', nombre: '', anyo: '', material: '', rareza: '', descripcion: '' })
    setFoto(null)
    setMostrarForm(false)
    cargar()
  }

  const eliminar = async (id) => {
    await fetch(`https://clasicos-salamanca-backend.onrender.com/api/juguetes/${id}`, { method: 'DELETE' })
    cargar()
  }

  const estiloInput = { width: '100%', padding: '8px 12px', background: '#1a1410', border: '1px solid #3a2e22', color: '#e8dcc8', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '10px' }
  const estiloLabel = { fontSize: '11px', color: '#8B4513', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }

  const colorRareza = (r) => {
    if (!r) return '#6a5a44'
    if (r.includes('Muy raro')) return '#c8a96e'
    if (r.includes('Raro')) return '#8B4513'
    if (r.includes('Poco')) return '#a89070'
    return '#6a5a44'
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', letterSpacing: '5px', color: '#c8a96e', fontWeight: 'bold' }}>JUGUETES CLÁSICOS</h1>
          <p style={{ color: '#6a5a44', letterSpacing: '2px', fontSize: '12px' }}>{juguetes.length} JUGUETES EN LA BASE DE DATOS</p>
        </div>
        {admin && (
          <button onClick={() => setMostrarForm(!mostrarForm)} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 24px', background: '#8B4513', color: '#e8dcc8', border: 'none', cursor: 'pointer' }}>
            {mostrarForm ? 'CANCELAR' : '+ AÑADIR JUGUETE'}
          </button>
        )}
      </div>

      {admin && mostrarForm && (
        <div style={{ background: '#120f0a', border: '1px solid #2a2018', borderLeft: '3px solid #8B4513', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8a96e', marginBottom: '20px', letterSpacing: '3px' }}>NUEVO JUGUETE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[['marca', 'Marca'], ['nombre', 'Nombre'], ['anyo', 'Año'], ['material', 'Material'], ['rareza', 'Rareza']].map(([key, label]) => (
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
        {juguetes.map(juguete => (
          <div key={juguete.id} style={{ background: '#120f0a', border: '1px solid #2a2018', overflow: 'hidden' }}>
            {juguete.foto
              ? <img src={`https://clasicos-salamanca-backend.onrender.com/uploads/${juguete.foto}`} alt={juguete.nombre} style={{ width: '100%', height: '180px', objectFit: 'contain', background: '#1a1410', filter: 'sepia(20%)' }} />
              : <div style={{ width: '100%', height: '180px', background: '#1a1410', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🧸</div>
            }
            <div style={{ padding: '16px' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8a96e', fontWeight: 'bold', letterSpacing: '2px' }}>{juguete.nombre}</div>
              <div style={{ fontSize: '12px', color: '#8B4513', letterSpacing: '2px', margin: '4px 0' }}>{juguete.marca} · {juguete.anyo}</div>
              {juguete.material && <div style={{ fontSize: '12px', color: '#6a5a44' }}>Material: {juguete.material}</div>}
              {juguete.rareza && <div style={{ fontSize: '12px', color: colorRareza(juguete.rareza), marginTop: '4px', fontWeight: 'bold' }}>⭐ {juguete.rareza}</div>}
              {juguete.descripcion && <div style={{ fontSize: '12px', color: '#a89070', marginTop: '8px', lineHeight: '1.5' }}>{juguete.descripcion}</div>}
              {juguete.historia && <div style={{ fontSize: '12px', color: '#c8a96e', marginTop: '8px', lineHeight: '1.6', fontStyle: 'italic', borderTop: '1px solid #2a2018', paddingTop: '8px' }}>{juguete.historia}</div>}
              {admin && (
                <button onClick={() => eliminar(juguete.id)} style={{ marginTop: '12px', fontSize: '11px', padding: '4px 12px', background: 'transparent', border: '1px solid #3a2e22', color: '#6a5a44', cursor: 'pointer' }}>
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {juguetes.length === 0 && !mostrarForm && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6a5a44', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
          AÚN NO HAY JUGUETES — ¡AÑADE EL PRIMERO!
        </div>
      )}

      <BotonInicio setPagina={setPagina} />
    </div>
  )
}