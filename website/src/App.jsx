import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { TURNSTILE_SITE_KEY, CONTACT_ENDPOINT, WEB3FORMS_ACCESS_KEY } from './config.js'
import { TRANSLATIONS } from './translations.jsx'
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
      'Minecraft',
      'Command Block',
      'Roblox',
      'Roblox Studio',
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
  })

  useEffect(() => {
    let isMounted = true

    const renderWidget = () => {
      const container = containerRef.current
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

  // Global Multi-Language State (IDN & ENG)
  const [activeLang, setActiveLang] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('portfolio-lang') : null
      if (saved === 'id' || saved === 'en') return saved
    } catch {
      // safe fallback
    }
    return 'id'
  })

  const setLanguage = (lang) => {
    setActiveLang(lang)
    try {
      localStorage.setItem('portfolio-lang', lang)
    } catch {
      // safe fallback
    }
  }

  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.id

  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [imgErrors, setImgErrors] = useState({})

  // Dynamic GitHub Repositories State
  const [githubRepos, setGithubRepos] = useState(FALLBACK_PROJECTS)
  const [isReposLoading, setIsReposLoading] = useState(true)

  // Form State & Anti-Spam Cooldown (1 Menit Jeda Antar Pengiriman)
  const COOLDOWN_SECONDS = 60
  const [cooldownRemaining, setCooldownRemaining] = useState(() => {
    try {
      const lastSent = typeof window !== 'undefined' ? localStorage.getItem('portfolio_contact_last_sent') : null
      if (lastSent) {
        const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000)
        if (elapsed < COOLDOWN_SECONDS) {
          return COOLDOWN_SECONDS - elapsed
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

  // Cloudflare Turnstile & Backend Configuration
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
      // safe fallback
    }
  }, [theme])

  // Deteksi Otomatis Repositori Terbaru & Terpopuler dari Akun GitHub
  useEffect(() => {
    let isCancelled = false

    fetch('https://api.github.com/users/imanuelayubflabianos/repos?sort=updated&per_page=100')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API response not ok')
        return res.json()
      })
      .then((data) => {
        if (isCancelled || !Array.isArray(data)) return

        const filtered = data.filter((repo) => !repo.fork)

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
    setFormFeedback(t.contact.errTurnstileExpire)
  }, [t.contact.errTurnstileExpire])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('')
    setFormStatus('error')
    setFormFeedback(t.contact.errTurnstileOffline)
  }, [t.contact.errTurnstileOffline])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  // Validasi Format Email, Typo Detection, & Disposable Mail Blocker
  const getEmailValidationError = (email) => {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return ''
    if (trimmed === emailAddress.toLowerCase()) {
      return t.contact.errOwnerEmail
    }
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!EMAIL_REGEX.test(trimmed)) {
      return t.contact.errInvalidEmail
    }
    const parts = trimmed.split('@')
    if (parts.length === 2) {
      const domain = parts[1]
      const DISPOSABLE_DOMAINS = [
        'mailinator.com',
        'tempmail.com',
        'guerrillamail.com',
        '10minutemail.com',
        'yopmail.com',
        'sharklasers.com',
        'throwawaymail.com',
        'trashmail.com',
        'getairmail.com',
        'dispostable.com',
      ]
      if (DISPOSABLE_DOMAINS.includes(domain)) {
        return t.contact.errDisposableEmail
      }
      const TYPO_MAP = {
        'gmai.com': 'gmail.com',
        'gamil.com': 'gmail.com',
        'gmaill.com': 'gmail.com',
        'gmial.com': 'gmail.com',
        'yaho.com': 'yahoo.com',
        'yahooo.com': 'yahoo.com',
        'hotmial.com': 'hotmail.com',
        'hotmai.com': 'hotmail.com',
        'outlok.com': 'outlook.com',
      }
      if (TYPO_MAP[domain]) {
        return t.contact.errDidYouMean(TYPO_MAP[domain])
      }
    }
    return ''
  }

  const emailValidationError = getEmailValidationError(contactForm.email)

  // Pengiriman Formulir Kontak
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (cooldownRemaining > 0) {
      setFormStatus('error')
      setFormFeedback(t.contact.waitCooldown(formatCooldown(cooldownRemaining)))
      return
    }

    if (emailValidationError) {
      setFormStatus('error')
      setFormFeedback(emailValidationError)
      return
    }

    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.subject.trim() ||
      !contactForm.message.trim()
    ) {
      setFormStatus('error')
      setFormFeedback(t.contact.errEmptyFields)
      return
    }

    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

    if (!turnstileToken && !isLocalhost) {
      setFormStatus('error')
      setFormFeedback(t.contact.errTurnstileRequired)
      return
    }

    if (!contactEndpoint) {
      setFormStatus('no-endpoint')
      setFormFeedback(t.contact.errNoEndpoint)
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
      } else if (turnstileToken) {
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
        setFormFeedback(result.message || t.contact.successMessage)
        setContactForm({ name: '', email: '', subject: '', message: '' })
        setTurnstileToken('')

        try {
          localStorage.setItem('portfolio_contact_last_sent', Date.now().toString())
        } catch {
          // safe fallback
        }
        setCooldownRemaining(COOLDOWN_SECONDS)
      } else {
        setFormStatus('error')
        setFormFeedback(result.message || result.error || t.contact.failedMessage)
      }
    } catch (err) {
      setFormStatus('error')
      setFormFeedback(t.contact.serverError(err.message))
    }
  }

  return (
    <main className="main-wrapper">
      {/* 1. TOP NAVBAR */}
      <header className="navbar-header">
        <nav className="navbar">
          <a className="brand" href="#home">
            <span className="brand-mark">IA</span>
            <span>
              Ayub<span className="accent">.dev</span>
            </span>
          </a>

          {/* Desktop Center Links */}
          <div className="nav-center-links">
            <a href="#about">{t.nav.about}</a>
            <a href="#activity">{t.nav.activity}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#stack">{t.nav.stack}</a>
            <a href="#focus">{t.nav.focus}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>

          <div className="nav-actions">
            {/* Language Switcher Toggle (IDN / ENG) */}
            <div className="nav-lang-toggle" role="group" aria-label="Select Language">
              <button
                type="button"
                className={`lang-pill-btn ${activeLang === 'id' ? 'active' : ''}`}
                onClick={() => setLanguage('id')}
                aria-pressed={activeLang === 'id'}
                title="Bahasa Indonesia"
              >
                IDN
              </button>
              <button
                type="button"
                className={`lang-pill-btn ${activeLang === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-pressed={activeLang === 'en'}
                title="English"
              >
                ENG
              </button>
            </div>

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
              {t.nav.connect}
            </a>
          </div>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
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
              <span className="avatar-status-pill" title={`Status: ${t.hero.active}`}>
                <span className="status-ping" />
                <span className="status-dot" />
                {t.hero.active}
              </span>
            </div>

            <div className="profile-info-content">
              <div className="hero-badges-row">
                <span className="badge badge-cyan">
                  <span className="badge-glow" />
                  {t.hero.badgeBuilderman}
                </span>
                <span className="badge badge-purple">{t.hero.badgeRole}</span>
                <span className="badge badge-pink">{t.hero.badgeLocation}</span>
              </div>

              <h1 className="hero-title">
                Imanuel Ayub <span className="gradient-text">Flabianos</span>
              </h1>

              {/* Animated Typewriter Subtitle */}
              <div className="typewriter-box">
                <span className="typewriter-prefix">&gt;&nbsp;</span>
                <Typewriter words={TYPING_PHRASES} />
              </div>

              <p className="hero-bio-quote">{t.hero.bio}</p>

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
                  {t.hero.githubProfile}
                </a>

                <a className="button button-contact-pill" href="#projects">
                  {t.hero.exploreWork}
                </a>

                <button className="button button-contact-pill" onClick={handleCopyEmail}>
                  {copiedEmail ? t.hero.copied : t.hero.copyEmail}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Console / Terminal Hero Display */}
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
            <p className="eyebrow">{t.activity.eyebrow}</p>
            <h2>
              📊 {t.activity.title} <span className="gradient-text">{t.activity.titleAccent}</span>
            </h2>
          </div>
          <p className="section-note">{t.activity.subtitle}</p>
        </div>

        <div className="activity-cards-grid">
          {/* GitHub Streak Stats Card */}
          <div className="activity-card streak-card">
            <div className="card-top-header">
              <span>{t.activity.streakTitle}</span>
              <span className="card-badge">{t.activity.streakBadge}</span>
            </div>
            <div className="activity-media-box">
              {imgErrors['streak'] ? (
                <div className="activity-fallback-box">
                  <p>{t.activity.streakFallback}</p>
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                    {t.activity.openRepoBtn}
                  </a>
                </div>
              ) : (
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com?user=imanuelayubflabianos&theme=synthwave&hide_border=true&background=${
                    theme === 'dark' ? '0d1117' : 'ffffff'
                  }&ring=ff3366&fire=00f0ff&currStreakLabel=00f0ff`}
                  alt="GitHub Streak"
                  className="activity-img"
                  loading="lazy"
                  onError={() => handleImgError('streak')}
                />
              )}
            </div>
          </div>

          {/* Repos Per Language */}
          <div className="activity-card">
            <div className="card-top-header">
              <span>{t.activity.reposTitle}</span>
              <span className="card-badge">{t.activity.reposBadge}</span>
            </div>
            <div className="activity-media-box">
              {imgErrors['reposLang'] ? (
                <div className="activity-fallback-box">
                  <p>{t.activity.reposFallback}</p>
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                    {t.activity.openRepoBtn}
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
              <span>{t.activity.commitsTitle}</span>
              <span className="card-badge">{t.activity.commitsBadge}</span>
            </div>
            <div className="activity-media-box">
              {imgErrors['commitLang'] ? (
                <div className="activity-fallback-box">
                  <p>{t.activity.commitsFallback}</p>
                  <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                    {t.activity.openRepoBtn}
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
                <p>{t.activity.statsFallback}</p>
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

      {/* 3.5 PORTOFOLIO INTRO SECTION WITH CROSS.GIF (Matching README.md) */}
      <section className="portfolio-intro-section">
        <div className="portfolio-intro-box">
          <div className="portfolio-intro-content">
            <h3 className="portfolio-intro-title">
              <span className="chain-icon">🔗</span> {t.portfolioIntro.title}
            </h3>
            <blockquote className="portfolio-intro-quote">
              {t.portfolioIntro.quote}
            </blockquote>
            <div className="portfolio-intro-badges">
              <span className="badge-shield badge-github">
                <svg className="shield-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {t.portfolioIntro.badgeGithub}
              </span>
              <span className="badge-shield badge-status">
                {t.portfolioIntro.badgeStatus}
              </span>
              <span className="badge-shield badge-location">
                {t.portfolioIntro.badgeLocation}
              </span>
            </div>
          </div>

          <div className="portfolio-cross-frame">
            <img
              src={`${import.meta.env.BASE_URL}assets/Cross.gif`}
              alt="Rotating Cross Animation"
              className="cross-gif-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 4. ABOUT ME SECTION */}
      <section className="section about-section" id="about">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2>
              🧑‍💻 {t.about.title} <span className="gradient-text">{t.about.titleAccent}</span>
            </h2>
          </div>
        </div>

        <div className="about-card-container">
          <div className="about-text-content">
            <div className="about-lead">{t.about.lead}</div>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <div className="about-badges-footer">
            <span className="about-pill">🔗 {t.about.badgeGithub}</span>
            <span className="about-pill">⚡ {t.about.badgeStatus}</span>
            <span className="about-pill">📍 {t.about.badgeLocation}</span>
          </div>
        </div>
      </section>

      {/* 5. FEATURED REPOSITORIES */}
      <section className="section projects-section" id="projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.projects.eyebrow}</p>
            <h2>
              🚀 {t.projects.title} <span className="gradient-text">{t.projects.titleAccent}</span>
            </h2>
          </div>
          <p className="section-note">{t.projects.subtitle}</p>
        </div>

        <div className="projects-grid">
          {githubRepos.slice(0, 3).map((repo) => (
            <article className="project-card" key={repo.id}>
              <div className="project-top">
                <span className="folder-icon">📁</span>
                <div className="project-stats-pills">
                  <span className="stat-pill">★ {repo.stargazers_count ?? 0}</span>
                  <span className="stat-pill">⑂ {repo.forks_count ?? 0}</span>
                </div>
              </div>

              <h3 className="project-title">{repo.name}</h3>
              <p className="project-desc">{repo.description || 'Proyek open source oleh Imanuel Ayub.'}</p>

              <div className="project-tags">
                <span className="tech-badge">{repo.language || 'Code'}</span>
              </div>

              <div className="project-bottom">
                <span className="project-status-label">{t.projects.badgeOpenSource}</span>
                <a
                  href={repo.html_url || gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  title={`Open ${repo.name} on GitHub`}
                >
                  {t.projects.viewOnGithub}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Repositories CTA */}
        <div className="projects-footer-cta">
          <a
            href="https://github.com/imanuelayubflabianos?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="button-view-all-repos"
            title="Lihat semua repositori publik Imanuel Ayub di GitHub"
          >
            <span>{t.projects.viewAllRepos}</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>

        {isReposLoading && (
          <p className="repos-loading-indicator">{t.projects.loadingText}</p>
        )}
      </section>

      {/* 6. TECH STACK SECTION */}
      <section className="section stack-section" id="stack">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.stack.eyebrow}</p>
            <h2>
              🛠️ {t.stack.title} <span className="gradient-text">{t.stack.titleAccent}</span>
            </h2>
          </div>
          <p className="section-note">{t.stack.subtitle}</p>
        </div>

        {/* Custom Tech Stack SVG Banner (Minecraft, Command Block, Roblox, Roblox Studio + Skillicons) */}
        <div className="skillicons-container">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={`${import.meta.env.BASE_URL}assets/tech-stack-${theme === 'light' ? 'light' : 'dark'}.svg`}
            />
            <img
              src={`${import.meta.env.BASE_URL}assets/tech-stack-${theme === 'light' ? 'light' : 'dark'}.svg`}
              alt="Imanuel Tech Stack & Tools"
              className="skillicons-banner-img"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Categorized Stack Grid */}
        <div className="tech-categories-grid">
          {TECH_CATEGORIES.map((cat) => (
            <div className="tech-cat-card" key={cat.category}>
              <h4>{t.stack.categories[cat.category] || cat.category}</h4>
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

      {/* 7. ENGINEERING FOCUS SECTION */}
      <section className="section focus-section" id="focus">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.focus.eyebrow}</p>
            <h2>
              📈 {t.focus.title} <span className="gradient-text">{t.focus.titleAccent}</span>
            </h2>
          </div>
          <p className="section-note">{t.focus.subtitle}</p>
        </div>

        {/* Box Gambar Mesin Schematic SVG dari README */}
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
            <span className="caption-badge">{t.focus.figBadge}</span>
            <p>{t.focus.figCaption}</p>
          </div>
        </div>

        <div className="focus-grid">
          {t.focus.items.map((item, index) => (
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
            <p className="eyebrow">{t.favorites.eyebrow}</p>
            <h2>
              ⭐ {t.favorites.title} <span className="gradient-text">{t.favorites.titleAccent}</span>
            </h2>
          </div>
        </div>

        <div className="favorites-list-card">
          <ul className="favorites-bullets">
            <li>
              <span className="bullet-icon">💻</span>
              <span>{t.favorites.bullet1}</span>
            </li>
            <li>
              <span className="bullet-icon">📰</span>
              <span>{t.favorites.bullet2}</span>
            </li>
            <li>
              <span className="bullet-icon">🍕</span>
              <span>{t.favorites.bullet3}</span>
            </li>
          </ul>

          {/* Collapsible Gear Details */}
          <div className="gear-accordion">
            <button
              className="gear-toggle-btn"
              onClick={() => setIsDetailsOpen((prev) => !prev)}
              aria-expanded={isDetailsOpen}
            >
              <span>{t.favorites.gearTitle}</span>
              <span className="accordion-arrow">{isDetailsOpen ? '▲' : '▼'}</span>
            </button>

            {isDetailsOpen && (
              <div className="gear-content-box">
                <div className="gear-item">
                  <strong>{t.favorites.gearOs}</strong>
                </div>
                <div className="gear-item">
                  <strong>{t.favorites.gearLaptop}</strong>
                </div>
                <div className="gear-item">
                  <strong>{t.favorites.gearEditor}</strong>
                </div>
                <div className="gear-item">
                  <strong>{t.favorites.gearStayUpdated}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section className="section contact-section" id="contact">
        <div className="contact-box">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2>
            {t.contact.title} <span className="gradient-text">{t.contact.titleAccent}</span>
          </h2>
          <p className="contact-description">{t.contact.description}</p>

          <div className="contact-email-badge">
            <span className="email-label">{t.contact.directGmail}</span>
            <code className="email-code">{emailAddress}</code>
            <button
              className="copy-badge-btn"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              title="Copy email address"
            >
              {copiedEmail ? t.contact.copied : t.contact.copy}
            </button>
          </div>

          {/* Interactive Secure Contact Form with Cloudflare Turnstile */}
          <form className="contact-form-card" onSubmit={handleFormSubmit} noValidate>
            <div className="form-header">
              <h3>{t.contact.formTitle}</h3>
              <span className="form-badge-security">{t.contact.turnstileProtected}</span>
            </div>

            <div className="form-grid-two">
              <div className="form-field">
                <label htmlFor="contact-name">
                  {t.contact.labelName} <span className="field-required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  placeholder={t.contact.placeholderName}
                  maxLength={100}
                  required
                  disabled={formStatus === 'submitting'}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">
                  {t.contact.labelEmail} <span className="field-required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  placeholder={t.contact.placeholderEmail}
                  maxLength={100}
                  required
                  disabled={formStatus === 'submitting'}
                  className={emailValidationError ? 'input-error-field' : ''}
                />
                {emailValidationError && (
                  <span className="field-inline-error">
                    ⚠️ {emailValidationError}
                  </span>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">
                {t.contact.labelSubject} <span className="field-required">*</span>
              </label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                placeholder={t.contact.placeholderSubject}
                maxLength={150}
                required
                disabled={formStatus === 'submitting'}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">
                {t.contact.labelMessage} <span className="field-required">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={contactForm.message}
                onChange={handleInputChange}
                placeholder={t.contact.placeholderMessage}
                maxLength={2000}
                required
                disabled={formStatus === 'submitting'}
              />
              <span className="char-count">{contactForm.message.length} / 2000</span>
            </div>

            {/* Cloudflare Turnstile Widget */}
            <div className="turnstile-section">
              <div className="turnstile-info-label">
                <span>{t.contact.turnstileLabel}</span>
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
                      {t.contact.continueMailto}
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
                  ? t.contact.submittingBtn
                  : cooldownRemaining > 0
                  ? t.contact.waitCooldown(formatCooldown(cooldownRemaining))
                  : t.contact.submitBtn}
              </button>
            </div>
          </form>

          {/* Quick Direct Links with Official App SVG Icons */}
          <div className="contact-action-buttons">
            <a
              className="button-app-contact btn-gmail"
              href={`mailto:${emailAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Kirim pesan langsung ke Gmail Imanuel Ayub"
            >
              <svg className="btn-app-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" fill="#EA4335" fillOpacity="0.12"/>
                <path d="M20 4H4C2.9 4 2 4.9 2 6V7.25L12 13.5L22 7.25V6C22 4.9 21.1 4 20 4Z" fill="#EA4335"/>
                <path d="M2 7.25V18C2 19.1 2.9 20 4 20H5V8.875L2 7.25Z" fill="#4285F4"/>
                <path d="M22 7.25V18C22 19.1 21.1 20 20 20H19V8.875L22 7.25Z" fill="#34A853"/>
                <path d="M19 20H5V11L12 15.5L19 11V20Z" fill="#FBBC05"/>
              </svg>
              <span>{t.contact.btnDirectGmail}</span>
            </a>
            <a
              className="button-app-contact btn-github"
              href={gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Kunjungi profil GitHub Imanuel Ayub"
            >
              <svg className="btn-app-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>{t.contact.btnGithub}</span>
            </a>
            <a
              className="button-app-contact btn-linkedin"
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Kunjungi profil LinkedIn Imanuel Ayub"
            >
              <svg className="btn-app-icon" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>{t.contact.btnLinkedIn}</span>
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
          <span>{t.footer.builtBy} <strong>Imanuel Ayub Flabianos</strong> | © 2026</span>
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
          {t.footer.backToTop}
        </a>
      </footer>

      {/* 11. MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <a href="#home" className="mobile-nav-item">
          <span className="mobile-nav-icon">🏠</span>
          <span className="mobile-nav-label">{t.mobileNav.home}</span>
        </a>
        <a href="#about" className="mobile-nav-item">
          <span className="mobile-nav-icon">🧑‍💻</span>
          <span className="mobile-nav-label">{t.mobileNav.about}</span>
        </a>
        <a href="#projects" className="mobile-nav-item">
          <span className="mobile-nav-icon">🚀</span>
          <span className="mobile-nav-label">{t.mobileNav.repos}</span>
        </a>
        <a href="#stack" className="mobile-nav-item">
          <span className="mobile-nav-icon">🛠️</span>
          <span className="mobile-nav-label">{t.mobileNav.stack}</span>
        </a>
        <a href="#contact" className="mobile-nav-item">
          <span className="mobile-nav-icon">✉️</span>
          <span className="mobile-nav-label">{t.mobileNav.contact}</span>
        </a>
      </nav>
    </main>
  )
}

export default App
