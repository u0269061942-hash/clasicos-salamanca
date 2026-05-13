import { useState, useRef, useEffect } from 'react'

const BIENVENIDA = '¡Bienvenido a Clásicos Salamanca! Soy tu asistente experto en vehículos clásicos. Puedo ayudarte con historia, mecánica, valoraciones, restauración y mucho más. ¿Qué quieres saber?'

export default function Asistente() {
  const [mensajes, setMensajes] = useState([{ role: 'assistant', content: BIENVENIDA }])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const limpiar = () => {
    setMensajes([{ role: 'assistant', content: BIENVENIDA }])
    setInput('')
  }

  const enviar = async () => {
    if (!input.trim() || cargando) return
    const texto = input.trim()
    setInput('')
    const nuevosMensajes = [...mensajes, { role: 'user', content: texto }]
    setMensajes(nuevosMensajes)
    setCargando(true)
    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensajes: nuevosMensajes.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()
      setMensajes([...nuevosMensajes, { role: 'assistant', content: data.respuesta }])
    } catch {
      setMensajes([...nuevosMensajes, { role: 'assistant', content: 'Error al conectar con el asistente. Inténtalo de nuevo.' }])
    }
    setCargando(false)
  }

  const sugerencias = [
    '¿Cuánto vale un SEAT 600 en buen estado?',
    '¿Qué motor llevaba el Porsche 356?',
    'Historia de la Bultaco Sherpa T',
    '¿Cuál es la moto española más coleccionable?',
    'Diferencias entre Vespa y Lambretta',
    '¿Qué juguetes españoles son más raros?'
  ]

  return (
    <div style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', letterSpacing: '5px', color: '#c8a96e', fontWeight: 'bold' }}>ASISTENTE IA</h1>
        <p style={{ color: '#6a5a44', letterSpacing: '2px', fontSize: '12px' }}>EXPERTO EN VEHÍCULOS Y JUGUETES CLÁSICOS</p>
      </div>

      <div style={{ background: '#120f0a', border: '1px solid #2a2018', marginBottom: '16px' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #2a2018', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B6D11' }}></div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#c8a96e', letterSpacing: '2px' }}>CLAUDE — EXPERTO EN CLÁSICOS</span>
          <button onClick={limpiar} style={{ marginLeft: 'auto', fontSize: '11px', padding: '4px 14px', background: 'transparent', border: '1px solid #3a2e22', color: '#6a5a44', cursor: 'pointer', fontFamily: 'Georgia, serif', letterSpacing: '1px' }}>
            LIMPIAR
          </button>
        </div>

        <div style={{ height: '420px', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mensajes.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%',
                padding: '12px 16px',
                background: msg.role === 'user' ? '#8B4513' : '#1a1410',
                border: msg.role === 'user' ? 'none' : '1px solid #2a2018',
                color: msg.role === 'user' ? '#e8dcc8' : '#c8a96e',
                fontFamily: 'Georgia, serif',
                fontSize: '13px',
                lineHeight: '1.6',
                borderRadius: msg.role === 'user' ? '8px 8px 0 8px' : '8px 8px 8px 0'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {cargando && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '12px 16px', background: '#1a1410', border: '1px solid #2a2018', color: '#6a5a44', fontFamily: 'Georgia, serif', fontSize: '13px', borderRadius: '8px 8px 8px 0' }}>
                Escribiendo...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: '12px 16px', borderTop: '1px solid #2a2018', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enviar()}
            placeholder="Pregunta sobre cualquier clásico..."
            style={{ flex: 1, padding: '10px 14px', background: '#1a1410', border: '1px solid #3a2e22', color: '#e8dcc8', fontFamily: 'Georgia, serif', fontSize: '13px' }}
          />
          <button onClick={enviar} disabled={cargando} style={{ padding: '10px 20px', background: cargando ? '#3a2e22' : '#8B4513', color: '#e8dcc8', border: 'none', fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', cursor: cargando ? 'wait' : 'pointer' }}>
            ENVIAR
          </button>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '11px', color: '#6a5a44', letterSpacing: '2px', marginBottom: '10px' }}>SUGERENCIAS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {sugerencias.map((s, i) => (
            <button key={i} onClick={() => setInput(s)} style={{
              fontSize: '12px', padding: '6px 12px',
              background: 'transparent', border: '1px solid #2a2018',
              color: '#a89070', cursor: 'pointer', fontFamily: 'Georgia, serif'
            }}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}