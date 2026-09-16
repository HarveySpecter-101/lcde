const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  const ogDir = path.join(publicDir, 'og');
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }

  // 1. Crop logo to circular bounds (188x188)
  const croppedLogo = await sharp(path.join(publicDir, 'logo-lcde.png'))
    .extract({ left: 6, top: 0, width: 188, height: 188 })
    .toBuffer();

  const circleMask = Buffer.from(
    '<svg width="188" height="188"><circle cx="94" cy="94" r="94" fill="white"/></svg>'
  );

  const maskedLogo = await sharp(croppedLogo)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. High-res logo 300x300 for banner
  const resizedLogo = await sharp(maskedLogo)
    .resize(300, 300, { kernel: 'lanczos3' })
    .toBuffer();

  // 3. Generate 1200x630 OG banner with company logo
  const svgBanner = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="42%" r="70%">
          <stop offset="0%" stop-color="#141c2e" />
          <stop offset="50%" stop-color="#0b1120" />
          <stop offset="100%" stop-color="#030712" />
        </radialGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d4af37" stop-opacity="0.25" />
          <stop offset="60%" stop-color="#c59b27" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#c59b27" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f3e7c4" stop-opacity="0.5" />
          <stop offset="50%" stop-color="#c59b27" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#8a6b18" stop-opacity="0.5" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGrad)" />

      <!-- Outer Frame -->
      <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="url(#goldBorder)" stroke-width="1.5" />

      <!-- Soft Glow behind logo -->
      <circle cx="600" cy="225" r="230" fill="url(#goldGlow)" />

      <!-- Decorative gold rings -->
      <circle cx="600" cy="225" r="172" fill="none" stroke="#d4af37" stroke-opacity="0.3" stroke-width="1.2" stroke-dasharray="6 6" />
      <circle cx="600" cy="225" r="190" fill="none" stroke="#d4af37" stroke-opacity="0.15" stroke-width="1" />

      <!-- Text Elements -->
      <text x="600" y="440" text-anchor="middle" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#FFFFFF" letter-spacing="2">
        LE CLUB DES EXPERTS
      </text>

      <text x="600" y="488" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="600" fill="#d4af37" letter-spacing="4">
        FORMATION D&apos;ÉLITE EN AUDIT &amp; FINANCE
      </text>

      <text x="600" y="530" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="400" fill="#94a3b8" letter-spacing="1">
        Casablanca · 10 Modules Pratiques · Opérationnel dès le premier jour
      </text>
    </svg>
  `);

  await sharp(svgBanner)
    .composite([
      {
        input: resizedLogo,
        top: 75,
        left: 450,
      }
    ])
    .png()
    .toFile(path.join(ogDir, 'og-image.png'));

  // 4. Also generate a clean 600x600 square logo image for WhatsApp square thumbnails
  const squareLogo = await sharp(maskedLogo)
    .resize(480, 480, { kernel: 'lanczos3' })
    .toBuffer();

  const svgSquare = Buffer.from(`
    <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sqBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#141c2e" />
          <stop offset="100%" stop-color="#030712" />
        </radialGradient>
        <radialGradient id="sqGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d4af37" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#c59b27" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#sqBg)" />
      <circle cx="300" cy="300" r="280" fill="url(#sqGlow)" />
      <circle cx="300" cy="300" r="255" fill="none" stroke="#d4af37" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="6 6" />
    </svg>
  `);

  await sharp(svgSquare)
    .composite([
      {
        input: squareLogo,
        top: 60,
        left: 60,
      }
    ])
    .png()
    .toFile(path.join(ogDir, 'logo-square.png'));

  console.log('Successfully generated og-image.png and logo-square.png!');
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
