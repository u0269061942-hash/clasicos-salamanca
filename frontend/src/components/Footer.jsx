export default function Footer() {
  return (
    <footer style={{
      background: '#0e0c0a',
      borderTop: '2px solid #8B4513',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '40px'
    }}>
      <img src="/logo-clasicos.jpeg" alt="Clásicos Salamanca"
        style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #8B4513', objectFit: 'cover' }} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', letterSpacing: '3px', color: '#c8a96e', fontWeight: 'bold' }}>CLÁSICOS SALAMANCA</div>
        <div style={{ fontSize: '11px', color: '#6a5a44', letterSpacing: '2px', marginTop: '4px' }}>PRESERVANDO LA HISTORIA DEL AUTOMÓVIL</div>
      </div>
    </footer>
  )
}
