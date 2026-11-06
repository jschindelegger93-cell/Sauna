import settings from '../data/settings.json';

export const S = settings;
export const SITE = settings.url.replace(/\/$/, '');

export const abs = (pfad: string) => (pfad.startsWith('http') ? pfad : SITE + (pfad.startsWith('/') ? pfad : '/' + pfad));

export const euro = (n: number) =>
  new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(n);

export const grundpreis = (preis: number, ml: number) => `${euro((preis / ml) * 100)} / 100 ml`;

export const datum = (d: Date) =>
  new Intl.DateTimeFormat('de-AT', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

export const iso = (d: Date) => d.toISOString().slice(0, 10);

/** PNG-Variante eines Produkt-SVG (für Google, Open Graph) */
export const png = (bild: string) => bild.replace(/\.(svg|webp)$/, '.png');

/** Warenkorb-Link: Shopify-Cart-Permalink, sobald Domain + Variant-ID gesetzt sind */
export const warenkorbUrl = (variantId?: string) =>
  S.shopify.domain && variantId ? `https://${S.shopify.domain}/cart/${variantId}:1` : null;

export const THEMEN = {
  grundlagen: 'Aufguss-Grundlagen',
  duftlexikon: 'Duftlexikon',
  heimsauna: 'Heimsauna',
  saunieren: 'Richtig saunieren',
  rituale: 'Aufguss-Rituale',
} as const;

export type ThemaKey = keyof typeof THEMEN;

export const ORG_ID = SITE + '/#organisation';
export const WEB_ID = SITE + '/#website';
export const AUTOR_ID = SITE + '/ueber-uns/#julian';

export const organisation = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: S.marke,
  legalName: S.firma,
  url: SITE + '/',
  logo: { '@type': 'ImageObject', url: SITE + '/images/almglut-logo.png', width: 512, height: 512 },
  description: S.beschreibung,
  email: S.email,
  founder: { '@id': AUTOR_ID },
  address: { '@type': 'PostalAddress', addressLocality: S.ort, addressCountry: S.land },
  areaServed: [
    { '@type': 'Country', name: 'Österreich' },
    { '@type': 'Country', name: 'Deutschland' },
  ],
  sameAs: Object.values(S.social).filter(Boolean),
});

export const autor = () => ({
  '@type': 'Person',
  '@id': AUTOR_ID,
  name: S.inhaber,
  jobTitle: 'Gründer von ALMGLUT',
  url: SITE + '/ueber-uns/',
  worksFor: { '@id': ORG_ID },
  knowsAbout: ['Saunaaufguss', 'Ätherische Öle', 'Heimsauna', 'Saunadüfte'],
});

export const breadcrumbLd = (items: { name: string; href: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.href),
  })),
});

export const faqLd = (faq: { q: string; a: string }[]) =>
  faq.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;
