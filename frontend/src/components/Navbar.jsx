import { useState } from 'react'

export default function Navbar({ pagina, setPagina, admin, cerrarSesion, setShowLogin }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'concentraciones', label: 'Concentraciones' },
    { id: 'museos', label: 'Museos' },
    { id: 'coches', label: 'Coches' },
    { id: 'motos', label: 'Motos' },
    { id: 'bicicletas', label: 'Bicis' },
    { id: 'juguetes', label: 'Juguetes' },
    { id: 'asistente', label: '🤖 IA' },
  ]

  const navegar = (id) => {
    setPagina(id)
    setMenuAbierto(false)
  }

  return (
    <>
      <nav style={{
        background: '#0e0c0a',
        borderBottom: '2px solid #8B4513',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 200
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => navegar('inicio')}>
          <img src="/logo.jpg" alt="Logo"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #8B4513', objectFit: 'cover' }} />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(13px, 3vw, 20px)', letterSpacing: '2px', color: '#c8a96e', fontWeight: 'bold' }}>
            CLÁSICOS SALAMANCA
          </span>
        </div>

        {/* Links escritorio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexWrap: 'wrap' }}
          className="nav-desktop">
          {links.map(link => (
            <button key={link.id} onClick={() => navegar(link.id)} style={{
              fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '1px',
              padding: '6px 8px', color: pagina === link.id ? '#c8a96e' : '#a89070',
              background: 'transparent', border: 'none',
              borderBottom: pagina === link.id ? '2px solid #8B4513' : '2px solid transparent',
              cursor: 'pointer', textTransform: 'uppercase'
            }}>
              {link.label}
            </button>
          ))}
          {admin ? (
            <button onClick={cerrarSesion} style={{
              fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '1px',
              padding: '6px 12px', color: '#c8a96e', background: '#1a1410',
              border: '1px solid #8B4513', cursor: 'pointer', marginLeft: '8px'
            }}>✓ SALIR</button>
          ) : (
            <button onClick={() => setShowLogin(true)} style={{
              fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '1px',
              padding: '6px 12px', color: '#6a5a44', background: 'transparent',
              border: '1px solid #2a2018', cursor: 'pointer', marginLeft: '8px'
            }}>🔒 ADMIN</button>
          )}
        </div>

        {/* Botón hamburguesa móvil */}
        <button onClick={() => setMenuAbierto(!menuAbierto)}
          className="nav-mobile"
          style={{
            background: 'transparent', border: '1px solid #3a2a18',
            color: '#c8a96e', fontSize: '22px', padding: '6px 10px',
            cursor: 'pointer', borderRadius: '4px'
          }}>
          {menuAbierto ? '✕' : '☰'}
        </button>
      </nav>

      {/* Menú desplegable móvil */}
      {menuAbierto && (
        <div className="nav-mobile" style={{
          position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
          background: '#0e0c0a', zIndex: 199, overflowY: 'auto',
          borderTop: '1px solid #3a2a18'
        }}>
          {links.map(link => (
            <button key={link.id} onClick={() => navegar(link.id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              fontFamily: 'Georgia, serif', fontSize: '16px', letterSpacing: '2px',
              padding: '18px 24px', color: pagina === link.id ? '#c8a96e' : '#a89070',
              background: pagina === link.id ? '#1a1410' : 'transparent',
              border: 'none', borderBottom: '1px solid #1a1410',
              cursor: 'pointer', textTransform: 'uppercase'
            }}>
              {link.label}
            </button>
          ))}
          <div style={{ padding: '16px 24px' }}>
            {admin ? (
              <button onClick={() => { cerrarSesion(); setMenuAbierto(false) }} style={{
                fontFamily: 'Georgia, serif', fontSize: '14px', letterSpacing: '1px',
                padding: '12px 24px', color: '#c8a96e', background: '#1a1410',
                border: '1px solid #8B4513', cursor: 'pointer', width: '100%'
              }}>✓ CERRAR SESIÓN</button>
            ) : (
              <button onClick={() => { setShowLogin(true); setMenuAbierto(false) }} style={{
                fontFamily: 'Georgia, serif', fontSize: '14px', letterSpacing: '1px',
                padding: '12px 24px', color: '#6a5a44', background: 'transparent',
                border: '1px solid #2a2018', cursor: 'pointer', width: '100%'
              }}>🔒 ADMIN</button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}