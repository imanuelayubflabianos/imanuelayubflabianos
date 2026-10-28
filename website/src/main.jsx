import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class RootErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled runtime error caught by RootErrorBoundary:', error, errorInfo)
  }

  handleReload = () => {
    try {
      localStorage.removeItem('portfolio-theme')
    } catch {
      // ignore
    }
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080a12',
          color: '#f8fafc',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '560px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '32px 24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#49e6e0' }}>
              ⚠️ Terjadi Kendala Tampilan
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>
              Aplikasi mendeteksi error pada browser atau script pihak ketiga:
            </p>
            <pre style={{
              background: '#0b0f1d',
              padding: '12px 16px',
              borderRadius: '8px',
              color: '#ef4444',
              fontSize: '0.82rem',
              overflowX: 'auto',
              textAlign: 'left',
              marginBottom: '24px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              {this.state.error?.message || 'Unknown runtime error'}
            </pre>
            <button
              onClick={this.handleReload}
              style={{
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              🔄 Muat Ulang Halaman
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
)

