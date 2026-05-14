import { useState, useEffect } from 'react'
import BotonInicio from '../components/BotonInicio'

function Galeria({ fotos }) {
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActual(prev => (prev + 1) % fotos.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [fotos.length])

  const anterior = () => setActual(prev => (prev - 1 + fotos.length) % fotos.length)
  const siguiente = () => setActual(prev => (prev + 1) % fotos.length)

  if (fotos.length === 0) return null

  return (
    <div style={{ position: 'relative', background: '#0a0806', border: '1px solid #2a2018', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '480px' }}>
        <img src={`https://clasicos-salamanca-backend.onrender.com/uploads/${fotos[actual].foto}`} alt={fotos[actual].pie_foto} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'sepia(10%)' }} />
        <button onClick={anterior} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(14,12,10,0.8)', border: '1px solid #8B4513', color: '#c8a96e', fontSize: '24px', width: '48px', height: '48px', cursor: 'pointer', fontFamily: 'Georgia, serif' }}>‹</button>
        <button onClick={siguiente} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(14,12,10,0.8)', border: '1px solid #8B4513', color: '#c8a96e', fontSize: '24px', width: '48px', height: '48px', cursor: 'pointer', fontFamily: 'Georgia, serif' }}>›</button>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(14,12,10,0.85)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#c8a96e', letterSpacing: '2px' }}>{fotos[actual].pie_foto}</div>
          <div style={{ fontSize: '12px', color: '#6a5a44', letterSpacing: '2px' }}>{actual + 1} / {fotos.length}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px', padding: '12px', overflowX: 'auto', background: '#0e0c0a' }}>
        {fotos.map((foto, i) => (
          <img key={foto.id} src={`https://clasicos-salamanca-backend.onrender.com/uploads/${foto.foto}`} alt={foto.pie_foto} onClick={() => setActual(i)} style={{ width: '60px', height: '45px', objectFit: 'cover', cursor: 'pointer', filter: i === actual ? 'sepia(0%)' : 'sepia(40%) brightness(0.6)', border: i === actual ? '2px solid #8B4513' : '1px solid #2a2018', flexShrink: 0 }} />
        ))}
      </div>
    </div>
  )
}

