// Erzeugt Produkt-Illustrationen (SVG + PNG), OG-Bild, Logo-PNG und Favicon.
// Aufruf: node scripts/bilder.mjs   (Platzhalter bis echte Produktfotos da sind)
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = 'public/images/produkte';
mkdirSync(OUT, { recursive: true });

const T = '#1E3328', K = '#F3EFE8', G = '#D9682B';

const flasche = (x, y, s, nr, name, farbe) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="100" cy="402" rx="88" ry="10" fill="#1E3328" opacity=".12"/>
  <rect x="62" y="0" width="76" height="58" rx="6" fill="#B98D5E"/>
  <rect x="62" y="0" width="76" height="58" rx="6" fill="url(#holz)"/>
  <rect x="72" y="56" width="56" height="26" fill="#5A3416"/>
  <path d="M72 80 C72 104 18 112 18 150 L18 380 Q18 400 38 400 L162 400 Q182 400 182 380 L182 150 C182 112 128 104 128 80 Z" fill="#6B3A14"/>
  <path d="M72 80 C72 104 18 112 18 150 L18 380 Q18 400 38 400 L162 400 Q182 400 182 380 L182 150 C182 112 128 104 128 80 Z" fill="url(#glas)"/>
  <rect x="30" y="178" width="140" height="176" rx="5" fill="#F7F2E9"/>
  <rect x="30" y="178" width="140" height="14" rx="3" fill="${farbe}"/>
  <path d="M60 238 L84 214 L96 226 L112 206 L140 238" fill="none" stroke="${T}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="112" cy="206" r="4.5" fill="${G}"/>
  <text x="100" y="268" text-anchor="middle" font-family="Georgia, serif" font-size="13" letter-spacing="3" fill="${T}">ALMGLUT</text>
  <text x="100" y="296" text-anchor="middle" font-family="Georgia, serif" font-size="21" font-style="italic" fill="${T}">${name}</text>
  <text x="100" y="320" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" letter-spacing="1.5" fill="#6B6A63">${nr}  ·  AUFGUSS</text>
  <text x="100" y="340" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" fill="#6B6A63">100 ml</text>
  <path d="M30 150 Q34 128 52 118" stroke="#fff" stroke-width="5" opacity=".18" fill="none" stroke-linecap="round"/>
</g>`;

const defs = `
<defs>
  <linearGradient id="glas" x1="0" x2="1">
    <stop offset="0" stop-color="#2B1305" stop-opacity=".55"/>
    <stop offset=".35" stop-color="#C46A2A" stop-opacity=".25"/>
    <stop offset=".7" stop-color="#2B1305" stop-opacity=".2"/>
    <stop offset="1" stop-color="#1A0B02" stop-opacity=".6"/>
  </linearGradient>
  <linearGradient id="holz" x1="0" x2="1">
    <stop offset="0" stop-color="#7A5530" stop-opacity=".5"/>
    <stop offset=".5" stop-color="#E2C49B" stop-opacity=".25"/>
    <stop offset="1" stop-color="#5E3F20" stop-opacity=".55"/>
  </linearGradient>
  <radialGradient id="licht" cx=".5" cy=".42" r=".6">
    <stop offset="0" stop-color="#FFFDF9"/><stop offset="1" stop-color="${K}"/>
  </radialGradient>
</defs>`;

const buehne = (inhalt, akzent) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">${defs}
<rect width="800" height="800" fill="url(#licht)"/>
<path d="M0 620 L190 430 L290 520 L430 360 L620 560 L800 420 L800 800 L0 800 Z" fill="${akzent}" opacity=".10"/>
<path d="M0 690 L230 520 L380 610 L520 500 L800 660 L800 800 L0 800 Z" fill="${T}" opacity=".06"/>
${inhalt}</svg>`;

const duefte = [
  { slug: 'zirbe', nr: 'No. 1', name: 'Zirbe', farbe: '#B5793F' },
  { slug: 'latschenkiefer', nr: 'No. 2', name: 'Latsche', farbe: '#3D6B4F' },
  { slug: 'heublume', nr: 'No. 3', name: 'Heublume', farbe: '#C29A2E' },
  { slug: 'bergminze', nr: 'No. 4', name: 'Bergminze', farbe: '#4F8F8C' },
];

const jobs = [];
for (const d of duefte) {
  jobs.push([d.slug, buehne(flasche(260, 100, 1.4, d.nr, d.name, d.farbe), d.farbe)]);
}

