import './App.css'

const projects = [
{
number: '01',
name: 'GuruKuu',
type: 'WEB APPLICATION',
description:
'A web-based teacher evaluation and appreciation platform built to support transparent feedback and meaningful school communities.',
stack: ['Laravel', 'PHP', 'MySQL'],
status: 'FEATURED PROJECT',
link: 'https://github.com/imanuelayubflabianos',
},
{
number: '02',
name: 'Compify',
type: 'E-COMMERCE',
description:
'An e-commerce application for computer hardware and accessories, developed with a relational database and modern web technologies.',
stack: ['Laravel 10', 'MySQL', 'JavaScript'],
status: 'WEB DEVELOPMENT',
link: 'https://github.com/imanuelayubflabianos',
},
]

const technologies = [
'HTML & CSS',
'JavaScript',
'PHP',
'Laravel',
'MySQL',
'Git & GitHub',
'React',
'Figma',
]

function App() {
return ( <main> <nav className="navbar"> <a className="brand" href="#home"> <span className="brand-mark">IA</span> <span>imanuel<span className="accent">.dev</span></span> </a>

    <div className="nav-links">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#stack">Tech Stack</a>
      <a href="#contact" className="nav-contact">Contact ↗</a>
    </div>
  </nav>

  <section className="hero section" id="home">
    <div className="hero-copy">
      <div className="availability">
        <span className="status-dot" />
        OPEN TO LEARNING & OPPORTUNITIES
      </div>

      <p className="eyebrow">HELLO, WORLD. I'M</p>
      <h1>
        Imanuel Ayub
        <br />
        <span className="gradient-text">Flabianos.</span>
      </h1>

      <h2>
        Student Developer <span className="muted">/</span> Web Engineer
      </h2>

      <p className="hero-description">
        I build web experiences, explore application development, and
        turn ideas into practical digital products. Currently learning,
        experimenting, and improving one project at a time.
      </p>

      <div className="hero-actions">
        <a className="button button-primary" href="#projects">
          Explore my work <span>↗</span>
        </a>
        <a
          className="button button-secondary"
          href="https://github.com/imanuelayubflabianos"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Profile ↗
        </a>
      </div>

      <div className="hero-meta">
        <span>BASED IN INDONESIA</span>
        <span className="meta-divider">/</span>
        <span>GRADE XI · PPLG</span>
      </div>
    </div>

    <div className="hero-visual" aria-label="Developer terminal illustration">
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <div className="terminal">
        <div className="terminal-bar">
          <div className="terminal-dots">
            <i />
            <i />
            <i />
          </div>
          <span>imanuel@portfolio:~</span>
          <span className="terminal-menu">•••</span>
        </div>

        <div className="terminal-content">
          <p><span className="terminal-prompt">➜</span> whoami</p>
          <h3>Imanuel Ayub Flabianos</h3>
          <p><span className="code-purple">const</span> developer = {'{'}</p>
          <p className="code-indent">role: <span className="code-green">'Student Developer'</span>,</p>
          <p className="code-indent">focus: <span className="code-green">'Web Development'</span>,</p>
          <p className="code-indent">mindset: <span className="code-green">'Always learning'</span></p>
          <p>{'}'}</p>
          <p className="terminal-prompt terminal-last">➜ <span className="cursor" /></p>
        </div>

        <div className="terminal-footer">
          <span><i /> SYSTEM ONLINE</span>
          <span>BUILDING THE FUTURE</span>
        </div>
      </div>

      <div className="floating-card">
        <span className="floating-icon">&lt;/&gt;</span>
        <span>
          <strong>Code. Learn. Repeat.</strong>
          <small>Progress over perfection.</small>
        </span>
      </div>

      <div className="visual-label">FIG. 001 — DEVELOPER MINDSET</div>
    </div>
  </section>

  <section className="stats section" id="about">
    <div className="stat-item">
      <span className="stat-number">02<span>+</span></span>
      <span className="stat-label">FEATURED PROJECTS</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">08<span>+</span></span>
      <span className="stat-label">TECHNOLOGIES EXPLORED</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">∞</span>
      <span className="stat-label">THINGS LEFT TO LEARN</span>
    </div>
  </section>

  <section className="section projects-section" id="projects">
    <div className="section-heading">
      <div>
        <p className="eyebrow">SELECTED WORK / 001—002</p>
        <h2>Things I've <span className="gradient-text">built.</span></h2>
      </div>
      <p className="section-note">
        A few projects from my journey into software development.
      </p>
    </div>

    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.name}>
          <div className="project-top">
            <span className="project-number">{project.number} / 02</span>
            <span className="project-arrow">↗</span>
          </div>
          <p className="project-type">{project.type}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="tag-list">
            {project.stack.map((item) => (
              <span className="tag" key={item}>{item}</span>
            ))}
          </div>
          <div className="project-bottom">
            <span>{project.status}</span>
            <a href={project.link} target="_blank" rel="noreferrer">
              View repository ↗
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>

  <section className="section stack-section" id="stack">
    <div className="section-heading">
      <div>
        <p className="eyebrow">TOOLS OF THE TRADE</p>
        <h2>My engineering <span className="gradient-text">toolkit.</span></h2>
      </div>
      <p className="section-note">
        Technologies I use, learn, and experiment with.
      </p>
    </div>

    <div className="tech-grid">
      {technologies.map((technology, index) => (
        <div className="tech-item" key={technology}>
          <span className="tech-index">0{index + 1}</span>
          <span>{technology}</span>
          <span className="tech-arrow">↗</span>
        </div>
      ))}
    </div>
  </section>

  <section className="favorites section">
    <div>
      <p className="eyebrow">BEYOND THE CODE</p>
      <h2>My absolute <span className="gradient-text">favorites.</span></h2>
      <p className="favorites-description">
        I enjoy exploring technology, designing interfaces, listening to
        music, and discovering how things work behind the scenes.
      </p>
    </div>
    <div className="favorite-tags">
      <span>⌘ UI/UX DESIGN</span>
      <span>◈ WEB TECHNOLOGY</span>
      <span>♫ MUSIC</span>
      <span>⌁ CREATIVE EXPERIMENTS</span>
    </div>
  </section>

  <section className="contact-section section" id="contact">
    <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
    <h2>Let's build something<br /><span className="gradient-text">meaningful.</span></h2>
    <p className="contact-description">
      Interested in my work or want to discuss a project? Find me on GitHub
      or connect through my professional profile.
    </p>
    <div className="hero-actions contact-actions">
      <a
        className="button button-primary"
        href="https://github.com/imanuelayubflabianos"
        target="_blank"
        rel="noreferrer"
      >
        Connect on GitHub ↗
      </a>
      <a
        className="button button-secondary"
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn ↗
      </a>
    </div>
  </section>

  <footer className="footer">
    <a className="brand" href="#home">
      <span className="brand-mark">IA</span>
      <span>imanuel<span className="accent">.dev</span></span>
    </a>
    <span>DESIGNED & BUILT BY IMANUEL AYUB FLABIANOS</span>
    <a href="#home">BACK TO TOP ↑</a>
  </footer>
</main>
)
}

export default App
