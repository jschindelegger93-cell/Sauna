// Erzeugt Produktbilder (SVG + PNG), Logo-Dateien, Favicon und OG-Bild im ALMGLUT-Design.
// Platzhalter, bis echte Produktfotos da sind. Aufruf: node scripts/bilder.mjs
import sharp from 'sharp';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const OUT = 'public/images/produkte';
mkdirSync(OUT, { recursive: true });
mkdirSync('public/images/marke', { recursive: true });

const GRAPHIT = '#1D1D1F', LEINEN = '#F1ECE3', NEBEL = '#F5F5F7';
const FONT = "Inter, 'Inter Tight', Helvetica, Arial, sans-serif";

const verlauf = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB36B"/><stop offset="1" stop-color="#D9481A"/></linearGradient>`;
const zeichen = (id, farbe = GRAPHIT) => `<path d="M30 52 L52 14 L74 52 Z" fill="url(#${id})"/><path d="M2 52 L28 6 L54 52 Z" fill="${farbe}"/>`;

// --- Flasche: Braunglas, Holzkappe, Leinen-Etikett mit Nummernsystem ---
const flasche = (x, y, s, nr, name, uid, o = {}) => {
  const et = o.etikett || LEINEN, tx = o.text || GRAPHIT, ml = o.ml || '100 ML';
  return `
<g transform="translate(${x} ${y}) scale(${s})">
  <defs>${verlauf('v' + uid)}</defs>
  <ellipse cx="100" cy="404" rx="92" ry="9" fill="#000" opacity=".10"/>
  <rect x="64" y="0" width="72" height="56" rx="7" fill="#C49A6C"/>
  <rect x="64" y="0" width="72" height="56" rx="7" fill="url(#holz)"/>
  <rect x="74" y="54" width="52" height="24" fill="#3A220F"/>
  <path d="M74 76 C74 102 20 110 20 148 L20 382 Q20 402 40 402 L160 402 Q180 402 180 382 L180 148 C180 110 126 102 126 76 Z" fill="#5C3212"/>
  <path d="M74 76 C74 102 20 110 20 148 L20 382 Q20 402 40 402 L160 402 Q180 402 180 382 L180 148 C180 110 126 102 126 76 Z" fill="url(#glas)"/>
  <rect x="32" y="168" width="136" height="196" rx="4" fill="${et}"/>
  <g transform="translate(83 190) scale(0.46)">${zeichen('v' + uid, tx)}</g>
  <text x="100" y="240" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="13.5" letter-spacing="4.2" fill="${tx}">ALMGLUT</text>
  <line x1="76" y1="254" x2="124" y2="254" stroke="${tx}" stroke-width="0.8"/>
  <text x="100" y="274" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="8.5" letter-spacing="2.4" fill="${o.glut ? '#E2622B' : tx}">${nr}</text>
  <text x="100" y="300" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="20" fill="${tx}">${name}</text>
  <text x="100" y="346" text-anchor="middle" font-family="${FONT}" font-size="7" letter-spacing="1.8" fill="${o.etikett ? '#A1A1A6' : '#6B655C'}">SAUNAAUFGUSS · ${ml}</text>
  <path d="M33 148 Q37 126 55 116" stroke="#fff" stroke-width="5" opacity=".16" fill="none" stroke-linecap="round"/>
  <rect x="160" y="150" width="6" height="220" rx="3" fill="#fff" opacity=".07"/>
</g>`;
};

const defs = `<defs>
  <linearGradient id="glas" x1="0" x2="1"><stop offset="0" stop-color="#1E0D03" stop-opacity=".6"/><stop offset=".35" stop-color="#B86426" stop-opacity=".22"/><stop offset=".7" stop-color="#1E0D03" stop-opacity=".18"/><stop offset="1" stop-color="#120700" stop-opacity=".65"/></linearGradient>
  <linearGradient id="holz" x1="0" x2="1"><stop offset="0" stop-color="#6E4A26" stop-opacity=".5"/><stop offset=".5" stop-color="#EAD3B0" stop-opacity=".25"/><stop offset="1" stop-color="#5A3B1C" stop-opacity=".55"/></linearGradient>
  <radialGradient id="buehne" cx=".5" cy=".38" r=".75"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#ECEAE6"/></radialGradient>
</defs>`;

