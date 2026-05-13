import { useState } from 'react'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Eventos from './pages/Eventos'
import Concentraciones from './pages/Concentraciones'
import Museos from './pages/Museos'
import Coches from './pages/Coches'
import Motos from './pages/Motos'
import Bicicletas from './pages/Bicicletas'
import Juguetes from './pages/Juguetes'
import Asistente from './pages/Asistente'
import Footer from './components/Footer'

function App() {
  const [pagina, setPagina] = useState('inicio')
  const [admin, setAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const login = async () => {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    const data = await res.json()
    if (data.ok) {
      setAdmin(true)
      setShowLogin(false)
      setPassword('')
      setError('')
    } else {
      setPassword('')
      setError('Contraseña incorrecta')
    }
  }

  const cerrarSesion = () => {
    setAdmin(false)
    setPassword('')
    setError('')
  }

  return (
    <div style={{ background: '#0e0c0a', minHeight: '100vh', color: '#e8dcc8' }}>
      <Navbar pagina={pagina} setPagina={setPagina} admin={admin} cerrarSesion={cerrarSesion} setShowLogin={setShowLogin} />
      {showLogin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#120f0a', border: '2px solid #8B4513', padding: '40px', minWidth: '320px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '22px', letterSpacing: '4px', color: '#c8a96e', marginBottom: '8px' }}>ZONA ADMIN</div>
            <div style={{ fontSize: '12px', color: '#6a5a44', letterSpacing: '2px', marginBottom: '24px' }}>ACCESO RESTRINGIDO</div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              style={{ width: '100%', padding: '10px', background: '#1a1410', border: '1px solid #3a2e22', color: '#e8dcc8', fontFamily: 'Georgia, serif', fontSize: '14px', marginBottom: '12px', textAlign: 'center' }}
            />
            {error && <div style={{ color: '#c0392b', fontSize: '12px', marginBottom: '12px' }}>{error}</div>}
            <button onClick={login} style={{ width: '100%', padding: '10px', background: '#8B4513', color: '#e8dcc8', border: 'none', fontFamily: 'Georgia, serif', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer', marginBottom: '8px' }}>
              ENTRAR
            </button>
            <button onClick={() => { setShowLogin(false); setPassword(''); setError('') }} style={{ width: '100%', padding: '8px', background: 'transparent', color: '#6a5a44', border: '1px solid #2a2018', fontFamily: 'Georgia, serif', fontSize: '12px', cursor: 'pointer' }}>
              CANCELAR
            </button>
          </div>
        </div>
      )}
      {pagina === 'inicio' && <Inicio setPagina={setPagina} />}
      {pagina === 'eventos' && <Eventos admin={admin} />}
      {pagina === 'concentraciones' && <Concentraciones admin={admin} />}
      {pagina === 'museos' && <Museos admin={admin} />}
      {pagina === 'coches' && <Coches admin={admin} />}
      {pagina === 'motos' && <Motos admin={admin} />}
      {pagina === 'bicicletas' && <Bicicletas admin={admin} />}
      {pagina === 'juguetes' && <Juguetes admin={admin} />}
      {pagina === 'asistente' && <Asistente />}
      <Footer />
    </div>
  )
}

export default App