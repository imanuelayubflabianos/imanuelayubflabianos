/**
 * KONFIGURASI APLIKASI
 * Nilai dibaca otomatis dari file .env (lokal) atau GitHub Actions Environment (produksi).
 */

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://api.web3forms.com/submit';