const buehne = (inhalt) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">${defs}
<rect width="800" height="800" fill="url(#buehne)"/>${inhalt}</svg>`;

const duefte = [
  { slug: 'zirbe', nr: 'No. 1', name: 'Zirbe' },
  { slug: 'latschenkiefer', nr: 'No. 2', name: 'Latsche' },
  { slug: 'heublume', nr: 'No. 3', name: 'Heublume' },
  { slug: 'bergminze', nr: 'No. 4', name: 'Bergminze' },
];

const jobs = duefte.map((d, i) => [d.slug, buehne(flasche(250, 110, 1.5, d.nr, d.name, i))]);

// Almbox: Graphit-Box mit 4 Flaschen
jobs.push(['almbox-geschenkset', buehne(`
  <defs>${verlauf('vbox')}</defs>
  <ellipse cx="400" cy="690" rx="330" ry="14" fill="#000" opacity=".1"/>
  ${duefte.map((d, i) => flasche(118 + i * 146, 168, 0.72, d.nr, d.name, 'b' + i)).join('')}
  <rect x="96" y="470" width="608" height="214" rx="12" fill="${GRAPHIT}"/>
  <g transform="translate(330 512) scale(0.9)">${zeichen('vbox', '#F5F5F7')}</g>
  <text x="456" y="552" font-family="${FONT}" font-weight="600" font-size="36" letter-spacing="-1" fill="#F5F5F7">almglut</text>
  <text x="400" y="612" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="15" letter-spacing="7" fill="#F5F5F7">ALMBOX</text>
  <text x="400" y="642" text-anchor="middle" font-family="${FONT}" font-size="11" letter-spacing="4" fill="#A1A1A6">47° N · AUFGUSS AUS DEN ALPEN</text>
`)]);

// Probierset: 4 kleine Fläschchen
const klein = (x, d, uid) => `
<g transform="translate(${x} 300)">
  <defs>${verlauf('k' + uid)}</defs>
  <rect x="31" y="0" width="38" height="32" rx="5" fill="#C49A6C"/><rect x="31" y="0" width="38" height="32" rx="5" fill="url(#holz)"/>
  <rect x="38" y="30" width="24" height="14" fill="#3A220F"/>
  <rect x="14" y="42" width="72" height="206" rx="13" fill="#5C3212"/><rect x="14" y="42" width="72" height="206" rx="13" fill="url(#glas)"/>
  <rect x="20" y="104" width="60" height="104" rx="3" fill="${LEINEN}"/>
  <g transform="translate(38 114) scale(0.32)">${zeichen('k' + uid)}</g>
  <text x="50" y="150" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="7" letter-spacing="2" fill="${GRAPHIT}">ALMGLUT</text>
  <text x="50" y="168" text-anchor="middle" font-family="${FONT}" font-size="6" letter-spacing="1.5" fill="${GRAPHIT}">${d.nr}</text>
  <text x="50" y="186" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="11" fill="${GRAPHIT}">${d.name}</text>
</g>`;
jobs.push(['probierset', buehne(`
  <ellipse cx="400" cy="566" rx="250" ry="10" fill="#000" opacity=".1"/>
  ${duefte.map((d, i) => klein(196 + i * 104, d, i)).join('')}
  <text x="400" y="640" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="14" letter-spacing="5" fill="${GRAPHIT}">PROBIERSET · 4 × 15 ML</text>
`)]);


// No. 0 Reserve: Graphit-Etikett, kleiner (50 ml)
jobs.push(['zirbe-reserve', buehne(`
  ${flasche(280, 170, 1.2, 'No. 0 · RESERVE', 'Zirbe', 'r', { etikett: GRAPHIT, text: '#F5F5F7', ml: '50 ML', glut: true })}
  <text x="400" y="700" text-anchor="middle" font-family="${FONT}" font-size="12" letter-spacing="5" fill="#86868B">LIMITIERT · NUMMERIERT</text>
`)]);

// Holzkübel + Kelle (vektor)
const kuebel = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="130" cy="232" rx="128" ry="10" fill="#000" opacity=".1"/>
  <path d="M28 40 L50 226 Q52 232 60 232 L200 232 Q208 232 210 226 L232 40 Z" fill="#D9B98C"/>
  ${[0,1,2,3,4,5,6].map(i=>`<line x1="${48+i*28}" y1="40" x2="${62+i*23}" y2="230" stroke="#B48C5E" stroke-width="1.4" opacity=".7"/>`).join('')}
  <rect x="34" y="84" width="192" height="12" rx="3" fill="#8A8A8E"/><rect x="44" y="178" width="172" height="12" rx="3" fill="#8A8A8E"/>
  <ellipse cx="130" cy="40" rx="102" ry="16" fill="#B8B8BC"/><ellipse cx="130" cy="40" rx="92" ry="12" fill="#6E6E73"/>
  <path d="M40 30 Q130 -70 220 30" stroke="#C9A57A" stroke-width="10" fill="none" stroke-linecap="round"/>
</g>`;
const kelle = (x, y, s, r = -28) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <rect x="0" y="-7" width="300" height="14" rx="7" fill="#C9A57A"/>
  <ellipse cx="330" cy="0" rx="42" ry="34" fill="#C9A57A"/><ellipse cx="330" cy="-2" rx="32" ry="24" fill="#A47E52"/>
</g>`;
jobs.push(['ritual-set', buehne(`
  <defs>${verlauf('vrs')}</defs>
  ${kuebel(60, 300, 1.25)}
  ${kelle(150, 640, 0.95, -8)}
  ${duefte.map((d, i) => flasche(400 + i * 92, 300, 0.5, d.nr, d.name, 'rs' + i)).join('')}
  <text x="400" y="740" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="14" letter-spacing="5" fill="${GRAPHIT}">RITUAL-SET · ZIRBE</text>
