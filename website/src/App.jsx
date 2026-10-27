import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
// Foto profil wajah: Simpan foto kamu di website/src/assets/profile.jpg
import profilePhoto from './assets/profile.jpg'

const TYPING_PHRASES = [
  "Hello, World! I'm Ayub!",
  "Full Stack Developer",
  "Web3 & Blockchain Engineer",
  "ML & AI Enthusiast",
  "Cybersecurity Expert",
  "Moto Unstoppable Learner",
]

const FEATURED_PROJECTS = [
  {
    number: '01',
    name: 'Project Management App',
    type: 'WEB APPLICATION',
    role: 'Fullstack Developer',
    description:
      'A comprehensive project management system built for agile workflows, task tracking, and team collaboration with real-time updates.',
    stack: ['Laravel', 'React', 'MySQL', 'Tailwind'],
    status: 'FEATURED REPOSITORY',
    link: 'https://github.com/imanuelayubflabianos',
  },
  {
    number: '02',
    name: 'GuruKuu',
    type: 'WEB APPLICATION',
    role: 'Web Application Developer',
    description:
      'A web-based teacher evaluation and appreciation platform built to support transparent feedback, metrics, and school communities.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    status: 'FEATURED PROJECT',
    link: 'https://github.com/imanuelayubflabianos',
  },
  {
    number: '03',
    name: 'Compify',
    type: 'E-COMMERCE',
    role: 'Fullstack Developer',
    description:
      'An e-commerce platform for computer hardware, peripherals, and accessories with relational inventory databases and checkout.',
    stack: ['Laravel 10', 'MySQL', 'JavaScript'],
    status: 'WEB DEVELOPMENT',
    link: 'https://github.com/imanuelayubflabianos',
  },
]

const TECH_CATEGORIES = [
  {
    category: 'Languages',
    skills: ['C++', 'JavaScript', 'TypeScript', 'PHP', 'Python', 'Java', 'C#', 'Dart', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks & Libs',
    skills: ['Laravel', 'React', 'Node.js', 'Bootstrap', 'Flutter', 'Vite', '.NET'],
  },
  {
    category: 'Databases & DevOps',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Cloudflare', 'Linux'],
  },
  {
    category: 'Tools & Creative',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Photoshop', 'Premiere', 'Unity', 'Blender', 'Postman'],
  },
]

const ENGINEERING_FOCUS = [
  {
    area: 'Game Development',
    action: 'Make and Develop more Games.',
    tag: 'Unity / C#',
  },
  {
    area: 'Web Applications',
    action: 'Building scalable backends with Laravel & PHP.',
    tag: 'Laravel / PHP',
  },
  {
    area: 'Database Systems',
    action: 'Designing efficient MySQL schema & queries.',
    tag: 'MySQL / DB Schema',
  },
  {
    area: 'User Interface',
    action: 'Creating clean layouts via Figma & Bootstrap.',
    tag: 'Figma / UI/UX',
  },
  {
    area: 'IoT & Systems',
    action: 'Exploring device-to-cloud integration.',
    tag: 'Hardware / Cloud',
  },
]

function Typewriter({ words, speed = 80, delay = 1800 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullText = words[currentWordIndex]
    let timeout

    if (!isDeleting && currentText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), delay)
    } else if (isDeleting && currentText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 300)
    } else {
      timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        )
      }, isDeleting ? speed / 2 : speed)
    }

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay])

  return (
    <span className="typewriter-text">
      {currentText}
      <span className="typewriter-cursor">|</span>
    </span>
  )
}

/**
 * Komponen Cloudflare Turnstile CAPTCHA (Frontend Safe)
 * Menggunakan Site Key publik dan membersihkan widget saat unmount (kompatibel React StrictMode).
 */
