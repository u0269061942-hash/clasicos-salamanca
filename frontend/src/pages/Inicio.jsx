export default function Inicio({ setPagina }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        position: 'relative',
        height: 'clamp(320px, 60vw, 500px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img src="/portada.jpg" alt="Portada"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'sepia(60%) brightness(0.4) contrast(1.2)'
          }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,12,10,0.2), rgba(14,12,10,0.8))'
        }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 16px' }}>
          <img src="/logo.jpg" alt="Logo"
            style={{
              width: 'clamp(80px, 20vw, 120px)',
              height: 'clamp(80px, 20vw, 120px)',
              borderRadius: '50%', border: '3px solid #8B4513',
              objectFit: 'cover', marginBottom: '16px'
            }} />
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(11px, 2.5vw, 16px)', letterSpacing: '4px', color: '#8B4513', marginBottom: '8px' }}>
            — SALAMANCA —
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 10vw, 56px)', letterSpacing: '6px', color: '#c8a96e', lineHeight: 1, marginBottom: '8px', fontWeight: 'bold' }}>
            CLÁSICOS
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(13px, 3vw, 18px)', letterSpacing: '2px', color: '#e8dcc8', marginBottom: '20px' }}>
            Un grupo de amigos unidos por la pasión
          </div>
          <button onClick={() => setPagina('concentraciones')} style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            letterSpacing: '2px',
            padding: 'clamp(10px, 2vw, 12px) clamp(20px, 5vw, 32px)',
            background: '#8B4513',
            color: '#e8dcc8',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}>Ver concentraciones</button>
        </div>
      </div>

      {/* Colecciones */}
      <div style={{ padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(20px, 5vw, 28px)', letterSpacing: '4px', color: '#c8a96e', fontWeight: 'bold' }}>
            NUESTRAS COLECCIONES
          </div>
          <div style={{ fontSize: '12px', color: '#6a5a44', letterSpacing: '2px', marginTop: '4px' }}>
            BASE DE DATOS DEL CLUB
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            { id: 'coches', icon: '🚗', label: 'Coches clásicos' },
            { id: 'motos', icon: '🏍️', label: 'Motos clásicas' },
            { id: 'bicicletas', icon: '🚲', label: 'Bicis españolas' },
            { id: 'juguetes', icon: '🧸', label: 'Juguetes clásicos' },
          ].map(cat => (
            <div key={cat.id} onClick={() => setPagina(cat.id)} style={{
              background: '#120f0a',
              border: '1px solid #2a2018',
              padding: 'clamp(16px, 4vw, 24px) 16px',
              textAlign: 'center',
              cursor: 'pointer',
              borderBottom: '3px solid #8B4513'
            }}>
              <div style={{ fontSize: 'clamp(28px, 7vw, 36px)', marginBottom: '8px' }}>{cat.icon}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(11px, 2.5vw, 14px)', letterSpacing: '1px', color: '#c8a96e', fontWeight: 'bold' }}>
                {cat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}