<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  PROFILE SCAN CARD — SVG INLINE (Terminal / Sci-Fi Style)          -->
<!--  FIXED: Silhouette pakai SVG shapes, bukan Unicode block chars     -->
<!-- ══════════════════════════════════════════════════════════════════ -->
<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" width="900" height="420">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0f;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0d1117;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00f0ff;stop-opacity:0"/>
      <stop offset="40%" style="stop-color:#00f0ff;stop-opacity:0.08"/>
      <stop offset="50%" style="stop-color:#00f0ff;stop-opacity:0.3"/>
      <stop offset="60%" style="stop-color:#00f0ff;stop-opacity:0.08"/>
      <stop offset="100%" style="stop-color:#00f0ff;stop-opacity:0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="900" height="420" rx="12" fill="url(#bgGrad)"/>

  <!-- Border Pink/Red dengan glow -->
  <rect x="3" y="3" width="894" height="414" rx="10" fill="none" stroke="#ff3366" stroke-width="2.5">
    <animate attributeName="stroke-opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite"/>
  </rect>

  <!-- Inner border cyan -->
  <rect x="8" y="8" width="884" height="404" rx="8" fill="none" stroke="#00f0ff" stroke-width="0.5" stroke-opacity="0.3"/>

  <!-- Corner decorations -->
  <path d="M20,20 L55,20 M20,20 L20,55" stroke="#ff3366" stroke-width="2" fill="none"/>
  <path d="M880,20 L845,20 M880,20 L880,55" stroke="#ff3366" stroke-width="2" fill="none"/>
  <path d="M20,400 L55,400 M20,400 L20,365" stroke="#ff3366" stroke-width="2" fill="none"/>
  <path d="M880,400 L845,400 M880,400 L880,365" stroke="#ff3366" stroke-width="2" fill="none"/>

  <!-- Divider line -->
  <line x1="320" y1="40" x2="320" y2="380" stroke="#00f0ff" stroke-width="0.8" stroke-opacity="0.4" stroke-dasharray="4,4"/>

  <!-- ═══ LEFT SIDE: SILHOUETTE (SVG SHAPES, BUKAN TEXT) ═══ -->
  <g transform="translate(60, 55)">
    <text x="0" y="0" fill="#ff3366" font-family="monospace" font-size="10" font-weight="bold">[ SUBJECT.SILHOUETTE ]</text>

    <!-- Head -->
    <circle cx="110" cy="55" r="28" fill="none" stroke="#00f0ff" stroke-width="1.5" opacity="0.9"/>
    <circle cx="110" cy="55" r="22" fill="#00f0ff" opacity="0.08"/>
    <!-- Eyes -->
    <rect x="98" y="48" width="8" height="4" fill="#00f0ff" opacity="0.9"/>
    <rect x="114" y="48" width="8" height="4" fill="#00f0ff" opacity="0.9"/>
    <!-- Mouth -->
    <rect x="102" y="62" width="16" height="2" fill="#00f0ff" opacity="0.6"/>

    <!-- Neck -->
    <rect x="102" y="83" width="16" height="12" fill="#00f0ff" opacity="0.5"/>

    <!-- Body / Torso -->
    <path d="M70,95 L150,95 L160,180 L60,180 Z" fill="none" stroke="#00f0ff" stroke-width="1.5" opacity="0.9"/>
    <path d="M70,95 L150,95 L160,180 L60,180 Z" fill="#00f0ff" opacity="0.06"/>

    <!-- Arms -->
    <path d="M70,100 L40,150 L45,155 L75,110 Z" fill="#00f0ff" opacity="0.7"/>
    <path d="M150,100 L180,150 L175,155 L145,110 Z" fill="#00f0ff" opacity="0.7"/>

    <!-- Legs -->
    <rect x="75" y="180" width="22" height="55" fill="#00f0ff" opacity="0.7"/>
    <rect x="123" y="180" width="22" height="55" fill="#00f0ff" opacity="0.7"/>

    <!-- Feet -->
    <rect x="70" y="235" width="30" height="8" rx="2" fill="#00f0ff" opacity="0.8"/>
    <rect x="120" y="235" width="30" height="8" rx="2" fill="#00f0ff" opacity="0.8"/>

    <!-- Circuit lines on body -->
    <line x1="85" y1="110" x2="135" y2="110" stroke="#00f0ff" stroke-width="0.5" opacity="0.4"/>
    <line x1="85" y1="130" x2="135" y2="130" stroke="#00f0ff" stroke-width="0.5" opacity="0.4"/>
    <line x1="85" y1="150" x2="135" y2="150" stroke="#00f0ff" stroke-width="0.5" opacity="0.4"/>
    <circle cx="110" cy="130" r="4" fill="none" stroke="#ff3366" stroke-width="1" opacity="0.8">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>

    <!-- Status text -->
    <text x="0" y="270" fill="#ff3366" font-family="monospace" font-size="9">STATUS: <tspan fill="#00ff88">ONLINE</tspan></text>
    <text x="0" y="285" fill="#ff3366" font-family="monospace" font-size="9">CLEARANCE: <tspan fill="#00f0ff">LEVEL-5</tspan></text>
    <text x="0" y="300" fill="#ff3366" font-family="monospace" font-size="9">ROLE: <tspan fill="#00f0ff">FULLSTACK DEV</tspan></text>

    <!-- Blinking cursor -->
    <rect x="0" y="310" width="8" height="12" fill="#00f0ff">
      <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/>
    </rect>
  </g>

  <!-- ══ RIGHT SIDE: SYSTEM LOG / PROFILE DATA ═══ -->
  <g transform="translate(340, 40)" font-family="monospace" font-size="12">

    <!-- Header -->
    <text x="0" y="15" fill="#ff3366" font-size="14" font-weight="bold">+== SYSTEM PROFILE SCAN ==+</text>

    <!-- Profile Data -->
    <text x="0" y="45" fill="#00f0ff">
      <tspan fill="#ff3366">+--</tspan> NAME        <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Imanuel Ayub Flabianos</tspan>
    </text>
    <text x="0" y="65" fill="#00f0ff">
      <tspan fill="#ff3366">+--</tspan> USERNAME    <tspan fill="#555">::</tspan> <tspan fill="#00ff88">@imanuelayubflabianos</tspan>
    </text>
    <text x="0" y="85" fill="#00f0ff">
      <tspan fill="#ff3366">+--</tspan> ROLE        <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Fullstack Developer</tspan>
    </text>
    <text x="0" y="105" fill="#00f0ff">
      <tspan fill="#ff3366">+--</tspan> BACKGROUND  <tspan fill="#555">::</tspan> <tspan fill="#00ff88">PPLG / Software &amp; Game Dev</tspan>
    </text>
    <text x="0" y="125" fill="#00f0ff">
      <tspan fill="#ff3366">+--</tspan> LOCATION    <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Indonesia</tspan>
    </text>
    <text x="0" y="145" fill="#00f0ff">
      <tspan fill="#ff3366">+--</tspan> STATUS      <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Learning &amp; Building</tspan>
    </text>
    <text x="0" y="165" fill="#00f0ff">
      <tspan fill="#ff3366">+--</tspan> FOCUS       <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Web, System, IoT, UI/UX, DB</tspan>
    </text>

    <!-- Tech Stack Section -->
    <text x="0" y="195" fill="#ff3366" font-size="13" font-weight="bold">+--- TECH STACK ---+</text>
    <text x="0" y="215" fill="#00f0ff">
      <tspan fill="#ff3366">|</tspan> <tspan fill="#ffaa00">LANG</tspan>    <tspan fill="#555">::</tspan> PHP, JavaScript, HTML5, CSS3
    </text>
    <text x="0" y="235" fill="#00f0ff">
      <tspan fill="#ff3366">|</tspan> <tspan fill="#ffaa00">FRAME</tspan>   <tspan fill="#555">::</tspan> Laravel, Bootstrap
    </text>
    <text x="0" y="255" fill="#00f0ff">
      <tspan fill="#ff3366">|</tspan> <tspan fill="#ffaa00">DB</tspan>      <tspan fill="#555">::</tspan> MySQL
    </text>
    <text x="0" y="275" fill="#00f0ff">
      <tspan fill="#ff3366">|</tspan> <tspan fill="#ffaa00">TOOLS</tspan>   <tspan fill="#555">::</tspan> Git, GitHub, Figma, MS Office
    </text>
    <text x="0" y="295" fill="#ff3366">+-----------------+</text>

    <!-- System Status -->
    <text x="0" y="325" fill="#555" font-size="10">
      <tspan fill="#ff3366">[SYS]</tspan> Scanning complete | <tspan fill="#00ff88">0 errors</tspan> | <tspan fill="#00ff88">0 warnings</tspan>
    </text>
    <text x="0" y="345" fill="#555" font-size="10">
      <tspan fill="#ff3366">[SYS]</tspan> Profile integrity: <tspan fill="#00ff88">VERIFIED</tspan>
    </text>

    <!-- Animated progress bar -->
    <text x="0" y="365" fill="#00f0ff" font-size="10">SCAN PROGRESS:</text>
    <rect x="130" y="355" width="350" height="12" rx="3" fill="none" stroke="#00f0ff" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="131" y="356" width="0" height="10" rx="2" fill="#00f0ff" opacity="0.6">
      <animate attributeName="width" values="0;348;348;0" dur="4s" repeatCount="indefinite"/>
    </rect>
  </g>

  <!-- ═══ ANIMATED SCANLINE ═══ -->
  <rect x="10" y="0" width="880" height="80" fill="url(#scanGrad)" opacity="0.7">
    <animate attributeName="y" values="-80;420;-80" dur="5s" repeatCount="indefinite"/>
  </rect>

  <!-- Horizontal scan lines (CRT effect) -->
  <g opacity="0.04">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="4" x2="900" y2="4" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="8" x2="900" y2="8" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="12" x2="900" y2="12" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="16" x2="900" y2="16" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="20" x2="900" y2="20" stroke="#00f0ff" stroke-width="1"/>
  </g>

  <!-- Footer timestamp -->
  <text x="450" y="410" text-anchor="middle" font-family="monospace" font-size="9" fill="#555">
    PROFILE_SCAN v2.1 // SESSION ACTIVE // 2026
  </text>
</svg>

</div>

---

## 👋 Hi, I'm Imanuel Ayub Flabianos

### Fullstack Developer — Learning & Building Every Day

<p align="center">
  <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  <img src="https://img.shields.io/badge/Status-Learning_%26_Building-00f0ff?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Location-Indonesia-ff3366?style=for-the-badge" alt="Location"/>
</p>

---

## 🧑‍💻 About Me / Tentang Saya

<table>
<tr>
<td width="50%" valign="top">

### 🇮 Bahasa Indonesia

Halo! Saya **Imanuel Ayub Flabianos**, seorang **Fullstack Developer** dari Indonesia. Saya saat ini menempuh pendidikan di bidang **Pengembangan Perangkat Lunak dan Gim (PPLG/RPL)**.

Saya passionate dalam membangun aplikasi web dan sistem yang fungsional, efisien, dan memiliki tampilan yang menarik. Fokus utama saya meliputi pengembangan **Web & System (Fullstack)**, **IoT**, **UI/UX Design**, serta **Database Architecture**.

Saat ini saya terus **belajar dan membangun** proyek-proyek baru untuk mengasah kemampuan dan menambah pengalaman.

</td>
<td width="50%" valign="top">

### 🇧 English

Hello! I'm **Imanuel Ayub Flabianos**, a **Fullstack Developer** from Indonesia. I'm currently studying **Software & Game Development (PPLG/RPL)**.

I'm passionate about building functional, efficient, and visually appealing web applications and systems. My main focus areas include **Web & System Development (Fullstack)**, **IoT**, **UI/UX Design**, and **Database Architecture**.

I'm constantly **learning and building** new projects to sharpen my skills and gain experience.

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| 🖥️ **Bahasa Pemrograman** | PHP, JavaScript, HTML5, CSS3 |
| 🔧 **Framework / Library** | Laravel, Bootstrap |
| 🗄️ **Database** | MySQL |
| 🎨 **Design & Prototyping** | Figma |
|  **Version Control** | Git, GitHub |
| 📄 **Produktivitas** | Microsoft Office |
| 🌐 **Fokus Pengembangan** | Web Dev, System Dev, IoT, UI/UX, Database Architecture |

---

## 🔬 Research & Interests

| Area | Deskripsi |
|------|-----------|
| 🌐 **Web Development** | Membangun aplikasi web fullstack dengan Laravel & JavaScript |
| 🖥️ **System Development** | Pengembangan sistem informasi dan manajemen database |
| 📡 **IoT (Internet of Things)** | Eksplorasi integrasi hardware & software untuk solusi cerdas |
| 🎨 **UI/UX Design** | Merancang antarmuka yang intuitif, responsif, dan user-friendly |
| ️ **Database Architecture** | Perancangan struktur database yang efisien dan scalable |

---

## 📊 GitHub Activity

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=imanuelayubflabianos&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=ff3366&icon_color=00f0ff&text_color=00f0ff" alt="GitHub Stats" width="420"/>
  <img src="https://github-readme-streak-stats.herokuapp.com?user=imanuelayubflabianos&theme=radical&hide_border=true&background=0d1117&ring=ff3366&fire=00f0ff&currStreakLabel=00f0ff" alt="GitHub Streak" width="420"/>
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=imanuelayubflabianos&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=ff3366&text_color=00f0ff" alt="Top Languages" width="380"/>
</p>

---

## 🚀 Build Log & Repositories

> *"Code a little every day, and one day you'll build something great."*

| # | Proyek | Deskripsi | Stack |
|---|--------|-----------|-------|
| 1 |  **Portfolio Website** | Website portofolio pribadi | HTML5, CSS3, JavaScript |
| 2 | 🗄️ **Sistem Informasi** | Aplikasi manajemen berbasis web | PHP, Laravel, MySQL |
| 3 | 📡 **IoT Project** | Proyek integrasi IoT & monitoring | PHP, JavaScript, MySQL |
| 4 | 🎨 **UI/UX Design** | Koleksi desain antarmuka | Figma |
| 5 |  **Learning Repo** | Catatan & eksperimen belajar | Multi-stack |

> 💡 **Catatan:** Update link repositori di atas dengan URL repositori publik Anda yang sebenarnya.

---

## 📬 Connect With Me

<p align="center">
  <a href="https://github.com/imanuelayubflabianos" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="mailto:your-email@example.com" target="_blank">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
</p>

---

<p align="center">
  <sub>Built with ❤️ by <b>Imanuel Ayub Flabianos</b> | © 2026</sub>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=imanuelayubflabianos&color=00f0ff&style=for-the-badge&label=PROFILE+VIEWS" alt="Profile Views"/>
</p>
