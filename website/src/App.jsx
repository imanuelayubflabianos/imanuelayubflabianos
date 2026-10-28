import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { TURNSTILE_SITE_KEY, CONTACT_ENDPOINT, WEB3FORMS_ACCESS_KEY } from './config.js'
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

// Fallback Repositories jika GitHub API sedang rate-limit atau offline
const FALLBACK_PROJECTS = [
  {
    id: 1,
    name: 'GuruKuu',
    html_url: 'https://github.com/imanuelayubflabianos/GuruKuu',
    description:
      'Wadah aspirasi dan evaluasi kinerja guru berbasis web untuk penilaian transparan dan kemajuan pembelajaran siswa.',
    language: 'PHP / Blade',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: '2026-10-27T07:22:17Z',
  },
  {
    id: 2,
    name: 'Penjaga-Pusaka-Nusantara-Indonesia-minigame',
    html_url: 'https://github.com/imanuelayubflabianos/Penjaga-Pusaka-Nusantara-Indonesia-minigame',
    description:
      'Proyek minigame interaktif bertema pelestarian pusaka dan budaya nusantara Indonesia.',
    language: 'JavaScript / Game',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-09-22T15:12:23Z',
  },
  {
    id: 3,
    name: 'Timer-sederhana-Simple-timer-',
    html_url: 'https://github.com/imanuelayubflabianos/Timer-sederhana-Simple-timer-',
    description:
      'Aplikasi web timer dan stopwatch sederhana dengan antarmuka yang bersih dan mudah digunakan.',
    language: 'HTML / JS',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-09-09T14:12:23Z',
  },
  {
    id: 4,
    name: 'Compify',
    html_url: 'https://github.com/imanuelayubflabianos',
    description:
      'Platform e-commerce perangkat keras komputer dengan arsitektur database relasional dan modern checkout flow.',
    language: 'Laravel 10 / MySQL',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-08-15T10:00:00Z',
  },
]

