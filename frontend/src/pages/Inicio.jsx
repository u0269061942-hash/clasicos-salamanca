export default function Inicio({ setPagina }) {
  return (
    <div>
      <div style={{
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img src="/portada.jpg" alt="Portada"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'sepia(60%) brightness(0.4) contrast(1.2)'
          }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,12,10,0.2), rgba(14,12,10,0.8))'
        }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <img src="/logo.jpg" alt="Logo"
            style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid #8B4513', objectFit: 'cover', marginBottom: '20px' }} />
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', letterSpacing: '6px', color: '#8B4513', marginBottom: '10px' }}>
            — SALAMANCA —
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '56px', letterSpacing: '8px', color: '#c8a96e', lineHeight: 1, marginBottom: '10px', fontWeight: 'bold' }}>
            CLÁSICOS
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', letterSpacing: '4px', color: '#e8dcc8', marginBottom: '20px' }}>
            Un grupo de amigos unidos por la pasión
          </div>
          <button onClick={() => setPagina('concentraciones')} style={{
            fontFamily: 'Georgia, serif',
            fontSize: '13px',
            letterSpacing: '3px',
            padding: '12px 32px',
            background: '#8B4513',
            color: '#e8dcc8',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}>Ver concentraciones</button>
        </div>
      </div>

      <div style={{ padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '28px', letterSpacing: '5px', color: '#c8a96e', fontWeight: 'bold' }}>
            NUESTRAS COLECCIONES
          </div>
          <div style={{ fontSize: '12px', color: '#6a5a44', letterSpacing: '2px', marginTop: '4px' }}>
            BASE DE DATOS DEL CLUB
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { id: 'coches', icon: '🚗', label: 'Coches clásicos' },
            { id: 'motos', icon: '🏍️', label: 'Motos clásicas' },
            { id: 'bicicletas', icon: '🚲', label: 'Bicis españolas' },
            { id: 'juguetes', icon: '🧸', label: 'Juguetes clásicos' },
          ].map(cat => (
            <div key={cat.id} onClick={() => setPagina(cat.id)} style={{
              background: '#120f0a',
              border: '1px solid #2a2018',
              padding: '24px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              borderBottom: '3px solid #8B4513'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>{cat.icon}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', letterSpacing: '2px', color: '#c8a96e', fontWeight: 'bold' }}>
                {cat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}