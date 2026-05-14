export default function BotonInicio({ setPagina }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 24px 60px' }}>
      <button onClick={() => setPagina('inicio')} style={{
        fontFamily: 'Georgia, serif',
        fontSize: '12px',
        letterSpacing: '3px',
        padding: '12px 32px',
        background: 'transparent',
        color: '#c8a96e',
        border: '1px solid #8B4513',
        cursor: 'pointer',
        textTransform: 'uppercase'
      }}>
        ← VOLVER AL INICIO
      </button>
    </div>
  )
}