function TurnstileWidget({ siteKey, theme, onVerify, onExpire, onError }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)

  useEffect(() => {
    let isMounted = true
    const SCRIPT_ID = 'cf-turnstile-script'
    const container = containerRef.current

    const renderWidget = () => {
      if (!isMounted || !container || !window.turnstile) return

      // Bersihkan widget sebelumnya jika sudah ada (mencegah duplikasi StrictMode)
      if (widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // ignore
        }
        widgetIdRef.current = null
      }

      container.innerHTML = ''

      try {
        const id = window.turnstile.render(container, {
          sitekey: siteKey,
          theme: theme === 'dark' ? 'dark' : 'light',
          action: 'contact-form',
          callback: (token) => {
            if (isMounted) onVerify(token)
          },
          'expired-callback': () => {
            if (isMounted) onExpire()
          },
          'error-callback': () => {
            if (isMounted) onError()
          },
        })
        widgetIdRef.current = id
      } catch (err) {
        console.error('Error rendering Cloudflare Turnstile:', err)
      }
    }

    let script = document.getElementById(SCRIPT_ID)

    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.turnstile) {
          window.turnstile.ready(renderWidget)
        }
      }
      document.head.appendChild(script)
    } else if (window.turnstile) {
      window.turnstile.ready(renderWidget)
    } else {
      script.addEventListener('load', () => {
        if (window.turnstile) {
          window.turnstile.ready(renderWidget)
        }
      })
    }

    return () => {
      isMounted = false
      if (widgetIdRef.current !== null && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // ignore
        }
        widgetIdRef.current = null
      }
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [siteKey, theme, onVerify, onExpire, onError])

  return <div ref={containerRef} className="turnstile-wrapper" />
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  const [activeLang, setActiveLang] = useState('id') // 'id' | 'en'
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [imgErrors, setImgErrors] = useState({})

  // Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [turnstileToken, setTurnstileToken] = useState('')
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error' | 'no-endpoint'
  const [formFeedback, setFormFeedback] = useState('')

  const emailAddress = 'imanuelayub0309@gmail.com'

  // Cloudflare Turnstile Configuration
  // 1x00000000000000000000AA adalah official Cloudflare test site key (selalu pass) jika VITE_TURNSTILE_SITE_KEY belum diisi
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || ''

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    } catch {
      window.prompt('Salin email:', emailAddress)
    }
  }

  const handleImgError = (key) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }))
  }

  // Turnstile Callbacks
  const handleTurnstileVerify = useCallback((token) => {
    setTurnstileToken(token)
    if (formStatus === 'error') {
      setFormStatus('idle')
      setFormFeedback('')
    }
  }, [formStatus])

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken('')
    setFormStatus('error')
    setFormFeedback('Verifikasi Turnstile kedaluwarsa. Silakan centang ulang CAPTCHA.')
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('')
    setFormStatus('error')
    setFormFeedback('Gagal memuat widget Cloudflare Turnstile. Pastikan koneksi internet stabil.')
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormFeedback('')

    // 1. Validasi Input Frontend
    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.subject.trim() ||
      !contactForm.message.trim()
    ) {
      setFormStatus('error')
      setFormFeedback('Mohon lengkapi semua kolom formulir (Nama, Email, Subjek, dan Pesan).')
      return
    }

    // 2. Validasi Token Turnstile
    if (!turnstileToken) {
      setFormStatus('error')
      setFormFeedback('Mohon selesaikan verifikasi Cloudflare Turnstile sebelum mengirim pesan.')
      return
    }

    // 3. Pemeriksaan Ketersediaan Backend Endpoint
    if (!contactEndpoint) {
      // Backend belum di-deploy: JANGAN berikan kesan palsu bahwa email sudah terkirim ke server!
      setFormStatus('no-endpoint')
      setFormFeedback(
        'Verifikasi CAPTCHA Turnstile berhasil! Namun endpoint API backend (VITE_CONTACT_ENDPOINT) belum dihubungkan. Klik tombol di bawah untuk melanjutkan pengiriman langsung via Gmail dengan pesan yang sudah terisi otomatis.'
      )
      return
    }

    // 4. Pengiriman ke Backend Serverless Sebenarnya
    setFormStatus('submitting')

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          turnstileToken,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (response.ok && result.success) {
        setFormStatus('success')
        setFormFeedback(result.message || 'Pesan Anda berhasil diverifikasi dan terkirim!')
        setContactForm({ name: '', email: '', subject: '', message: '' })
        setTurnstileToken('')
      } else {
        setFormStatus('error')
        setFormFeedback(
          result.error || 'Verifikasi server gagal. Silakan coba lagi atau kirim via email langsung.'
        )
      }
    } catch (err) {
      setFormStatus('error')
      setFormFeedback(
        `Gagal menghubungi server backend (${err.message}). Silakan kirim langsung melalui tautan email.`
      )
    }
  }

  return (
    <main className="main-wrapper">
      {/* Top Capsule Render Waving Banner */}
      <div className="capsule-banner-container">
        <img
          src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=Imanuel%20Ayub%20Flabianos&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Full%20Stack%20%7C%20Web3%20%7C%20AI%20%7C%20Cybersecurity&descAlignY=62&descAlign=50"
          alt="Imanuel Ayub Flabianos - Banner"
          className="capsule-banner-img"
          loading="eager"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">IA</span>
          <span>
            imanuel<span className="accent">.dev</span>
          </span>
        </a>

        <div className="nav-center-links">
          <a href="#about">About</a>
          <a href="#activity">Activity</a>
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#focus">Focus</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          {/* Dark / Light Mode Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <span className="theme-icon sun">☀️ Light</span>
            ) : (
              <span className="theme-icon moon">🌙 Dark</span>
            )}
          </button>

          <a href="#contact" className="nav-contact-btn">
            Connect ↗
          </a>
        </div>
      </nav>

      {/* Hero Section with Profile Face Photo & Typing Animation */}
      <section className="section hero-section" id="home">
        <div className="hero-card">
          <div className="profile-top-grid">
            {/* Foto Profil Wajah (bisa diganti dengan mengubah file website/src/assets/profile.jpg) */}
            <div className="profile-avatar-frame">
              <div className="avatar-glow" />
              <img
                src={profilePhoto}
                alt="Foto Profil Imanuel Ayub Flabianos"
                className="profile-avatar-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://github.com/imanuelayubflabianos.png'
                }}
              />
              <span className="avatar-status-pill" title="Status: Learning & Building">
                <span className="status-ping" />
                <span className="status-dot" />
                Active
              </span>
            </div>

            <div className="profile-info-content">
              <div className="hero-badges-row">
                <span className="badge badge-cyan">
                  <span className="badge-glow" />
                  BUILDERMAN
                </span>
                <span className="badge badge-purple">GRADE XI · PPLG</span>
                <span className="badge badge-pink">WNI · INDONESIA</span>
              </div>

              <h1 className="hero-title">
                Imanuel Ayub <span className="gradient-text">Flabianos</span>
              </h1>

              {/* Animated Typewriter Subtitle */}
              <div className="typewriter-box">
                <span className="typewriter-prefix">&gt;&nbsp;</span>
                <Typewriter words={TYPING_PHRASES} />
              </div>

              <p className="hero-bio-quote">
                <strong>@imanuelayubflabianos</strong> &mdash; <em>&ldquo;PERSONAL BRANDING ACCOUNT&rdquo;</em> iDiD |
                Software Dev, Programming, Data Analyst, IoT, UI/UX, and App Dev.
              </p>

              <div className="hero-cta-buttons">
                <a
                  className="button button-primary"
                  href="https://github.com/imanuelayubflabianos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub Profile ↗
                </a>

                <a className="button button-secondary" href="#projects">
                  Explore Work ↓
                </a>

                <button className="button button-accent" onClick={handleCopyEmail}>
                  {copiedEmail ? '✓ Email Copied!' : '✉ Copy Email'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Console / Terminal Hero Display (Responsive SVG from README) */}
        <div className="console-display-container">
          <div className="terminal-header-bar">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="terminal-title">
              imanuelayubflabianos@profile &mdash; ~/profile --live &bull; <span className="scanning-pulse">SCANNING</span>
            </div>
            <div className="terminal-badge">SYS.ONLINE</div>
          </div>

          <div className="console-svg-frame">
            <picture>
              <source
                media="(max-width: 760px)"
                srcSet={`${import.meta.env.BASE_URL}assets/hero/agent-console-e2124e67-mobile-${theme === 'light' ? 'light' : 'dark'}.svg`}
              />
              <img
                src={`${import.meta.env.BASE_URL}assets/hero/agent-console-e2124e67-${theme === 'light' ? 'light' : 'dark'}.svg`}
                alt="Imanuel Ayub Flabianos - Developer Console"
                className="console-vector-img"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* GitHub Activity & Statistics Section */}
      <section className="section activity-section" id="activity">
        <div className="section-heading">
          <div>
            <p className="eyebrow">METRICS & REPOSITORIES</p>
            <h2>
              📊 GitHub Activity <span className="gradient-text">Statistik.</span>
            </h2>
          </div>
          <p className="section-note">Live contributions, streak, and programming language analytics.</p>
        </div>

        <div className="activity-cards-grid">
          {/* GitHub Streak Stats Card */}
          <div className="activity-card streak-card">
            <div className="card-top-header">
              <span>🔥 Contribution Streak</span>
              <span className="card-badge">LIVE METRICS</span>
            </div>
            <div className="activity-media-box">
              {imgErrors['streak'] ? (
                <div className="activity-fallback-box">
                  <p>📊 Streak Stats dapat dilihat di profil GitHub.</p>
                  <a href="https://github.com/imanuelayubflabianos" target="_blank" rel="noopener noreferrer">
                    Buka GitHub Profile ↗
                  </a>
                </div>
              ) : (
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com?user=imanuelayubflabianos&theme=${
                    theme === 'dark' ? 'synthwave' : 'default'
                  }&hide_border=true&background=${theme === 'dark' ? '0d1117' : 'ffffff'}&ring=ff3366&fire=00f0ff&currStreakLabel=00f0ff`}
                  alt="GitHub Streak Stats"
                  className="activity-img"
                  loading="lazy"
                  onError={() => handleImgError('streak')}
                />
              )}
            </div>
          </div>

          {/* GitHub Profile Details Card */}
          <div className="activity-card profile-details-card">
            <div className="card-top-header">
              <span>📋 Profile Details</span>
              <span className="card-badge">GITHUB SUMMARY</span>
            </div>
            <div className="activity-media-box">
              {imgErrors['details'] ? (
                <div className="activity-fallback-box">
                  <p>📋 Profile Details dapat dilihat di profil GitHub.</p>
                  <a href="https://github.com/imanuelayubflabianos" target="_blank" rel="noopener noreferrer">
                    Buka GitHub Profile ↗
                  </a>
                </div>
              ) : (
                <img
                  src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=imanuelayubflabianos&theme=${
                    theme === 'dark' ? 'tokyonight' : 'default'
                  }`}
                  alt="GitHub Profile Details Summary"
                  className="activity-img"
                  loading="lazy"
                  onError={() => handleImgError('details')}
                />
              )}
            </div>
          </div>

          {/* Repos Per Language */}
          <div className="activity-card">
            <div className="card-top-header">
              <span>🍩 Top Languages by Repo</span>
              <span className="card-badge">REPOSITORIES</span>
            </div>
            <div className="activity-media-box">
              {imgErrors['reposLang'] ? (
                <div className="activity-fallback-box">
                  <p>🍩 Repos Per Language dapat dilihat di GitHub.</p>
                  <a href="https://github.com/imanuelayubflabianos" target="_blank" rel="noopener noreferrer">
                    Buka Repositori ↗
                  </a>
                </div>
              ) : (
                <img
                  src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=imanuelayubflabianos&theme=${
                    theme === 'dark' ? 'tokyonight' : 'default'
                  }`}
                  alt="Top Languages by Repo"
                  className="activity-img"
                  loading="lazy"
                  onError={() => handleImgError('reposLang')}
                />
              )}
            </div>
          </div>

          {/* Most Commit Language */}
          <div className="activity-card">
            <div className="card-top-header">
              <span>🍰 Top Languages by Commit</span>
              <span className="card-badge">COMMITS</span>
            </div>
            <div className="activity-media-box">
              {imgErrors['commitLang'] ? (
                <div className="activity-fallback-box">
                  <p>🍰 Commit Language Breakdown dapat dilihat di GitHub.</p>
                  <a href="https://github.com/imanuelayubflabianos" target="_blank" rel="noopener noreferrer">
                    Buka Repositori ↗
                  </a>
                </div>
              ) : (
                <img
                  src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=imanuelayubflabianos&theme=${
                    theme === 'dark' ? 'tokyonight' : 'default'
                  }`}
                  alt="Top Languages by Commit"
                  className="activity-img"
                  loading="lazy"
                  onError={() => handleImgError('commitLang')}
                />
              )}
            </div>
          </div>
        </div>

        {/* General GitHub Statistics */}
        <div className="activity-bottom-stats">
          <a
            href="https://github.com/imanuelayubflabianos"
            target="_blank"
            rel="noopener noreferrer"
            className="stats-link-card"
          >
            {imgErrors['stats'] ? (
              <div className="activity-fallback-box">
                <p>📈 Statistik Komit dan PR Lengkap di GitHub.</p>
              </div>
            ) : (
              <img
                src={`https://github-readme-stats-eight-theta.vercel.app/api?username=imanuelayubflabianos&show_icons=true&theme=${
                  theme === 'dark' ? 'github_dark' : 'default'
                }&bg_color=${theme === 'dark' ? '0d1117' : 'ffffff'}&title_color=58a6ff&icon_color=58a6ff&text_color=${
                  theme === 'dark' ? 'c9d1d9' : '24292f'
                }&border_color=21262d&hide_border=false&count_private=true`}
                alt="Imanuel Ayub Flabianos GitHub Stats"
                className="activity-img"
                loading="lazy"
                onError={() => handleImgError('stats')}
              />
            )}
          </a>
        </div>
      </section>

      {/* About Me Section (Bilingual Tabs: ID & EN) */}
      <section className="section about-section" id="about">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GET TO KNOW ME</p>
            <h2>
              🧑‍💻 About <span className="gradient-text">Me.</span>
            </h2>
          </div>
          <div className="lang-switcher">
            <button
              className={`lang-btn ${activeLang === 'id' ? 'active' : ''}`}
              onClick={() => setActiveLang('id')}
              aria-label="Tampilkan dalam Bahasa Indonesia"
            >
              🇮🇩 Bahasa Indonesia
            </button>
            <button
              className={`lang-btn ${activeLang === 'en' ? 'active' : ''}`}
              onClick={() => setActiveLang('en')}
              aria-label="Show in English"
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <div className="about-card-container">
          {activeLang === 'id' ? (
            <div className="about-text-content">
              <div className="about-lead">
                Halo! Saya <strong>Imanuel Ayub Flabianos</strong>, seorang <strong>Fullstack Developer</strong> dari Indonesia.
                Saat ini saya menempuh pendidikan di bidang <strong>Pengembangan Perangkat Lunak dan Gim (PPLG/RPL)</strong>.
              </div>
              <p>
                Saya passionate dalam membangun aplikasi web dan sistem yang fungsional, efisien, dan memiliki tampilan yang menarik.
                Fokus utama saya meliputi pengembangan <strong>Web &amp; System (Fullstack)</strong>, <strong>IoT</strong>,{' '}
                <strong>UI/UX Design</strong>, serta <strong>Database Architecture</strong>.
              </p>
              <p>
                Saat ini saya terus <strong>belajar dan membangun</strong> proyek-proyek baru untuk mengasah kemampuan dan menambah
                pengalaman di industri teknologi perangkat lunak modern.
              </p>
            </div>
          ) : (
            <div className="about-text-content">
              <div className="about-lead">
                Hello! I&apos;m <strong>Imanuel Ayub Flabianos</strong>, a <strong>Fullstack Developer</strong> from Indonesia.
                I&apos;m currently studying <strong>Software &amp; Game Development (PPLG/RPL)</strong>.
              </div>
              <p>
                I&apos;m passionate about building functional, efficient, and visually appealing web applications and systems. My
                main focus areas include <strong>Web &amp; System Development (Fullstack)</strong>, <strong>IoT</strong>,{' '}
                <strong>UI/UX Design</strong>, and <strong>Database Architecture</strong>.
              </p>
              <p>
                I&apos;m constantly <strong>learning and building</strong> new projects to sharpen my skills and gain valuable
                practical software engineering experience.
              </p>
            </div>
          )}

          <div className="about-badges-footer">
            <span className="badge badge-outline">🔗 GitHub: @imanuelayubflabianos</span>
            <span className="badge badge-outline">⚡ Status: Learning &amp; Building</span>
            <span className="badge badge-outline">📍 Location: Indonesia (WNI)</span>
          </div>
        </div>
      </section>

      {/* Featured Projects / Repositories Section */}
      <section className="section projects-section" id="projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SHOWCASE & WORK</p>
            <h2>
              🚀 Featured <span className="gradient-text">Repository.</span>
            </h2>
          </div>
          <p className="section-note">Selected software engineering projects and applications.</p>
        </div>

        <div className="project-grid">
          {FEATURED_PROJECTS.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-top">
                <span className="project-number">{project.number} / 03</span>
                <span className="project-arrow">↗</span>
              </div>
              <p className="project-type">{project.type}</p>
              <h3>{project.name}</h3>
              <p className="project-role">
                <strong>Role:</strong> {project.role}
              </p>
              <p className="project-description">{project.description}</p>
              <div className="tag-list">
                {project.stack.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="project-bottom">
                <span className="project-status-label">{project.status}</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  title={`Buka repositori ${project.name} di GitHub`}
                >
                  View Repository ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tech Stack Section (Skillicons Banner + Categorized Grid) */}
      <section className="section stack-section" id="stack">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TOOLS OF THE TRADE</p>
            <h2>
              🛠️ Tech <span className="gradient-text">Stack.</span>
            </h2>
          </div>
          <p className="section-note">Languages, frameworks, tools, and platforms I work with.</p>
        </div>

        {/* Skillicons Dev Banner matching README */}
        <div className="skillicons-container">
          <a href="https://skillicons.dev" target="_blank" rel="noopener noreferrer">
            <img
              src={`https://skillicons.dev/icons?i=cpp,windows,discord,ai,ps,pr,ae,figma,gitlab,vscode,html,nodejs,js,vite,py,css,git,github,dotnet,java,mysql,postgres,docker,php,laravel,bootstrap,react,wordpress,dart,flutter,androidstudio,unity,blender,cs,mongodb,postman,aws,cloudflare,linux&theme=${
                theme === 'dark' ? 'dark' : 'light'
              }`}
              alt="Imanuel Tech Stack Skillicons"
              className="skillicons-banner-img"
              loading="lazy"
            />
          </a>
        </div>

        {/* Categorized Stack Grid */}
        <div className="tech-categories-grid">
          {TECH_CATEGORIES.map((cat) => (
            <div className="tech-cat-card" key={cat.category}>
              <h4>{cat.category}</h4>
              <div className="tech-pill-list">
                {cat.skills.map((skill) => (
                  <span className="tech-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Focus Section */}
      <section className="section focus-section" id="focus">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CORE CAPABILITIES</p>
            <h2>
              📈 Engineering <span className="gradient-text">Focus.</span>
            </h2>
          </div>
          <p className="section-note">Key technical disciplines and development goals.</p>
        </div>

        <div className="focus-grid">
          {ENGINEERING_FOCUS.map((item, index) => (
            <div className="focus-card" key={item.area}>
              <div className="focus-card-header">
                <span className="focus-index">0{index + 1}</span>
                <span className="focus-tag">{item.tag}</span>
              </div>
              <h3 className="focus-title">[{item.area}]</h3>
              <p className="focus-action">
                <span className="focus-arrow">──►</span> {item.action}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Favorites & Gear Section */}
      <section className="section favorites-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BEYOND THE CODE</p>
            <h2>
              ⭐ My Absolute <span className="gradient-text">Favorites.</span>
            </h2>
          </div>
        </div>

        <div className="favorites-list-card">
          <ul className="favorites-bullets">
            <li>
              <span className="bullet-icon">💻</span>
              <span>I love exploring new tech stacks and building cool stuffs, and playing Music</span>
            </li>
            <li>
              <span className="bullet-icon">📰</span>
              <span>Reading &amp; writing tech blogs whenever possible.</span>
            </li>
            <li>
              <span className="bullet-icon">🍕</span>
              <span>Meetups &amp; Tech events.</span>
            </li>
          </ul>

          {/* Collapsible Gear Details */}
          <div className="gear-accordion">
            <button
              className="gear-toggle-btn"
              onClick={() => setIsDetailsOpen((prev) => !prev)}
              aria-expanded={isDetailsOpen}
            >
              <span>⚙️ Things I use to get stuff done</span>
              <span className="accordion-arrow">{isDetailsOpen ? '▲' : '▼'}</span>
            </button>

            {isDetailsOpen && (
              <div className="gear-content-box">
                <div className="gear-item">
                  <strong>OS:</strong> Windows, Linux
                </div>
                <div className="gear-item">
                  <strong>Laptop:</strong> Advan Workpro Lite (i3 12th gen)
                </div>
                <div className="gear-item">
                  <strong>Code Editor:</strong> VSCode - The best editor out there.
                </div>
                <div className="gear-item">
                  <strong>Stay Updated:</strong> LinkedIn, GitHub, and more.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section with Cloudflare Turnstile Protected Form */}
      <section className="section contact-section" id="contact">
        <div className="contact-box">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>
            Let&apos;s build something <span className="gradient-text">meaningful.</span>
          </h2>
          <p className="contact-description">
            Tertarik untuk berkolaborasi, mendiskusikan proyek web, atau konsultasi teknis? Kirim pesan melalui formulir
            aman di bawah ini (dilindungi oleh Cloudflare Turnstile) atau hubungi langsung via email dan media profesional.
          </p>

          <div className="contact-email-badge">
            <span className="email-label">Direct Gmail:</span>
            <code className="email-code">{emailAddress}</code>
            <button
              className="copy-badge-btn"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              title="Copy email address"
            >
              {copiedEmail ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>

          {/* Interactive Secure Contact Form with Cloudflare Turnstile */}
          <form className="contact-form-card" onSubmit={handleFormSubmit} noValidate>
            <div className="form-header">
              <h3>✉️ Kirim Pesan Langsung</h3>
              <span className="form-badge-security">🛡️ Turnstile Protected</span>
            </div>

            <div className="form-grid-two">
              <div className="form-field">
                <label htmlFor="contact-name">
                  Nama Lengkap <span className="field-required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  placeholder="Nama Anda"
                  maxLength={100}
                  required
                  disabled={formStatus === 'submitting'}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">
                  Alamat Email <span className="field-required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  placeholder="email@domain.com"
                  maxLength={100}
                  required
                  disabled={formStatus === 'submitting'}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">
                Subjek Pesan <span className="field-required">*</span>
              </label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                placeholder="Topik proyek atau pertanyaan..."
                maxLength={150}
                required
                disabled={formStatus === 'submitting'}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">
                Isi Pesan <span className="field-required">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={contactForm.message}
                onChange={handleInputChange}
                placeholder="Ceritakan detail proyek atau pertanyaan Anda..."
                maxLength={2000}
                required
                disabled={formStatus === 'submitting'}
              />
              <span className="char-count">{contactForm.message.length} / 2000</span>
            </div>

            {/* Cloudflare Turnstile Widget */}
            <div className="turnstile-section">
              <div className="turnstile-info-label">
                <span>Verifikasi Keamanan Manusia:</span>
              </div>
              <TurnstileWidget
                siteKey={turnstileSiteKey}
                theme={theme}
                onVerify={handleTurnstileVerify}
                onExpire={handleTurnstileExpire}
                onError={handleTurnstileError}
              />
            </div>

            {/* Status Feedback Banners */}
            {formFeedback && (
              <div className={`form-feedback-banner ${formStatus}`}>
                <p>{formFeedback}</p>
                {formStatus === 'no-endpoint' && (
                  <div className="fallback-action-wrap">
                    <a
                      href={`mailto:${emailAddress}?subject=${encodeURIComponent(
                        contactForm.subject || 'Portfolio Inquiry'
                      )}&body=${encodeURIComponent(
                        `Nama: ${contactForm.name}\nEmail: ${contactForm.email}\n\nPesan:\n${contactForm.message}`
                      )}`}
                      className="button button-primary fallback-btn"
                    >
                      ✉ Lanjutkan Kirim via Gmail Client ↗
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="form-actions-row">
              <button
                type="submit"
                className="button button-primary submit-btn"
                disabled={formStatus === 'submitting' || !turnstileToken}
              >
                {formStatus === 'submitting' ? 'Mengirim...' : 'Kirim Pesan Sekarang ↗'}
              </button>
            </div>
          </form>

          {/* Quick Direct Links */}
          <div className="contact-action-buttons">
            <a
              className="button button-secondary"
              href={`mailto:${emailAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ✉ Direct Gmail ↗
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/imanuelayubflabianos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on GitHub ↗
            </a>
            <a
              className="button button-outline"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Profil LinkedIn Imanuel Ayub Flabianos (Placeholder)"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">IA</span>
          <span>
            imanuel<span className="accent">.dev</span>
          </span>
        </a>

        <div className="footer-credits">
          <span>Built with ❤️ by <strong>Imanuel Ayub Flabianos</strong> | © 2026</span>
          <div className="footer-views">
            <img
              src="https://komarev.com/ghpvc/?username=imanuelayubflabianos&color=00f0ff&style=for-the-badge&label=PROFILE+VIEWS"
              alt="Profile Views Counter"
              className="profile-views-badge"
              loading="lazy"
            />
          </div>
        </div>

        <a href="#home" className="back-to-top-btn">
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  )
}

export default App