// Almbox: Box mit 4 Flaschen
const almbox = buehne(`
  <rect x="110" y="470" width="580" height="210" rx="10" fill="${T}"/>
  <rect x="110" y="470" width="580" height="30" fill="#162A20"/>
  <text x="400" y="600" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="10" fill="${K}">ALMBOX</text>
  <text x="400" y="636" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" letter-spacing="3" fill="#C9A57A">4 ALPINE SAUNAAUFGÜSSE</text>
  ${duefte.map((d, i) => flasche(140 + i * 132, 200, 0.66, d.nr, d.name, d.farbe)).join('')}
`, G);
jobs.push(['almbox-geschenkset', almbox]);

// Probierset: 4 kleine Fläschchen in Holzbank
const klein = (x, d) => `
<g transform="translate(${x} 300)">
  <rect x="30" y="0" width="40" height="34" rx="4" fill="#B98D5E"/>
  <rect x="38" y="32" width="24" height="16" fill="#5A3416"/>
  <rect x="14" y="46" width="72" height="200" rx="12" fill="#6B3A14"/>
  <rect x="14" y="46" width="72" height="200" rx="12" fill="url(#glas)"/>
  <rect x="20" y="110" width="60" height="96" rx="3" fill="#F7F2E9"/>
  <rect x="20" y="110" width="60" height="9" fill="${d.farbe}"/>
  <text x="50" y="152" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="${T}">${d.nr.replace('No. ', 'N°')}</text>
  <text x="50" y="176" text-anchor="middle" font-family="Georgia, serif" font-size="10.5" font-style="italic" fill="${T}">${d.name}</text>
  <text x="50" y="194" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="7.5" fill="#6B6A63">15 ml</text>
</g>`;
const probierset = buehne(`
  <rect x="150" y="530" width="500" height="44" rx="8" fill="#B98D5E"/>
  <rect x="150" y="530" width="500" height="44" rx="8" fill="url(#holz)"/>
  <ellipse cx="400" cy="590" rx="270" ry="12" fill="${T}" opacity=".12"/>
  ${duefte.map((d, i) => klein(190 + i * 110, d)).join('')}
  <text x="400" y="650" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" letter-spacing="4" fill="${T}">PROBIERSET · 4 × 15 ML</text>
`, '#C9A57A');
jobs.push(['probierset', probierset]);

for (const [slug, svg] of jobs) {
  writeFileSync(`${OUT}/${slug}.svg`, svg);
  await sharp(Buffer.from(svg)).resize(1200, 1200).png({ compressionLevel: 9 }).toFile(`${OUT}/${slug}.png`);
}

// Logo / Favicon
const zeichen = (farbe, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${bg ? `<rect width="64" height="64" rx="14" fill="${bg}"/>` : ''}
<path d="M10 46 L25 27 L32 35 L42 21" fill="none" stroke="${farbe}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M42 21 L55 46" fill="none" stroke="${farbe}" stroke-width="3.6" stroke-linecap="round" opacity=".5"/>
<circle cx="42" cy="21" r="5.5" fill="${G}"/></svg>`;
writeFileSync('public/favicon.svg', zeichen(K, T));
await sharp(Buffer.from(zeichen(K, T))).resize(512, 512).png().toFile('public/images/almglut-logo.png');

// OG-Bild 1200×630
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">${defs}
<rect width="1200" height="630" fill="${T}"/>
<path d="M0 520 L260 300 L400 420 L600 220 L840 470 L1200 260 L1200 630 L0 630 Z" fill="#2A4637"/>
<path d="M0 580 L320 430 L520 520 L760 410 L1200 560 L1200 630 L0 630 Z" fill="#16261D"/>
<circle cx="600" cy="220" r="14" fill="${G}"/>
<text x="80" y="150" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="14" fill="${K}">ALMGLUT</text>
<text x="80" y="250" font-family="Georgia, serif" font-size="66" fill="${K}">Die Alm in</text>
<text x="80" y="330" font-family="Georgia, serif" font-size="66" font-style="italic" fill="${K}">deiner Sauna.</text>
<text x="80" y="390" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#C9A57A">Alpine Saunaaufgüsse aus Österreich</text>
${flasche(880, 120, 0.92, 'No. 1', 'Zirbe', '#B5793F')}
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/images/og-almglut.png');
console.log('Bilder erzeugt:', jobs.length);
