export default function Footer() {
  return (
    <footer style={{
      background: '#0e0c0a',
      borderTop: '2px solid #8B4513',
      padding: '24px 40px',
      marginTop: '40px'
    }}>
      {/* Logo y nombre */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
        <img src="/logo-clasicos.jpeg" alt="Clásicos Salamanca"
          style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #8B4513', objectFit: 'cover' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', letterSpacing: '3px', color: '#c8a96e', fontWeight: 'bold' }}>CLÁSICOS SALAMANCA</div>
          <div style={{ fontSize: '11px', color: '#6a5a44', letterSpacing: '2px', marginTop: '4px' }}>PRESERVANDO LA HISTORIA DEL AUTOMÓVIL</div>
        </div>
      </div>

      {/* Patrocinadores */}
      <div style={{ borderTop: '1px solid #2a2018', paddingTop: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '10px', color: '#6a5a44', letterSpacing: '3px', marginBottom: '16px' }}>PATROCINADORES</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
          <img src="/patrocinador-taxi.jpeg" alt="Taxi Beni Vitigudino"
            style={{ height: '80px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(200,169,110,0.2))' }} />
          <img src="/patrocinador-agua.jpeg" alt="GotaGota"
            style={{ height: '80px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(200,169,110,0.2))' }} />
        </div>
      </div>
    </footer>
  )
}