/**
 * KONFIGURASI PUBLIK WEBSITE (Aman untuk frontend)
 * 
 * 1. TURNSTILE_SITE_KEY:
 *    Salin "Site Key" publik dari tab Cloudflare Turnstile kamu dan tempelkan di sini.
 *    (Jika dibiarkan default, sistem menggunakan test-key Cloudflare yang selalu pass).
 * 
 * 2. CONTACT_ENDPOINT:
 *    URL Cloudflare Worker yang kamu deploy (misal: https://portfolio-contact-api.<subdomain>.workers.dev/api/contact).
 *    (Jika masih kosong, web menyediakan tombol otomatis kirim via Gmail agar pesan tidak hilang).
 */

export const TURNSTILE_SITE_KEY = 
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFoYoeOj3yBXvIf2';

export const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT || '';

