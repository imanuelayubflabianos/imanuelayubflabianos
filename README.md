<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  PROFILE SCAN CARD — SVG INLINE (Terminal / Sci-Fi Style)          -->
<!-- ═══════════════════════════════════════════════════════════════════ -->
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
      <stop offset="50%" style="stop-color:#00f0ff;stop-opacity:0.25"/>
      <stop offset="60%" style="stop-color:#00f0ff;stop-opacity:0.08"/>
      <stop offset="100%" style="stop-color:#00f0ff;stop-opacity:0"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glowStrong">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="900" height="420" rx="12" fill="url(#bgGrad)"/>

  <!-- Border Pink/Red -->
  <rect x="3" y="3" width="894" height="414" rx="10" fill="none" stroke="#ff3366" stroke-width="2.5" filter="url(#glow)">
    <animate attributeName="stroke-opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
  </rect>

  <!-- Inner border cyan -->
  <rect x="8" y="8" width="884" height="404" rx="8" fill="none" stroke="#00f0ff" stroke-width="0.5" stroke-opacity="0.3"/>

  <!-- Corner decorations -->
  <path d="M20,20 L50,20 M20,20 L20,50" stroke="#ff3366" stroke-width="2" fill="none" filter="url(#glow)"/>
  <path d="M880,20 L850,20 M880,20 L880,50" stroke="#ff3366" stroke-width="2" fill="none" filter="url(#glow)"/>
  <path d="M20,400 L50,400 M20,400 L20,370" stroke="#ff3366" stroke-width="2" fill="none" filter="url(#glow)"/>
  <path d="M880,400 L850,400 M880,400 L880,370" stroke="#ff3366" stroke-width="2" fill="none" filter="url(#glow)"/>

  <!-- Divider line -->
  <line x1="320" y1="40" x2="320" y2="380" stroke="#00f0ff" stroke-width="0.8" stroke-opacity="0.4" stroke-dasharray="4,4"/>

  <!-- ═══ LEFT SIDE: ASCII ART SILHOUETTE ═══ -->
  <g transform="translate(30, 50)" font-family="monospace" font-size="11" fill="#00f0ff" filter="url(#glow)">
    <text x="0" y="0" fill="#ff3366" font-size="10" font-weight="bold">[ SUBJECT.SILHOUETTE ]</text>
    <text x="10" y="25" fill="#00f0ff" opacity="0.9">      ██████████      </text>
    <text x="10" y="38" fill="#00f0ff" opacity="0.9">    ██░░░░░░░░░░██    </text>
    <text x="10" y="51" fill="#00f0ff" opacity="0.9">   ██░░▓▓░░░░▓▓░░██   </text>
    <text x="10" y="64" fill="#00f0ff" opacity="0.9">   ██░░▓▓░░░░▓▓░░██   </text>
    <text x="10" y="77" fill="#00f0ff" opacity="0.9">    ██░░░░▓▓░░░░██    </text>
    <text x="10" y="90" fill="#00f0ff" opacity="0.9">     ██░░░░░░░░██     </text>
    <text x="10" y="103" fill="#00f0ff" opacity="0.9">      ██████████      </text>
    <text x="10" y="116" fill="#00f0ff" opacity="0.9">       ░░██░░░░       </text>
    <text x="10" y="129" fill="#00f0ff" opacity="0.9">   ████████████████   </text>
    <text x="10" y="142" fill="#00f0ff" opacity="0.9">  ██░░░░░░░░░░░░░░██  </text>
    <text x="10" y="155" fill="#00f0ff" opacity="0.9">  ██░░░░░░░░░░░░░░██  </text>
    <text x="10" y="168" fill="#00f0ff" opacity="0.9">  ██░░░░░░░░░░░░░░██  </text>
    <text x="10" y="181" fill="#00f0ff" opacity="0.9">   ██░░░░░░░░░░░░██   </text>
    <text x="10" y="194" fill="#00f0ff" opacity="0.9">    ██████████████    </text>
    <text x="10" y="207" fill="#00f0ff" opacity="0.9">      ██    ██        </text>
    <text x="10" y="220" fill="#00f0ff" opacity="0.9">      ██    ██        </text>
    <text x="10" y="233" fill="#00f0ff" opacity="0.9">    ██████  ██████    </text>

    <!-- Status indicator -->
    <text x="10" y="265" fill="#ff3366" font-size="9">STATUS: <tspan fill="#00ff88">ONLINE</tspan></text>
    <text x="10" y="280" fill="#ff3366" font-size="9">CLEARANCE: <tspan fill="#00f0ff">LEVEL-5</tspan></text>
    <text x="10" y="295" fill="#ff3366" font-size="9">ROLE: <tspan fill="#00f0ff">FULLSTACK DEV</tspan></text>

    <!-- Blinking cursor -->
    <rect x="10" y="305" width="8" height="12" fill="#00f0ff">
      <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/>
    </rect>
  </g>

  <!-- ═══ RIGHT SIDE: SYSTEM LOG / PROFILE DATA ═══ -->
  <g transform="translate(340, 40)" font-family="monospace" font-size="12">

    <!-- Header -->
    <text x="0" y="15" fill="#ff3366" font-size="14" font-weight="bold" filter="url(#glow)">╔══ SYSTEM PROFILE SCAN ══╗</text>

    <!-- Profile Data -->
    <text x="0" y="45" fill="#00f0ff">
      <tspan fill="#ff3366">┌─</tspan> NAME        <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Imanuel Ayub Flabianos</tspan>
    </text>
    <text x="0" y="65" fill="#00f0ff">
      <tspan fill="#ff3366">├─</tspan> USERNAME    <tspan fill="#555">::</tspan> <tspan fill="#00ff88">@imanuelayubflabianos</tspan>
    </text>
    <text x="0" y="85" fill="#00f0ff">
      <tspan fill="#ff3366">├─</tspan> ROLE        <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Fullstack Developer</tspan>
    </text>
    <text x="0" y="105" fill="#00f0ff">
      <tspan fill="#ff3366">├─</tspan> BACKGROUND  <tspan fill="#555">::</tspan> <tspan fill="#00ff88">PPLG / Software &amp; Game Dev</tspan>
    </text>
    <text x="0" y="125" fill="#00f0ff">
      <tspan fill="#ff3366">├─</tspan> LOCATION    <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Indonesia 🇮🇩</tspan>
    </text>
    <text x="0" y="145" fill="#00f0ff">
      <tspan fill="#ff3366">├─</tspan> STATUS      <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Learning &amp; Building 🚀</tspan>
    </text>
    <text x="0" y="165" fill="#00f0ff">
      <tspan fill="#ff3366">└─</tspan> FOCUS       <tspan fill="#555">::</tspan> <tspan fill="#00ff88">Web, System, IoT, UI/UX, DB</tspan>
    </text>

    <!-- Tech Stack Section -->
    <text x="0" y="195" fill="#ff3366" font-size="13" font-weight="bold">┌─── TECH STACK ───┐</text>
    <text x="0" y="215" fill="#00f0ff">
      <tspan fill="#ff3366">│</tspan> <tspan fill="#ffaa00">LANG</tspan>    <tspan fill="#555">::</tspan> PHP, JavaScript, HTML5, CSS3
    </text>
    <text x="0" y="235" fill="#00f0ff">
      <tspan fill="#ff3366">│</tspan> <tspan fill="#ffaa00">FRAME</tspan>   <tspan fill="#555">::</tspan> Laravel, Bootstrap
    </text>
    <text x="0" y="255" fill="#00f0ff">
      <tspan fill="#ff3366">│</tspan> <tspan fill="#ffaa00">DB</tspan>      <tspan fill="#555">::</tspan> MySQL
    </text>
    <text x="0" y="275" fill="#00f0ff">
      <tspan fill="#ff3366">│</tspan> <tspan fill="#ffaa00">TOOLS</tspan>   <tspan fill="#555">::</tspan> Git, GitHub, Figma, MS Office
    </text>
    <text x="0" y="295" fill="#ff3366">└──────────────────┘</text>

    <!-- System Status -->
    <text x="0" y="325" fill="#555" font-size="10">
      <tspan fill="#ff3366">[SYS]</tspan> Scanning complete <tspan fill="#555">|</tspan> <tspan fill="#00ff88">0 errors</tspan> <tspan fill="#555">|</tspan> <tspan fill="#00ff88">0 warnings</tspan>
    </text>
    <text x="0" y="345" fill="#555" font-size="10">
      <tspan fill="#ff3366">[SYS]</tspan> Profile integrity: <tspan fill="#00ff88">VERIFIED ✓</tspan>
    </text>

    <!-- Animated progress bar -->
    <text x="0" y="365" fill="#00f0ff" font-size="10">
      SCAN PROGRESS:
    </text>
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
  <g opacity="0.03">
    <line x1="0" y1="0" x2="900" y2="0" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="4" x2="900" y2="4" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="8" x2="900" y2="8" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="12" x2="900" y2="12" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="16" x2="900" y2="16" stroke="#00f0ff" stroke-width="1"/>
    <line x1="0" y1="20" x2="900" y2="20" stroke="#00f0ff" stroke-width="1"/>
  </g>

  <!-- Footer timestamp -->
  <text x="450" y="410" text-anchor="middle" font-family="monospace" font-size="9" fill="#555">
    PROFILE_SCAN v2.0 // SESSION ACTIVE // 2026
  </text>
</svg>

</div>

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  HEADER                                                            -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

<div align="center">
  <h1>👋 Hi, I'm <span style="color:#ff3366">Imanuel Ayub Flabianos</span></h1>
  <h3><em>Fullstack Developer — Learning & Building Every Day</em></h3>
</div>

<p align="center">
  <a href="https://github.com/imanuelayubflabianos">
    <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://github.com/imanuelayubflabianos">
    <img src="https://img.shields.io/badge/Status-Learning_%26_Building-00f0ff?style=for-the-badge" alt="Status"/>
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Location-Indonesia-ff3366?style=for-the-badge&logo=data:image/svg+xml;base64," alt="Location"/>
  </a>
</p>

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  ABOUT ME                                                          -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 🧑‍💻 About Me / Tentang Saya

<table>
<tr>
<td width="50%" valign="top">

### 🇮🇩 Bahasa Indonesia

Halo! Saya **Imanuel Ayub Flabianos**, seorang **Fullstack Developer** dari Indonesia. Saya saat ini menempuh pendidikan di bidang **Pengembangan Perangkat Lunak dan Gim (PPLG/RPL)**.

Saya passionate dalam membangun aplikasi web dan sistem yang fungsional, efisien, dan memiliki tampilan yang menarik. Fokus utama saya meliputi pengembangan **Web & System (Fullstack)**, **IoT**, **UI/UX Design**, serta **Database Architecture**.

Saat ini saya terus **belajar dan membangun** proyek-proyek baru untuk mengasah kemampuan dan menambah pengalaman.

</td>
<td width="50%" valign="top">

### 🇬🇧 English

Hello! I'm **Imanuel Ayub Flabianos**, a **Fullstack Developer** from Indonesia. I'm currently studying **Software & Game Development (PPLG/RPL)**.

I'm passionate about building functional, efficient, and visually appealing web applications and systems. My main focus areas include **Web & System Development (Fullstack)**, **IoT**, **UI/UX Design**, and **Database Architecture**.

I'm constantly **learning and building** new projects to sharpen my skills and gain experience.

</td>
</tr>
</table>

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  TECH STACK                                                        -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| 🖥️ **Bahasa Pemrograman** | PHP, JavaScript, HTML5, CSS3 |
| 🔧 **Framework / Library** | Laravel, Bootstrap |
| 🗄️ **Database** | MySQL |
| 🎨 **Design & Prototyping** | Figma |
| 🔀 **Version Control** | Git, GitHub |
| 📄 **Produktivitas** | Microsoft Office |
| 🌐 **Fokus Pengembangan** | Web Dev, System Dev, IoT, UI/UX, Database Architecture |

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  RESEARCH & INTERESTS                                              -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 🔬 Research & Interests

<div align="center">

| Area | Deskripsi |
|------|-----------|
| 🌐 **Web Development** | Membangun aplikasi web fullstack dengan Laravel & JavaScript |
| 🖥️ **System Development** | Pengembangan sistem informasi dan manajemen database |
| 📡 **IoT (Internet of Things)** | Eksplorasi integrasi hardware & software untuk solusi cerdas |
| 🎨 **UI/UX Design** | Merancang antarmuka yang intuitif, responsif, dan user-friendly |
| 🗄️ **Database Architecture** | Perancangan struktur database yang efisien dan scalable |

</div>

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  GITHUB STATS & ACTIVITY                                           -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 📊 GitHub Activity

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=imanuelayubflabianos&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=ff3366&icon_color=00f0ff&text_color=00f0ff"/>
  <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api?username=imanuelayubflabianos&show_icons=true&theme=radical&hide_border=true&title_color=ff3366&icon_color=00f0ff"/>
  <img src="https://github-readme-stats.vercel.app/api?username=imanuelayubflabianos&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=ff3366&icon_color=00f0ff&text_color=00f0ff" alt="GitHub Stats" width="420"/>
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-streak-stats.herokuapp.com?user=imanuelayubflabianos&theme=radical&hide_border=true&background=0d1117&ring=ff3366&fire=00f0ff&currStreakLabel=00f0ff"/>
  <source media="(prefers-color-scheme: light)" srcset="https://github-readme-streak-stats.herokuapp.com?user=imanuelayubflabianos&theme=radical&hide_border=true&ring=ff3366&fire=00f0ff&currStreakLabel=00f0ff"/>
  <img src="https://github-readme-streak-stats.herokuapp.com?user=imanuelayubflabianos&theme=radical&hide_border=true&background=0d1117&ring=ff3366&fire=00f0ff&currStreakLabel=00f0ff" alt="GitHub Streak" width="420"/>
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=imanuelayubflabianos&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=ff3366&text_color=00f0ff"/>
  <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=imanuelayubflabianos&layout=compact&theme=radical&hide_border=true&title_color=ff3366&text_color=00f0ff"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=imanuelayubflabianos&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=ff3366&text_color=00f0ff" alt="Top Languages" width="380"/>
</picture>

</div>

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  BUILD LOG & REPOSITORIES                                          -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 🚀 Build Log & Repositories

> *"Code a little every day, and one day you'll build something great."*

| # | Proyek | Deskripsi | Stack |
|---|--------|-----------|-------|
| 1 | 🌐 **[Portfolio Website](https://github.com/imanuelayubflabianos?tab=repositories)** | Website portofolio pribadi | HTML5, CSS3, JavaScript |
| 2 | 🗄️ **[Sistem Informasi](https://github.com/imanuelayubflabianos?tab=repositories)** | Aplikasi manajemen berbasis web | PHP, Laravel, MySQL |
| 3 | 📡 **[IoT Project](https://github.com/imanuelayubflabianos?tab=repositories)** | Proyek integrasi IoT & monitoring | PHP, JavaScript, MySQL |
| 4 | 🎨 **[UI/UX Design](https://github.com/imanuelayubflabianos?tab=repositories)** | Koleksi desain antarmuka | Figma |
| 5 | 📚 **[Learning Repo](https://github.com/imanuelayubflabianos?tab=repositories)** | Catatan & eksperimen belajar | Multi-stack |

> 💡 **Catatan:** Update link repositori di atas dengan URL repositori publik Anda yang sebenarnya.

---

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!--  CONNECT & FOOTER                                                  -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

## 📬 Connect With Me

<div align="center">

<a href="https://github.com/imanuelayubflabianos" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
<a href="#" target="_blank">
  <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
</a>
<a href="#" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>

</div>

---

<div align="center">

<sub> Built with ❤️ by **Imanuel Ayub Flabianos** | © 2026 </sub>

<br>

<img src="https://komarev.com/ghpvc/?username=imanuelayubflabianos&color=00f0ff&style=for-the-badge&label=PROFILE+VIEWS" alt="Profile Views"/>

</div>

<!-- ═══ Animated Snake Contribution ═══ -->
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/imanuelayubflabianos/imanuelayubflabianos/output/github-contribution-grid-snake-dark.svg"/>
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/imanuelayubflabianos/imanuelayubflabianos/output/github-contribution-grid-snake.svg"/>
    <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/imanuelayubflabianos/imanuelayubflabianos/output/github-contribution-grid-snake.svg"/>
  </picture>
</div>
