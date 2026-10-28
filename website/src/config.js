/**
 * KONFIGURASI PUBLIK WEBSITE (Aman untuk frontend)
 * 
 * 1. TURNSTILE_SITE_KEY:
 *    Site Key publik Cloudflare Turnstile.
 * 
 * 2. WEB3FORMS_ACCESS_KEY:
 *    Access Key Web3Forms untuk pengiriman email otomatis ke Gmail tanpa backend server mandiri.
 * 
 * 3. CONTACT_ENDPOINT:
 *    Endpoint API pengiriman formulir kontak.
 */

export const TURNSTILE_SITE_KEY = 
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFoYoeOj3yBXvIf2';

export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '59974528-386a-4dc7-b5ad-f1ab775f0dd8';

export const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT || 'https://api.web3forms.com/submit';