export default function Concentraciones({ admin, setPagina }) {
  const [concentraciones, setConcentraciones] = useState([])
  const [form, setForm] = useState({ nombre: '', fecha: '', lugar: '', descripcion: '' })
  const [mostrarForm, setMostrarForm] = useState(false)
  const [seleccionada, setSeleccionada] = useState(null)
  const [fotos, setFotos] = useState([])
  const [fotosFiles, setFotosFiles] = useState([])
  const [tipoFoto, setTipoFoto] = useState('coche')
  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const res = await fetch('https://clasicos-salamanca-backend.onrender.com/api/concentraciones')
    const data = await res.json()
    setConcentraciones(data)
  }

  const guardar = async () => {
    await fetch('https://clasicos-salamanca-backend.onrender.com/api/concentraciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ nombre: '', fecha: '', lugar: '', descripcion: '' })
    setMostrarForm(false)
    cargar()
  }

  const eliminar = async (id) => {
    await fetch(`https://clasicos-salamanca-backend.onrender.com/api/concentraciones/${id}`, { method: 'DELETE' })
    setSeleccionada(null)
    cargar()
  }

  const abrirConcentracion = async (conc) => {
    setSeleccionada(conc)
    const res = await fetch(`https://clasicos-salamanca-backend.onrender.com/api/concentraciones/${conc.id}/fotos`)
    const data = await res.json()
    setFotos(data)
  }

  const subirFotos = async () => {
    if (fotosFiles.length === 0) return
    setSubiendo(true)
    setProgreso(0)
    for (let i = 0; i < fotosFiles.length; i++) {
      const file = fotosFiles[i]
      const fd = new FormData()
      fd.append('foto', file)
      fd.append('tipo', tipoFoto)
      const nombre = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ').replace(/-/g, ' ')
      fd.append('pie_foto', nombre)
      await fetch(`https://clasicos-salamanca-backend.onrender.com/api/concentraciones/${seleccionada.id}/fotos`, { method: 'POST', body: fd })
      setProgreso(Math.round(((i + 1) / fotosFiles.length) * 100))
    }
    setFotosFiles([])
    setSubiendo(false)
    const res = await fetch(`https://clasicos-salamanca-backend.onrender.com/api/concentraciones/${seleccionada.id}/fotos`)
    const data = await res.json()
    setFotos(data)
  }

  const estiloInput = { width: '100%', padding: '8px 12px', background: '#1a1410', border: '1px solid #3a2e22', color: '#e8dcc8', fontFamily: 'Georgia, serif', fontSize: '13px', marginBottom: '10px' }
  const estiloLabel = { fontSize: '11px', color: '#8B4513', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }

  if (seleccionada) {
    return (
      <div style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={() => setSeleccionada(null)} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '8px 20px', background: 'transparent', color: '#8B4513', border: '1px solid #8B4513', cursor: 'pointer', marginBottom: '24px' }}>
          ← VOLVER
        </button>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', letterSpacing: '4px', color: '#c8a96e', fontWeight: 'bold' }}>{seleccionada.nombre}</h1>
          <div style={{ fontSize: '12px', color: '#8B4513', letterSpacing: '2px', margin: '4px 0' }}>{seleccionada.fecha} {seleccionada.lugar && `· ${seleccionada.lugar}`}</div>
          {seleccionada.descripcion && <div style={{ fontSize: '13px', color: '#a89070', marginTop: '8px', lineHeight: '1.6' }}>{seleccionada.descripcion}</div>}
          <div style={{ fontSize: '12px', color: '#6a5a44', marginTop: '8px', letterSpacing: '2px' }}>{fotos.length} FOTOS</div>
        </div>

        {admin && (
          <div style={{ background: '#120f0a', border: '1px solid #2a2018', borderLeft: '3px solid #8B4513', padding: '20px', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#c8a96e', marginBottom: '16px', letterSpacing: '2px' }}>SUBIR FOTOS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
              <div>
                <label style={estiloLabel}>Tipo de fotos</label>
                <select style={estiloInput} value={tipoFoto} onChange={e => setTipoFoto(e.target.value)}>
                  <option value="coche">Coches</option>
                  <option value="moto">Motos</option>
                  <option value="museo">Museo</option>
                  <option value="grupo">Grupo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label style={estiloLabel}>Seleccionar fotos (hasta 40)</label>
                <input type="file" accept="image/*" multiple onChange={e => setFotosFiles(Array.from(e.target.files))} style={{ color: '#e8dcc8', marginBottom: '10px' }} />
                {fotosFiles.length > 0 && <div style={{ fontSize: '12px', color: '#8B4513' }}>{fotosFiles.length} fotos seleccionadas</div>}
              </div>
            </div>
            {subiendo && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#c8a96e', marginBottom: '6px' }}>Subiendo... {progreso}%</div>
                <div style={{ height: '4px', background: '#2a2018', borderRadius: '2px' }}>
                  <div style={{ height: '4px', background: '#8B4513', borderRadius: '2px', width: `${progreso}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            )}
            <button onClick={subirFotos} disabled={subiendo || fotosFiles.length === 0} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 32px', background: subiendo ? '#3a2e22' : '#8B4513', color: '#e8dcc8', border: 'none', cursor: subiendo ? 'wait' : 'pointer' }}>
              {subiendo ? `SUBIENDO ${progreso}%` : `SUBIR ${fotosFiles.length} FOTOS`}
            </button>
          </div>
        )}

        {['coche', 'moto', 'museo', 'grupo', 'otro'].map(tipo => {
          const fotosTipo = fotos.filter(f => f.tipo === tipo)
          if (fotosTipo.length === 0) return null
          const labels = { coche: 'COCHES', moto: 'MOTOS', museo: 'MUSEO', grupo: 'GRUPO', otro: 'OTROS' }
          return (
            <div key={tipo} style={{ marginBottom: '48px' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', letterSpacing: '4px', color: '#c8a96e', marginBottom: '16px', borderBottom: '1px solid #2a2018', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{labels[tipo]}</span>
                <span style={{ fontSize: '13px', color: '#6a5a44' }}>{fotosTipo.length} fotos</span>
              </div>
              <Galeria fotos={fotosTipo} />
            </div>
          )
        })}

        {fotos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6a5a44', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
            AUN NO HAY FOTOS EN ESTA CONCENTRACION
          </div>
        )}

        {admin && (
          <button onClick={() => eliminar(seleccionada.id)} style={{ marginTop: '24px', fontSize: '12px', padding: '8px 20px', background: 'transparent', border: '1px solid #3a2e22', color: '#6a5a44', cursor: 'pointer', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
            ELIMINAR CONCENTRACION
          </button>
        )}

        <BotonInicio setPagina={setPagina} />
      </div>
    )
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', letterSpacing: '5px', color: '#c8a96e', fontWeight: 'bold' }}>CONCENTRACIONES</h1>
          <p style={{ color: '#6a5a44', letterSpacing: '2px', fontSize: '12px' }}>{concentraciones.length} CONCENTRACIONES</p>
        </div>
        {admin && (
          <button onClick={() => setMostrarForm(!mostrarForm)} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 24px', background: '#8B4513', color: '#e8dcc8', border: 'none', cursor: 'pointer' }}>
            {mostrarForm ? 'CANCELAR' : '+ AÑADIR CONCENTRACION'}
          </button>
        )}
      </div>

      {admin && mostrarForm && (
        <div style={{ background: '#120f0a', border: '1px solid #2a2018', borderLeft: '3px solid #8B4513', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#c8a96e', marginBottom: '20px', letterSpacing: '3px' }}>NUEVA CONCENTRACION</h2>
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
              <input style={estiloInput} value={form.lugar} onChange={e => setForm({ ...form, lugar: e.target.value })} />
            </div>
          </div>
          <label style={estiloLabel}>Descripcion</label>
          <textarea style={{ ...estiloInput, height: '80px', resize: 'vertical' }} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          <button onClick={guardar} style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', padding: '10px 32px', background: '#8B4513', color: '#e8dcc8', border: 'none', cursor: 'pointer' }}>
            GUARDAR
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {concentraciones.map(conc => (
          <div key={conc.id} onClick={() => abrirConcentracion(conc)} style={{ background: '#120f0a', border: '1px solid #2a2018', padding: '24px', cursor: 'pointer', borderBottom: '3px solid #8B4513' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#c8a96e', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>{conc.nombre}</div>
            <div style={{ fontSize: '12px', color: '#8B4513', letterSpacing: '2px', marginBottom: '4px' }}>{conc.fecha}</div>
            {conc.lugar && <div style={{ fontSize: '12px', color: '#6a5a44' }}>📍 {conc.lugar}</div>}
            {conc.descripcion && <div style={{ fontSize: '12px', color: '#a89070', marginTop: '8px', lineHeight: '1.5' }}>{conc.descripcion}</div>}
            <div style={{ fontSize: '11px', color: '#8B4513', marginTop: '12px', letterSpacing: '2px' }}>VER FOTOS →</div>
          </div>
        ))}
      </div>

      {concentraciones.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6a5a44', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
          AUN NO HAY CONCENTRACIONES
        </div>
      )}

      <BotonInicio setPagina={setPagina} />
    </div>
  )
}