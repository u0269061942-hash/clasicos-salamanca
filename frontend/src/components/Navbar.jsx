export default function Navbar({ pagina, setPagina, admin, cerrarSesion, setShowLogin }) {
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

  return (
    <nav style={{
      background: '#0e0c0a',
      borderBottom: '2px solid #8B4513',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => setPagina('inicio')}>
        <img src="/logo.jpg" alt="Logo Clásicos Salamanca"
          style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #8B4513', objectFit: 'cover' }} />
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', letterSpacing: '3px', color: '#c8a96e', fontWeight: 'bold' }}>
          CLÁSICOS SALAMANCA
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexWrap: 'wrap' }}>
        {links.map(link => (
          <button key={link.id} onClick={() => setPagina(link.id)} style={{
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
          }}>
            ✓ SALIR
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)} style={{
            fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '1px',
            padding: '6px 12px', color: '#6a5a44', background: 'transparent',
            border: '1px solid #2a2018', cursor: 'pointer', marginLeft: '8px'
          }}>
            🔒 ADMIN
          </button>
        )}
      </div>
    </nav>
  )
}