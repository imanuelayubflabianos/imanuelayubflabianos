# Backend Serverless: Cloudflare Worker Contact API

Panduan deployment backend untuk memverifikasi **Cloudflare Turnstile** dan meneruskan pesan formulir kontak portofolio secara aman.

---

## 🔒 Prinsip Keamanan Utama
1. **Secret Key TIDAK PERNAH berada di frontend atau Git**: Secret Key Turnstile disimpan langsung di Cloudflare Worker Secrets via dashboard atau CLI.
2. **Server-Side Siteverify**: Token Turnstile diverifikasi secara ketat langsung ke `https://challenges.cloudflare.com/turnstile/v0/siteverify` sebelum pesan diproses.
3. **Pemeriksaan Hostname**: Memastikan token berasal dari hostname yang sah (`imanuelayubflabianos.github.io`).

---

## 🚀 Cara Deployment (Gratis via Cloudflare Workers)

### Opsi A: Menggunakan Cloudflare Dashboard (Tanpa CLI)
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Overview**.
2. Klik **Create application** > **Create Worker**.
3. Beri nama Worker (misalnya: `portfolio-contact-api`) dan klik **Deploy**.
4. Klik **Edit code**, lalu salin seluruh isi file [`worker.js`](worker.js) ke dalam editor Cloudflare, lalu klik **Save and deploy**.
5. Masuk ke tab **Settings** pada Worker tersebut > **Variables and Secrets**.
6. Klik **Add** di bagian *Worker Secrets*:
   - Name: `TURNSTILE_SECRET_KEY`
   - Value: *(Tempelkan Secret Key Turnstile kamu di sini)*
   - Klik **Deploy**.
7. *(Opsional untuk pengiriman email otomatis)*:
   - Tambahkan Secret baru: `RESEND_API_KEY` (dapatkan gratis dari [resend.com](https://resend.com/)).
8. Salin URL Worker kamu (contoh: `https://portfolio-contact-api.<subdomain>.workers.dev/api/contact`).

---

### Opsi B: Menggunakan Wrangler CLI
Jalankan di terminal dalam folder `backend/cloudflare-worker`:

```bash
# 1. Login ke Cloudflare
npx wrangler login

# 2. Tambahkan Secret Key Turnstile secara aman
npx wrangler secret put TURNSTILE_SECRET_KEY

# 3. (Opsional) Tambahkan API Key Resend untuk pengiriman email
npx wrangler secret put RESEND_API_KEY

# 4. Deploy worker
npx wrangler deploy
```

---

## 🔗 Hubungkan ke Frontend Website
Setelah Worker di-deploy dan URL didapatkan:
1. Buka file `.env` di folder `website/`:
   ```env
   VITE_TURNSTILE_SITE_KEY=0x4AAAAAA... (Site Key publik kamu)
   VITE_CONTACT_ENDPOINT=https://portfolio-contact-api.<subdomain>.workers.dev/api/contact
   ```
2. Build dan deploy website:
   ```bash
   cd website
   npm run build
   ```
Website kamu sekarang terlindungi penuh dengan Cloudflare Turnstile CAPTCHA di frontend dan verifikasi backend yang aman!

