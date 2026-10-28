/**
 * Multi-Language Translations Dictionary (Bilingual: ID & EN)
 * Mendukung penerjemahan menyeluruh untuk seluruh website portofolio.
 */

export const TRANSLATIONS = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      activity: 'Aktivitas',
      projects: 'Proyek',
      contact: 'Kontak',
      connect: 'Hubungi ↗',
    },
    hero: {
      active: 'Aktif',
      badgeBuilderman: 'BUILDERMAN',
      badgeRole: 'FULLSTACK DEVELOPER',
      badgeLocation: 'WNI · INDONESIA',
      bio: (
        <>
          <strong>@imanuelayubflabianos</strong> &mdash; <em>&ldquo;AKUN PERSONAL BRANDING&rdquo;</em> iDiD |
          Software Dev, Pemrograman, Analis Data, IoT, UI/UX, dan App Dev.
        </>
      ),
      githubProfile: 'Profil GitHub ↗',
      exploreWork: 'Eksplorasi Karya ↓',
      copyEmail: '✉ Salin Email',
      copied: '✓ Tersalin!',
    },
    activity: {
      eyebrow: 'METRIK & REPOSITORI',
      title: 'Aktivitas GitHub',
      titleAccent: 'Statistik.',
      subtitle: 'Kontribusi langsung, streak, dan analitik bahasa pemrograman.',
      streakTitle: '🔥 Streak Kontribusi',
      streakBadge: 'METRIK LIVE',
      streakFallback: '📊 Streak Stats dapat dilihat di profil GitHub.',
      reposTitle: '🍩 Bahasa Teratas per Repo',
      reposBadge: 'REPOSITORI',
      reposFallback: '🍩 Repos Per Language dapat dilihat di GitHub.',
      commitsTitle: '🍰 Bahasa Teratas per Komit',
      commitsBadge: 'KOMIT',
      commitsFallback: '🍰 Commit Language Breakdown dapat dilihat di GitHub.',
      statsFallback: '📈 Statistik Komit dan PR Lengkap di GitHub.',
      openRepoBtn: 'Buka Repositori ↗',
    },
    portfolioIntro: {
      title: 'Portofolio',
      quote: 'Izinkan saya memperkenalkan diri.',
      badgeGithub: 'GitHub: @imanuelayubflabianos',
      badgeStatus: 'Status: Belajar & Membangun',
      badgeLocation: 'Lokasi: Indonesia (WNI)',
    },
    about: {
      eyebrow: 'LEBIH DEKAT DENGANKU',
      title: 'Tentang',
      titleAccent: 'Saya.',
      lead: (
        <>
          Halo! Saya <strong>Imanuel Ayub Flabianos</strong>, seorang <strong>Fullstack Developer</strong> dari Indonesia.
          Saya berfokus pada bidang <strong>Pengembangan Perangkat Lunak dan Gim (Software &amp; Game Development)</strong>.
        </>
      ),
      p1: (
        <>
          Saya passionate dalam membangun aplikasi web dan sistem yang fungsional, efisien, dan memiliki tampilan yang menarik.
          Fokus utama saya meliputi pengembangan <strong>Web &amp; System (Fullstack)</strong>, <strong>IoT</strong>,{' '}
          <strong>UI/UX Design</strong>, serta <strong>Database Architecture</strong>.
        </>
      ),
      p2: (
        <>
          Saat ini saya terus <strong>belajar dan membangun</strong> proyek-proyek baru untuk mengasah kemampuan dan menambah
          pengalaman di industri teknologi perangkat lunak modern.
        </>
      ),
      badgeGithub: 'GitHub: @imanuelayubflabianos',
      badgeStatus: 'Status: Belajar & Membangun',
      badgeLocation: 'Lokasi: Indonesia (WNI)',
    },
    projects: {
      eyebrow: 'KARYA TERPILIH',
      title: 'Proyek &',
      titleAccent: 'Eksplorasi.',
      subtitle: 'Repositori open-source unggulan yang dikembangkan di GitHub.',
      badgeOpenSource: 'OPEN SOURCE',
      viewOnGithub: 'Lihat di GitHub ↗',
      viewAllRepos: 'Lihat Semua Repositori di GitHub ↗',
      loadingText: 'Memperbarui data repositori dari GitHub...',
    },
    stack: {
      eyebrow: 'KEAHLIAN & ALAT',
      title: 'Tech',
      titleAccent: 'Stack.',
      subtitle: 'Bahasa pemrograman, framework, alat, dan platform yang saya gunakan.',
      categories: {
        'Languages': 'Bahasa Pemrograman',
        'Frameworks & Libs': 'Framework & Library',
        'Databases & DevOps': 'Database & DevOps',
        'Tools & Creative': 'Alat & Kreatif',
      },
    },
    focus: {
      eyebrow: 'KEMAMPUAN UTAMA & ARSITEKTUR',
      title: 'Fokus',
      titleAccent: 'Rekayasa.',
      subtitle: 'Disiplin teknis utama, arsitektur sistem, dan target pengembangan.',
      figBadge: 'GBR. ARSITEKTUR',
      figCaption: 'Sistem arsitektur interaktif & rekayasa perangkat lunak modern.',
      items: [
        { area: 'Game Development', action: 'Membuat dan mengembangkan gim lebih banyak.', tag: 'Unity / C#' },
        { area: 'Web Applications', action: 'Membangun backend terukur dengan Laravel & PHP.', tag: 'Laravel / PHP' },
        { area: 'Database Systems', action: 'Merancang skema & kueri MySQL yang efisien.', tag: 'MySQL / DB Schema' },
        { area: 'User Interface', action: 'Membuat tata letak bersih via Figma & Bootstrap.', tag: 'Figma / UI/UX' },
        { area: 'IoT & Systems', action: 'Mengeksplorasi integrasi perangkat ke cloud.', tag: 'Hardware / Cloud' },
      ],
    },
    favorites: {
      eyebrow: 'DI LUAR PEMROGRAMAN',
      title: 'Favorit',
      titleAccent: 'Utama Saya.',
      bullet1: 'Saya suka menjelajahi teknologi baru, membuat proyek seru, dan bermain Musik',
      bullet2: 'Membaca & menulis blog teknologi kapan pun ada kesempatan.',
      bullet3: 'Pertemuan & kegiatan komunitas teknologi (Meetups & Tech events).',
      gearTitle: '⚙️ Peralatan yang saya gunakan sehari-hari',
      gearOs: 'OS: Windows, Linux',
      gearLaptop: 'Laptop: Advan Workpro Lite (i3 12th gen)',
      gearEditor: 'Editor Kode: VSCode - Editor terbaik saat ini.',
      gearStayUpdated: 'Tetap Terkini: LinkedIn, GitHub, dan lainnya.',
    },
    contact: {
      eyebrow: 'HUBUNGI SAYA',
      title: 'Mari bangun sesuatu yang',
      titleAccent: 'bermakna.',
      description:
        'Tertarik untuk berkolaborasi, mendiskusikan proyek web, atau konsultasi teknis? Kirim pesan melalui formulir aman di bawah ini (dilindungi oleh Cloudflare Turnstile) atau hubungi langsung via email dan media profesional.',
      directGmail: 'Direct Gmail:',
      copy: '📋 Salin',
      copied: '✓ Tersalin',
      formTitle: '✉️ Kirim Pesan Langsung',
      turnstileProtected: '🛡️ Dilindungi Turnstile',
      labelName: 'Nama Lengkap',
      placeholderName: 'Nama Anda',
      labelEmail: 'Alamat Email',
      placeholderEmail: 'email-anda@gmail.com',
      labelSubject: 'Subjek Pesan',
      placeholderSubject: 'Topik proyek atau pertanyaan...',
      labelMessage: 'Isi Pesan',
      placeholderMessage: 'Ceritakan detail proyek atau pertanyaan Anda...',
      turnstileLabel: 'Verifikasi Keamanan Manusia:',
      submitBtn: 'Kirim Pesan Sekarang ↗',
      submittingBtn: 'Mengirim...',
      waitCooldown: (time) => `⏳ Tunggu (${time})`,
      btnDirectGmail: 'Direct Gmail ↗',
      btnGithub: 'GitHub Profile ↗',
      btnLinkedIn: 'LinkedIn Profile ↗',
      continueMailto: '✉ Lanjutkan Kirim via Gmail Client ↗',
      // Validations and Errors
      errEmptyFields: 'Mohon lengkapi semua kolom formulir (Nama, Email, Subjek, dan Pesan).',
      errTurnstileRequired: 'Mohon selesaikan verifikasi Cloudflare Turnstile sebelum mengirim.',
      errNoEndpoint:
        'Verifikasi berhasil! Namun endpoint pengiriman belum diatur. Klik tombol di bawah untuk membuka aplikasi Gmail dengan pesan yang sudah terisi otomatis.',
      errTurnstileExpire: 'Verifikasi Turnstile kedaluwarsa. Silakan centang ulang CAPTCHA.',
      errTurnstileOffline: 'Widget Turnstile memerlukan koneksi internet untuk memverifikasi CAPTCHA.',
      errOwnerEmail: 'Mohon masukkan alamat email Anda sendiri (bukan email pemilik website).',
      errDisposableEmail: 'Alamat email sementara/disposable tidak diizinkan.',
      errInvalidEmail: 'Format email tidak valid (contoh: nama@gmail.com).',
      errDidYouMean: (sug) => `Mungkin maksud Anda @${sug}?`,
      successMessage:
        'Pesan Anda berhasil dikirim langsung ke Gmail Imanuel Ayub! Silakan tunggu sejenak jika ingin mengirim pesan lagi.',
      failedMessage: 'Pengiriman gagal. Silakan coba lagi atau kirim via tombol Direct Gmail di bawah.',
      serverError: (msg) =>
        `Gagal menghubungi server pengiriman (${msg}). Silakan hubungi via tombol Direct Gmail di bawah.`,
    },
    footer: {
      builtBy: 'Dibuat dengan ❤️ oleh',
      backToTop: 'KEMBALI KE ATAS ↑',
    },
    mobileNav: {
      home: 'Beranda',
      about: 'Tentang',
      repos: 'Karya',
      stack: 'Stack',
      contact: 'Kontak',
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      activity: 'Activity',
      projects: 'Projects',
      contact: 'Contact',
      connect: 'Connect ↗',
    },
    hero: {
      active: 'Active',
      badgeBuilderman: 'BUILDERMAN',
      badgeRole: 'FULLSTACK DEVELOPER',
      badgeLocation: 'WNI · INDONESIA',
      bio: (
        <>
          <strong>@imanuelayubflabianos</strong> &mdash; <em>&ldquo;PERSONAL BRANDING ACCOUNT&rdquo;</em> iDiD |
          Software Dev, Programming, Data Analyst, IoT, UI/UX, and App Dev.
        </>
      ),
      githubProfile: 'GitHub Profile ↗',
      exploreWork: 'Explore Work ↓',
      copyEmail: '✉ Copy Email',
      copied: '✓ Copied!',
    },
    activity: {
      eyebrow: 'METRICS & REPOSITORIES',
      title: 'GitHub Activity',
      titleAccent: 'Statistics.',
      subtitle: 'Live contributions, streak, and programming language analytics.',
      streakTitle: '🔥 Contribution Streak',
      streakBadge: 'LIVE METRICS',
      streakFallback: '📊 Streak stats can be viewed directly on GitHub profile.',
      reposTitle: '🍩 Top Languages by Repo',
      reposBadge: 'REPOSITORIES',
      reposFallback: '🍩 Repos per language breakdown can be viewed on GitHub.',
      commitsTitle: '🍰 Top Languages by Commit',
      commitsBadge: 'COMMITS',
      commitsFallback: '🍰 Commit language breakdown can be viewed on GitHub.',
      statsFallback: '📈 Detailed commits and PR statistics on GitHub.',
      openRepoBtn: 'Open Repository ↗',
    },
    portfolioIntro: {
      title: 'Portfolio',
      quote: 'Let me introduce myself.',
      badgeGithub: 'GitHub: @imanuelayubflabianos',
      badgeStatus: 'Status: Learning & Building',
      badgeLocation: 'Location: Indonesia (WNI)',
    },
    about: {
      eyebrow: 'GET TO KNOW ME',
      title: 'About',
      titleAccent: 'Me.',
      lead: (
        <>
          Hello! I&apos;m <strong>Imanuel Ayub Flabianos</strong>, a <strong>Fullstack Developer</strong> from Indonesia.
          I specialize in <strong>Software &amp; Game Development</strong>.
        </>
      ),
      p1: (
        <>
          I&apos;m passionate about building functional, efficient, and visually appealing web applications and systems. My
          main focus areas include <strong>Web &amp; System Development (Fullstack)</strong>, <strong>IoT</strong>,{' '}
          <strong>UI/UX Design</strong>, and <strong>Database Architecture</strong>.
        </>
      ),
      p2: (
        <>
          I&apos;m constantly <strong>learning and building</strong> new projects to sharpen my skills and gain valuable
          practical software engineering experience.
        </>
      ),
      badgeGithub: 'GitHub: @imanuelayubflabianos',
      badgeStatus: 'Status: Learning & Building',
      badgeLocation: 'Location: Indonesia (WNI)',
    },
    projects: {
      eyebrow: 'FEATURED REPOSITORIES',
      title: 'Projects &',
      titleAccent: 'Exploration.',
      subtitle: 'Featured public open-source software and projects developed on GitHub.',
      badgeOpenSource: 'OPEN SOURCE',
      viewOnGithub: 'View on GitHub ↗',
      viewAllRepos: 'View All Repositories on GitHub ↗',
      loadingText: 'Updating repository data from GitHub...',
    },
    stack: {
      eyebrow: 'TOOLS OF THE TRADE',
      title: 'Tech',
      titleAccent: 'Stack.',
      subtitle: 'Languages, frameworks, tools, and platforms I work with.',
      categories: {
        'Languages': 'Languages',
        'Frameworks & Libs': 'Frameworks & Libs',
        'Databases & DevOps': 'Databases & DevOps',
        'Tools & Creative': 'Tools & Creative',
      },
    },
    focus: {
      eyebrow: 'CORE CAPABILITIES & ARCHITECTURE',
      title: 'Engineering',
      titleAccent: 'Focus.',
      subtitle: 'Key technical disciplines, system architecture, and development goals.',
      figBadge: 'FIG. ARCHITECTURE',
      figCaption: 'Interactive systems architecture & modern software engineering.',
      items: [
        { area: 'Game Development', action: 'Make and Develop more Games.', tag: 'Unity / C#' },
        { area: 'Web Applications', action: 'Building scalable backends with Laravel & PHP.', tag: 'Laravel / PHP' },
        { area: 'Database Systems', action: 'Designing efficient MySQL schema & queries.', tag: 'MySQL / DB Schema' },
        { area: 'User Interface', action: 'Creating clean layouts via Figma & Bootstrap.', tag: 'Figma / UI/UX' },
        { area: 'IoT & Systems', action: 'Exploring device-to-cloud integration.', tag: 'Hardware / Cloud' },
      ],
    },
    favorites: {
      eyebrow: 'BEYOND THE CODE',
      title: 'My Absolute',
      titleAccent: 'Favorites.',
      bullet1: 'I love exploring new tech stacks and building cool stuffs, and playing Music',
      bullet2: 'Reading & writing tech blogs whenever possible.',
      bullet3: 'Meetups & Tech events.',
      gearTitle: '⚙️ Things I use to get stuff done',
      gearOs: 'OS: Windows, Linux',
      gearLaptop: 'Laptop: Advan Workpro Lite (i3 12th gen)',
      gearEditor: 'Code Editor: VSCode - The best editor out there.',
      gearStayUpdated: 'Stay Updated: LinkedIn, GitHub, and more.',
    },
    contact: {
      eyebrow: 'GET IN TOUCH',
      title: "Let's build something",
      titleAccent: 'meaningful.',
      description:
        'Interested in collaborating, discussing a web project, or technical consulting? Send a message through the secure form below (protected by Cloudflare Turnstile) or reach out directly via email and professional links.',
      directGmail: 'Direct Gmail:',
      copy: '📋 Copy',
      copied: '✓ Copied',
      formTitle: '✉️ Send a Direct Message',
      turnstileProtected: '🛡️ Turnstile Protected',
      labelName: 'Full Name',
      placeholderName: 'Your Name',
      labelEmail: 'Email Address',
      placeholderEmail: 'your-email@gmail.com',
      labelSubject: 'Subject',
      placeholderSubject: 'Project inquiry or topic...',
      labelMessage: 'Message',
      placeholderMessage: 'Tell me about your project or inquiry...',
      turnstileLabel: 'Human Security Verification:',
      submitBtn: 'Send Message Now ↗',
      submittingBtn: 'Sending...',
      waitCooldown: (time) => `⏳ Wait (${time})`,
      btnDirectGmail: 'Direct Gmail ↗',
      btnGithub: 'GitHub Profile ↗',
      btnLinkedIn: 'LinkedIn Profile ↗',
      continueMailto: '✉ Continue via Gmail Client ↗',
      // Validations and Errors
      errEmptyFields: 'Please fill in all form fields (Name, Email, Subject, and Message).',
      errTurnstileRequired: 'Please complete the Cloudflare Turnstile verification before sending.',
      errNoEndpoint:
        'Verification successful! However, the contact endpoint is not configured. Click the button below to open Gmail with pre-filled details.',
      errTurnstileExpire: 'Turnstile verification expired. Please re-check the CAPTCHA.',
      errTurnstileOffline: 'Turnstile widget requires an active internet connection to verify CAPTCHA.',
      errOwnerEmail: "Please enter your own email address (not the website owner's).",
      errDisposableEmail: 'Disposable email addresses are not permitted.',
      errInvalidEmail: 'Invalid email address format (e.g. name@gmail.com).',
      errDidYouMean: (sug) => `Did you mean @${sug}?`,
      successMessage:
        "Your message was sent successfully to Imanuel Ayub's Gmail! Please wait a moment before sending another message.",
      failedMessage: 'Failed to send message. Please try again or use the Direct Gmail button below.',
      serverError: (msg) =>
        `Failed to reach sending server (${msg}). Please contact directly via Gmail below.`,
    },
    footer: {
      builtBy: 'Built with ❤️ by',
      backToTop: 'BACK TO TOP ↑',
    },
    mobileNav: {
      home: 'Home',
      about: 'About',
      repos: 'Repos',
      stack: 'Stack',
      contact: 'Contact',
    },
  },
}
