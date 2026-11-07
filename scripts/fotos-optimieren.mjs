// Erzeugt responsive Varianten der Stockfotos: {name}-640/-1080/-1600.webp (AVIF-artige Kompression via WebP q60)
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
const dir = 'public/images/stock';
const quellen = readdirSync(dir).filter((f) => /^[a-z-]+\.webp$/.test(f) && !/-(sm|640|1080|1600)\.webp$/.test(f));
for (const f of quellen) {
  const name = f.replace('.webp', '');
  for (const w of [640, 1080, 1600]) {
    await sharp(`${dir}/${f}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: w === 640 ? 58 : 62, effort: 6, smartSubsample: true }).toFile(`${dir}/${name}-${w}.webp`);
  }
}
console.log(quellen.length, 'Fotos optimiert');