const TECH_CATEGORIES = [
  {
    category: 'Languages',
    skills: ['C++', 'C#', 'JavaScript', 'TypeScript', 'PHP', 'Python', 'Java', 'Dart', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks & Libs',
    skills: ['Laravel', 'React', 'Node.js', 'Vite', 'Flutter', 'Bootstrap', '.NET', 'WordPress'],
  },
  {
    category: 'Databases & DevOps',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Cloudflare', 'Linux', 'Windows'],
  },
  {
    category: 'Tools & Creative',
    skills: [
      'VS Code',
      'Android Studio',
      'Git',
      'GitHub',
      'GitLab',
      'Figma',
      'Photoshop',
      'Illustrator',
      'Premiere',
      'After Effects',
      'Unity',
      'Blender',
      'Postman',
      'Discord',
    ],
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
 * Komponen Cloudflare Turnstile CAPTCHA (Frontend Safe & Robust)
 * Menggunakan theme auto dan polling siap pakai agar langsung tampil saat script dimuat.
 */
function TurnstileWidget({ siteKey, onVerify, onExpire, onError }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const onVerifyRef = useRef(onVerify)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onVerifyRef.current = onVerify
    onExpireRef.current = onExpire
    onErrorRef.current = onError
  }, [onVerify, onExpire, onError])

  useEffect(() => {
    let isMounted = true
    const container = containerRef.current
    if (!container) return

    const renderWidget = () => {
      if (!isMounted || !container || !window.turnstile) return

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
          theme: 'auto',
          action: 'contact-form',
          callback: (token) => {
            if (isMounted && onVerifyRef.current) onVerifyRef.current(token)
          },
          'expired-callback': () => {
            if (isMounted && onExpireRef.current) onExpireRef.current()
          },
          'error-callback': () => {
            if (isMounted && onErrorRef.current) onErrorRef.current()
          },
        })
        widgetIdRef.current = id
      } catch (err) {
        console.warn('Turnstile render notice:', err)
      }
    }

    let pollInterval = null

    if (window.turnstile && typeof window.turnstile.render === 'function') {
      try {
        renderWidget()
      } catch (err) {
        console.warn('Turnstile direct render notice:', err)
      }
    } else {
      pollInterval = setInterval(() => {
        if (window.turnstile && typeof window.turnstile.render === 'function') {
          clearInterval(pollInterval)
          pollInterval = null
          try {
            renderWidget()
          } catch (err) {
            console.warn('Turnstile delayed render notice:', err)
          }
        }
      }, 120)
    }

    return () => {
      isMounted = false
      if (pollInterval) clearInterval(pollInterval)
      if (widgetIdRef.current !== null && window.turnstile && typeof window.turnstile.remove === 'function') {
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
  }, [siteKey])

  return <div ref={containerRef} className="turnstile-wrapper" />
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('portfolio-theme') : null
      if (saved === 'dark' || saved === 'light') return saved
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    } catch {
      // safe fallback
    }
    return 'dark'
  })

  const [activeLang, setActiveLang] = useState('id') // 'id' | 'en'
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [imgErrors, setImgErrors] = useState({})

  // Dynamic GitHub Repositories State
  const [githubRepos, setGithubRepos] = useState(FALLBACK_PROJECTS)
  const [isReposLoading, setIsReposLoading] = useState(true)

  // Form State & Anti-Spam Cooldown (3 Menit Jeda Antar Pengiriman)
  const COOLDOWN_SECONDS = 180
  const [cooldownRemaining, setCooldownRemaining] = useState(() => {
    try {
      const lastSent = typeof window !== 'undefined' ? localStorage.getItem('portfolio_contact_last_sent') : null
      if (lastSent) {
        const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000)
        if (elapsed < 180) {
          return 180 - elapsed
        }
      }
    } catch {
      // safe fallback
    }
    return 0
  })

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [turnstileToken, setTurnstileToken] = useState('')
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error' | 'no-endpoint'
  const [formFeedback, setFormFeedback] = useState('')

  // Live Timer Countdown untuk Anti-Spam Cooldown
  useEffect(() => {
    if (cooldownRemaining <= 0) return

    const intervalId = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [cooldownRemaining])

  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const emailAddress = 'imanuelayub0309@gmail.com'
  const linkedInUrl = 'https://www.linkedin.com/in/imanuel-ayub-flabianos-425595347/'
  const gitHubUrl = 'https://github.com/imanuelayubflabianos'

  // Cloudflare Turnstile & Backend Configuration (Bisa diatur di website/src/config.js atau .env)
  const turnstileSiteKey = TURNSTILE_SITE_KEY
  const contactEndpoint = CONTACT_ENDPOINT

  // Sinkronisasi Theme ke HTML dan Body
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      if (document.body) {
        document.body.setAttribute('data-theme', theme)
      }
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // safe fallback for restricted browser storage
    }
  }, [theme])

  // Deteksi Otomatis Repositori Terbaru & Terpopuler dari Akun GitHub Pengguna
  useEffect(() => {
    let isCancelled = false

    fetch('https://api.github.com/users/imanuelayubflabianos/repos?sort=updated&per_page=100')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API response not ok')
        return res.json()
      })
      .then((data) => {
        if (isCancelled || !Array.isArray(data)) return

        // Filter: kecualikan repo fork dan repo profil khusus jika diperlukan
        const filtered = data.filter((repo) => !repo.fork)

        // Urutkan berdasarkan popularitas (stars) tertinggi terlebih dahulu, lalu aktivitas terbaru
        filtered.sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })

        if (filtered.length > 0) {
          setGithubRepos(filtered.slice(0, 4))
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat repositori GitHub live, menggunakan data lokal:', err.message)
      })
      .finally(() => {
        if (!isCancelled) setIsReposLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [])

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
    setFormStatus((prev) => (prev === 'error' ? 'idle' : prev))
    setFormFeedback('')
  }, [])

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken('')
    setFormStatus('error')
    setFormFeedback('Verifikasi Turnstile kedaluwarsa. Silakan centang ulang CAPTCHA.')
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('')
    setFormStatus('error')
    setFormFeedback('Widget Turnstile memerlukan koneksi internet untuk memverifikasi CAPTCHA.')
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormFeedback('')

    if (cooldownRemaining > 0) {
      setFormStatus('error')
      setFormFeedback(
        `Fitur perlindungan anti-spam aktif: Mohon tunggu ${formatCooldown(
          cooldownRemaining
        )} sebelum dapat mengirim pesan berikutnya.`
      )
      return
    }

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

    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

    if (!turnstileToken && !isLocalhost) {
      setFormStatus('error')
      setFormFeedback('Mohon selesaikan verifikasi Cloudflare Turnstile sebelum mengirim.')
      return
    }

    if (!contactEndpoint) {
      setFormStatus('no-endpoint')
      setFormFeedback(
        'Verifikasi berhasil! Namun endpoint pengiriman belum diatur. Klik tombol di bawah untuk membuka aplikasi Gmail dengan pesan yang sudah terisi otomatis.'
      )
      return
    }

    setFormStatus('submitting')

    try {
      const payload = {
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        subject: contactForm.subject.trim(),
        message: contactForm.message.trim(),
        from_name: `${contactForm.name.trim()} (Portfolio Form)`,
      }

      if (WEB3FORMS_ACCESS_KEY && contactEndpoint.includes('web3forms')) {
        payload.access_key = WEB3FORMS_ACCESS_KEY
        // Web3Forms Free plan melarang pengiriman field 'cf-turnstile-response' (fitur Pro).
        // Turnstile tetap memvalidasi manusia di browser, lalu dikirim via Web3Forms gratis.
      } else if (turnstileToken) {
        // Hanya dikirim ke backend mandiri (Cloudflare Worker)
        payload.turnstileToken = turnstileToken
        payload['cf-turnstile-response'] = turnstileToken
      }

      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => ({}))

      if (response.ok && result.success) {
        setFormStatus('success')
        setFormFeedback(
          result.message ||
            'Pesan Anda berhasil dikirim langsung ke Gmail Imanuel Ayub! Silakan tunggu sejenak jika ingin mengirim pesan lagi.'
        )
        setContactForm({ name: '', email: '', subject: '', message: '' })
        setTurnstileToken('')

        // Aktifkan cooldown anti-spam (3 menit)
        try {
          localStorage.setItem('portfolio_contact_last_sent', Date.now().toString())
        } catch {
          // safe fallback
        }
        setCooldownRemaining(COOLDOWN_SECONDS)
      } else {
        setFormStatus('error')
        setFormFeedback(
          result.message || result.error || 'Pengiriman gagal. Silakan coba lagi atau kirim via tombol Direct Gmail di bawah.'
        )
      }
    } catch (err) {
      setFormStatus('error')
      setFormFeedback(
        `Gagal menghubungi server pengiriman (${err.message}). Silakan hubungi via tombol Direct Gmail di bawah.`
      )
    }
  }

  return (
    <main className="main-wrapper">
      {/* 1. TOP NAVBAR (Selalu berada di paling atas layar pada desktop) */}
      <header className="navbar-header">
        <nav className="navbar">
          <a className="brand" href="#home">
            <span className="brand-mark">IA</span>
            <span>
              Ayub<span className="accent">.dev</span>
            </span>
          </a>

          {/* Desktop Center Links (Tersembunyi di Mobile) */}
          <div className="nav-center-links">
            <a href="#about">About</a>
            <a href="#activity">Activity</a>
            <a href="#projects">Projects</a>
            <a href="#stack">Stack</a>
            <a href="#focus">Focus</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            {/* Theme Toggle Button */}
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
      </header>

      {/* 2. HERO SECTION DENGAN BANNER DI BAWAH NAVBAR */}
      <section className="section hero-section" id="home">
        {/* Waving Capsule Header Banner */}
        <div className="capsule-banner-container">
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=Imanuel%20Ayub%20Flabianos&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Full%20Stack%20%7C%20Web3%20%7C%20AI%20%7C%20Cybersecurity&descAlignY=62&descAlign=50"
            alt="Imanuel Ayub Flabianos - Banner"
            className="capsule-banner-img"
            loading="eager"
          />
        </div>

        {/* Hero Profile Card */}
        <div className="hero-card">
          <div className="profile-top-grid">
            {/* Foto Profil Wajah */}
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
                <span className="badge badge-purple">FULLSTACK DEVELOPER</span>
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
                  className="button button-contact-pill"
                  href={gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub Profile ↗
                </a>

                <a className="button button-contact-pill" href="#projects">
                  Explore Work ↓
                </a>

                <button className="button button-contact-pill" onClick={handleCopyEmail}>
                  {copiedEmail ? '✓ Copied!' : '✉ Copy Email'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Console / Terminal Hero Display (Sesuai README GitHub Asli - Tanpa Dobel Header) */}
        <div className="console-display-container">
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
              decoding="async"
            />
          </picture>
        </div>
      </section>

      {/* 3. GITHUB ACTIVITY & STATISTIK SECTION */}
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
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
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
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
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
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
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
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
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
            href={gitHubUrl}
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

      {/* 4. ABOUT ME SECTION (Bilingual Tabs: ID & EN) */}
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
                Saya berfokus pada bidang <strong>Pengembangan Perangkat Lunak dan Gim (Software &amp; Game Development)</strong>.
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
                I specialize in <strong>Software &amp; Game Development</strong>.
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

      {/* 5. FEATURED REPOSITORIES (TERHUBUNG LANGSUNG DENGAN REPO GITHUB PENGGUNA) */}
      <section className="section projects-section" id="projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SHOWCASE & GITHUB REPOS</p>
            <h2>
              🚀 Featured <span className="gradient-text">Repository.</span>
            </h2>
          </div>
          <p className="section-note">
            Repositori publik paling populer dan aktif dari akun GitHub{' '}
            <a href={gitHubUrl} target="_blank" rel="noopener noreferrer" className="accent-link">
              @imanuelayubflabianos ↗
            </a>
          </p>
        </div>

        <div className="project-grid">
          {githubRepos.map((repo, idx) => (
            <article className="project-card" key={repo.name || idx}>
              <div className="project-top">
                <span className="project-number">0{idx + 1} / 0{githubRepos.length}</span>
                <span className="project-stars-pill">⭐ {repo.stargazers_count || 0}</span>
              </div>
              <p className="project-type">GITHUB REPOSITORY</p>
              <h3>{repo.name}</h3>
              <p className="project-description">
                {repo.description || 'Repositori kode publik pada akun GitHub resmi Imanuel Ayub Flabianos.'}
              </p>
              <div className="tag-list">
                <span className="tag tag-lang">{repo.language || 'Code'}</span>
                {repo.forks_count > 0 && <span className="tag">🍴 {repo.forks_count} Forks</span>}
                <span className="tag tag-updated">
                  Aktif:{' '}
                  {repo.updated_at
                    ? new Date(repo.updated_at).toLocaleDateString('id-ID', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Terbaru'}
                </span>
              </div>
              <div className="project-bottom">
                <span className="project-status-label">OPEN SOURCE</span>
                <a
                  href={repo.html_url || gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  title={`Buka repositori ${repo.name} di GitHub`}
                >
                  View on GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        {isReposLoading && (
          <p className="repos-loading-indicator">Memperbarui data repositori dari GitHub...</p>
        )}
      </section>

      {/* 6. TECH STACK SECTION (Skillicons Banner + Categorized Grid) */}
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

      {/* 7. ENGINEERING FOCUS SECTION (DILENGKAPI GAMBAR MESIN KUNING SCHEMATIC SESUAI README) */}
      <section className="section focus-section" id="focus">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CORE CAPABILITIES & ARCHITECTURE</p>
            <h2>
              📈 Engineering <span className="gradient-text">Focus.</span>
            </h2>
          </div>
          <p className="section-note">Key technical disciplines, system architecture, and development goals.</p>
        </div>

        {/* Box Gambar Mesin/Circuit Kuning Animated SVG dari README */}
        <div className="engineering-schematic-banner">
          <div className="schematic-img-frame">
            <img
              src={`${import.meta.env.BASE_URL}assets/javascript.svg`}
              alt="Engineering Machine Architecture Schematic"
              className="engineering-machine-svg"
              loading="lazy"
            />
          </div>
          <div className="schematic-caption">
            <span className="caption-badge">FIG. ARCHITECTURE</span>
            <p>Sistem arsitektur interaktif &amp; rekayasa perangkat lunak modern.</p>
          </div>
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

      {/* 8. FAVORITES & GEAR SECTION */}
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

      {/* 9. CONTACT SECTION WITH CLOUDFLARE TURNSTILE & UNIFIED BUTTONS */}
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
                      className="button button-contact-pill fallback-btn"
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
                className="button button-submit-pill"
                disabled={
                  formStatus === 'submitting' ||
                  cooldownRemaining > 0 ||
                  (!turnstileToken &&
                    typeof window !== 'undefined' &&
                    window.location.hostname !== 'localhost' &&
                    window.location.hostname !== '127.0.0.1')
                }
              >
                {formStatus === 'submitting'
                  ? 'Mengirim...'
                  : cooldownRemaining > 0
                  ? `⏳ Tunggu (${formatCooldown(cooldownRemaining)})`
                  : 'Kirim Pesan Sekarang ↗'}
              </button>
            </div>
          </form>

          {/* Quick Direct Links (SEMUA DENGAN GAYA TOMBOL SERAGAM & RAPI) */}
          <div className="contact-action-buttons">
            <a
              className="button button-contact-pill"
              href={`mailto:${emailAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ✉ Direct Gmail ↗
            </a>
            <a
              className="button button-contact-pill"
              href={gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on GitHub ↗
            </a>
            <a
              className="button button-contact-pill"
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">IA</span>
          <span>
            Ayub<span className="accent">.dev</span>
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

      {/* 11. MOBILE BOTTOM NAVIGATION BAR (KHUSUS TAMPIL DI HP) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <a href="#home" className="mobile-nav-item">
          <span className="mobile-nav-icon">🏠</span>
          <span className="mobile-nav-label">Home</span>
        </a>
        <a href="#about" className="mobile-nav-item">
          <span className="mobile-nav-icon">🧑‍💻</span>
          <span className="mobile-nav-label">About</span>
        </a>
        <a href="#projects" className="mobile-nav-item">
          <span className="mobile-nav-icon">🚀</span>
          <span className="mobile-nav-label">Repos</span>
        </a>
        <a href="#stack" className="mobile-nav-item">
          <span className="mobile-nav-icon">🛠️</span>
          <span className="mobile-nav-label">Stack</span>
        </a>
        <a href="#contact" className="mobile-nav-item">
          <span className="mobile-nav-icon">✉️</span>
          <span className="mobile-nav-label">Contact</span>
        </a>
      </nav>
    </main>
  )
}

export default App
