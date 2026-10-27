/**
 * Cloudflare Worker: Contact Form API dengan Verifikasi Cloudflare Turnstile
 * 
 * Hostname Target: imanuelayubflabianos.github.io
 * Endpoint: POST /api/contact
 * 
 * PERINGATAN KEAMANAN:
 * Secret Key Turnstile (TURNSTILE_SECRET_KEY) HANYA disimpan di Environment Secrets Cloudflare Worker,
 * JANGAN PERNAH dimasukkan ke repository Git, file JSX, atau frontend.
 */

// Hostname yang diizinkan untuk verifikasi token Turnstile
const ALLOWED_HOSTNAMES = [
  'imanuelayubflabianos.github.io',
  'localhost',
  '127.0.0.1'
];

// Origin yang diizinkan untuk CORS
const ALLOWED_ORIGINS = [
  'https://imanuelayubflabianos.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173'
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://imanuelayubflabianos.github.io',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(data, status = 200, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request);

    // Tangani Preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    const url = new URL(request.url);

    // Hanya layani POST pada /api/contact
    if (request.method !== 'POST' || (url.pathname !== '/api/contact' && url.pathname !== '/')) {
      return jsonResponse({ success: false, error: 'Endpoint tidak ditemukan.' }, 404, corsHeaders);
    }

    try {
      // 1. Parse dan Validasi Input
      const body = await request.json().catch(() => null);
      if (!body) {
        return jsonResponse({ success: false, error: 'Format data request tidak valid.' }, 400, corsHeaders);
      }

      const { name, email, subject, message, turnstileToken } = body;

      // Validasi kelengkapan field
      if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
        return jsonResponse({ success: false, error: 'Nama wajib diisi (maks 100 karakter).' }, 400, corsHeaders);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
        return jsonResponse({ success: false, error: 'Format alamat email tidak valid.' }, 400, corsHeaders);
      }

      if (!subject || typeof subject !== 'string' || subject.trim().length === 0 || subject.length > 150) {
        return jsonResponse({ success: false, error: 'Subjek pesan wajib diisi (maks 150 karakter).' }, 400, corsHeaders);
      }

      if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 2000) {
        return jsonResponse({ success: false, error: 'Isi pesan wajib diisi (minimal 10 dan maksimal 2000 karakter).' }, 400, corsHeaders);
      }

      if (!turnstileToken || typeof turnstileToken !== 'string') {
        return jsonResponse({ success: false, error: 'Token Turnstile tidak ditemukan. Silakan verifikasi CAPTCHA.' }, 400, corsHeaders);
      }

      // 2. Verifikasi Turnstile ke Cloudflare Siteverify API
      const secretKey = env.TURNSTILE_SECRET_KEY;
      if (!secretKey) {
        // Jika secret key belum diset di Cloudflare Worker env
        return jsonResponse({
          success: false,
          error: 'Konfigurasi server belum lengkap: TURNSTILE_SECRET_KEY belum diatur di Worker Secrets.'
        }, 500, corsHeaders);
      }

      const clientIp = request.headers.get('CF-Connecting-IP') || '';

      const verifyFormData = new FormData();
      verifyFormData.append('secret', secretKey);
      verifyFormData.append('response', turnstileToken);
      if (clientIp) {
        verifyFormData.append('remoteip', clientIp);
      }

      const siteverifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const siteverifyRes = await fetch(siteverifyUrl, {
        method: 'POST',
        body: verifyFormData
      });

      if (!siteverifyRes.ok) {
        return jsonResponse({
          success: false,
          error: 'Gagal menghubungi server verifikasi Turnstile.'
        }, 502, corsHeaders);
      }

      const siteverifyData = await siteverifyRes.json();

      // Cek apakah verifikasi sukses
      if (!siteverifyData.success) {
        return jsonResponse({
          success: false,
          error: 'Verifikasi keamanan Turnstile gagal atau token telah kedaluwarsa. Silakan coba lagi.'
        }, 403, corsHeaders);
      }

      // Cek hostname token untuk mencegah token abuse dari domain lain
      if (siteverifyData.hostname && !ALLOWED_HOSTNAMES.includes(siteverifyData.hostname)) {
        return jsonResponse({
          success: false,
          error: `Hostname tidak diizinkan: ${siteverifyData.hostname}`
        }, 403, corsHeaders);
      }

      // 3. Pengiriman Email (Opsional melalui Resend API atau MailChannels)
      // Jika RESEND_API_KEY dikonfigurasi di Worker Secrets:
      if (env.RESEND_API_KEY) {
        const emailPayload = {
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['imanuelayub0309@gmail.com'],
          reply_to: email.trim(),
          subject: `[Portfolio Contact] ${subject.trim()} - dari ${name.trim()}`,
          text: `Nama: ${name.trim()}\nEmail: ${email.trim()}\nSubjek: ${subject.trim()}\n\nPesan:\n${message.trim()}\n\n---\nVerifikasi: Cloudflare Turnstile Valid\nWaktu: ${new Date().toISOString()}`
        };

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        if (!resendResponse.ok) {
          const resendErr = await resendResponse.text();
          console.error('Gagal mengirim email via Resend:', resendErr);
          return jsonResponse({
            success: false,
            error: 'Verifikasi berhasil tetapi layanan pengiriman email mengalami gangguan. Silakan hubungi langsung ke imanuelayub0309@gmail.com.'
          }, 500, corsHeaders);
        }
      }

      // 4. Sukses
      return jsonResponse({
        success: true,
        message: 'Pesan Anda berhasil dikirim dan diverifikasi dengan aman! Terima kasih telah menghubungi.'
      }, 200, corsHeaders);

    } catch (err) {
      console.error('Worker internal error:', err);
      return jsonResponse({
        success: false,
        error: 'Terjadi kesalahan internal pada server backend.'
      }, 500, corsHeaders);
    }
  }
};