`)]);

// Saunahut Loden
jobs.push(['saunahut-loden', buehne(`
  <defs>${verlauf('vh')}<linearGradient id="filz" x1="0" x2="1"><stop offset="0" stop-color="#2C2C2E"/><stop offset=".5" stop-color="#48484A"/><stop offset="1" stop-color="#1D1D1F"/></linearGradient></defs>
  <ellipse cx="400" cy="600" rx="270" ry="22" fill="#000" opacity=".12"/>
  <path d="M150 560 Q140 540 180 528 L620 528 Q660 540 650 560 Q620 590 400 594 Q180 590 150 560 Z" fill="#1D1D1F"/>
  <path d="M230 530 Q232 300 400 270 Q568 300 570 530 Z" fill="url(#filz)"/>
  <path d="M232 470 Q400 490 568 470 L570 500 Q400 520 230 500 Z" fill="#E2622B" opacity=".9"/>
  <g transform="translate(372 370) scale(0.55)">${zeichen('vh', '#F5F5F7')}</g>
  <text x="400" y="690" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="14" letter-spacing="5" fill="${GRAPHIT}">SAUNAHUT · LODEN</text>
`)]);

// Alpensalz Peeling: Glastiegel
jobs.push(['alpensalz-peeling', buehne(`
  <defs>${verlauf('vs')}</defs>
  <ellipse cx="400" cy="590" rx="210" ry="16" fill="#000" opacity=".1"/>
  <rect x="220" y="300" width="360" height="72" rx="10" fill="#C49A6C"/><rect x="220" y="300" width="360" height="72" rx="10" fill="url(#holz)"/>
  <rect x="210" y="368" width="380" height="220" rx="26" fill="#E9E6E0"/>
  <rect x="210" y="368" width="380" height="220" rx="26" fill="#fff" opacity=".35"/>
  ${Array.from({length:60},(_,i)=>`<circle cx="${230+((i*67)%340)}" cy="${400+((i*37)%170)}" r="${2+(i%3)}" fill="#fff" opacity=".8"/>`).join('')}
  <rect x="270" y="410" width="260" height="130" rx="4" fill="${LEINEN}"/>
  <g transform="translate(376 422) scale(0.46)">${zeichen('vs')}</g>
  <text x="400" y="472" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="13" letter-spacing="4" fill="${GRAPHIT}">ALMGLUT</text>
  <text x="400" y="500" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="18" fill="${GRAPHIT}">Alpensalz</text>
  <text x="400" y="524" text-anchor="middle" font-family="${FONT}" font-size="8" letter-spacing="2" fill="#6B655C">SAUNA-PEELING · 300 G</text>
`)]);

for (const [slug, svg] of jobs) {
  writeFileSync(`${OUT}/${slug}.svg`, svg);
  await sharp(Buffer.from(svg)).resize(1200, 1200).png({ compressionLevel: 9 }).toFile(`${OUT}/${slug}.png`);
  await sharp(Buffer.from(svg)).resize(1200, 1200).webp({ quality: 86 }).toFile(`${OUT}/${slug}.webp`);
}

// --- Marke: Zeichen, Logo hell/dunkel, Favicon, App-Icon ---
const mark = (farbe) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 52"><defs>${verlauf('m')}</defs>${zeichen('m', farbe)}</svg>`;
writeFileSync('public/images/marke/almglut-zeichen.svg', mark(GRAPHIT));
writeFileSync('public/images/marke/almglut-zeichen-hell.svg', mark('#F5F5F7'));
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${verlauf('i')}</defs><rect width="64" height="64" rx="14" fill="${GRAPHIT}"/><g transform="translate(9 17) scale(0.6)">${zeichen('i', '#F5F5F7')}</g></svg>`;
writeFileSync('public/favicon.svg', icon);
await sharp(Buffer.from(icon)).resize(512, 512).png().toFile('public/images/almglut-logo.png');
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');

// --- OG-Bild 1200×630: Alpenfoto + Logo ---
const foto = await sharp('public/images/stock/hero-sonnenaufgang.webp').resize(1200, 630, { fit: 'cover' }).toBuffer();
const ogOverlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs>${verlauf('o')}<linearGradient id="dunkel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".62"/><stop offset=".7" stop-color="#000" stop-opacity=".05"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#dunkel)"/>
<g transform="translate(80 92) scale(1.3)">${zeichen('o', '#FFFFFF')}</g>
<text x="190" y="152" font-family="${FONT}" font-weight="600" font-size="54" letter-spacing="-1.5" fill="#FFFFFF">almglut</text>
<text x="80" y="330" font-family="${FONT}" font-weight="600" font-size="72" letter-spacing="-2.5" fill="#FFFFFF">Die Alm in</text>
<text x="80" y="410" font-family="${FONT}" font-weight="600" font-size="72" letter-spacing="-2.5" fill="#FFFFFF">deiner Sauna.</text>
<text x="80" y="480" font-family="${FONT}" font-weight="500" font-size="20" letter-spacing="6" fill="#FFFFFF" opacity=".85">47° N · AUFGUSS AUS DEN ALPEN</text></svg>`;
await sharp(foto).composite([{ input: Buffer.from(ogOverlay) }]).png().toFile('public/images/og-almglut.png');
console.log('Bilder erzeugt:', jobs.length);
