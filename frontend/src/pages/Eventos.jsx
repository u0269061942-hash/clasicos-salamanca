import { useState, useEffect } from 'react'

function MapaEvento({ lugar }) {
  return (
    <div style={{ marginTop: '12px', border: '1px solid #2a2018', overflow: 'hidden' }}>
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(lugar)}&output=embed`}
        style={{ width: '100%', height: '220px', border: 'none', filter: 'sepia(30%) contrast(1.1)' }}
        title={lugar}
        loading="lazy"
      />
    </div>
  )
}

export default function Eventos({ admin }) {
  const [eventos, setEventos] = useState([])
  const [form, setForm] = useState({ nombre: '', fecha: '', lugar: '', descripcion: '', tipo: 'Ruta' })
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const res = await fetch('https://clasicos-salamanca-backend.onrender.com/api/eventos')
    const data = await res.json()
    setEventos(data)
  }

  const guardar = async () => {
    await fetch('https://clasicos-salamanca-backend.onrender.com/api/eventos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ nombre: '', fecha: '', lugar: '', descripcion: '', tipo: 'Ruta' })
    setMostrarForm(false)
    cargar()
  }

  const eliminar = async (id) => {
    await fetch(`https://clasicos-salamanca-backend.onrender.com/api/eventos/${id}`, { method: 'DELETE' })
    cargar()
  }

  const estiloInput = { width: '100%', padding: '8px 12px', background: '#1a1410', border: '1px solid #3a2e22', color: '#e8dcc8', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '10px' }
  const estiloLabel = { fontSize: '11px', color: '#8B4513', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }

  const colorTipo = (tipo) => {
    if (tipo === 'Ruta') return '#8B4513'
    if (tipo === 'Concentración') return '#c8a96e'
    if (tipo === 'Museo') return '#6a5a44'
    return '#6a5a44'
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', letterSpacing: '5px', color: '#c8a96e', fontWeight: 'bold' }}>EVENTOS Y RUTAS</h1>
          <p style={{ color: '#6a5a44', letterSpacing: '2px', fontSize: '12px' }}>{eventos.length} EVENTOS PROGRAMADOS</p>
        </div>
        {admin && (
          <button onClick={() => setMostrarForm(!mostrarForm)} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 24px', background: '#8B4513', color: '#e8dcc8', border: 'none', cursor: 'pointer' }}>
            {mostrarForm ? 'CANCELAR' : '+ AÑADIR EVENTO'}
          </button>
        )}
      </div>

      {admin && mostrarForm && (
        <div style={{ background: '#120f0a', border: '1px solid #2a2018', borderLeft: '3px solid #8B4513', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8a96e', marginBottom: '20px', letterSpacing: '3px' }}>NUEVO EVENTO</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={estiloLabel}>Nombre</label>
              <input style={estiloInput} value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
            </div>
            <div>
              <label style={estiloLabel}>Fecha</label>
              <input type="date" style={estiloInput} value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} />
            </div>
            <div>
              <label style={estiloLabel}>Lugar</label>
              <input style={estiloInput} value={form.lugar} onChange={e => setForm({ ...form, lugar: e.target.value })} placeholder="Ej: Plaza Mayor, Salamanca" />
            </div>
            <div>
              <label style={estiloLabel}>Tipo</label>
              <select style={estiloInput} value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                <option>Ruta</option>
                <option>Concentración</option>
                <option>Museo</option>
                <option>Quedada</option>
              </select>
            </div>
          </div>
          <label style={estiloLabel}>Descripción</label>
          <textarea style={{ ...estiloInput, height: '80px', resize: 'vertical' }} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          <button onClick={guardar} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 32px', background: '#8B4513', color: '#e8dcc8', border: 'none', cursor: 'pointer' }}>
            GUARDAR
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {eventos.map(evento => (
          <div key={evento.id} style={{ background: '#120f0a', border: '1px solid #2a2018', borderLeft: '3px solid #8B4513', padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 10px', border: `1px solid ${colorTipo(evento.tipo)}`, color: colorTipo(evento.tipo), letterSpacing: '1px' }}>{evento.tipo}</span>
                  <span style={{ fontSize: '12px', color: '#8B4513', letterSpacing: '2px' }}>{evento.fecha}</span>
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#c8a96e', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '4px' }}>{evento.nombre}</div>
                {evento.lugar && <div style={{ fontSize: '12px', color: '#6a5a44', marginBottom: '6px' }}>📍 {evento.lugar}</div>}
                {evento.descripcion && <div style={{ fontSize: '13px', color: '#a89070', lineHeight: '1.6' }}>{evento.descripcion}</div>}
                {evento.lugar && <MapaEvento lugar={evento.lugar} />}
              </div>
              {admin && (
                <button onClick={() => eliminar(evento.id)} style={{ marginLeft: '16px', fontSize: '11px', padding: '4px 12px', background: 'transparent', border: '1px solid #3a2e22', color: '#6a5a44', cursor: 'pointer' }}>
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {eventos.length === 0 && !mostrarForm && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6a5a44', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
          AÚN NO HAY EVENTOS — ¡AÑADE EL PRIMERO!
        </div>
      )}
    </div>
  )
}