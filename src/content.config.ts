import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** SEO-Feldset – identisch für jede Seite und jeden Eintrag (CMS: "SEO") */
const seo = z
  .object({
    title: z.string().max(70).optional(),
    description: z.string().max(170).optional(),
    keyword: z.string().optional(),
    ogImage: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().default(false),
  })
  .default({ noindex: false });

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const produkte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/produkte' }),
  schema: z.object({
    name: z.string(),
    nummer: z.string().optional(), // "No. 1"
    kurz: z.string(), // 1-Satz-Antwort oben (GEO)
    typ: z.enum(['duft', 'set']),
    preis: z.number(),
    preisAlt: z.number().optional(),
    inhalt: z.string(), // "100 ml"
    inhaltMl: z.number(), // für Grundpreis
    anwendungen: z.number().optional(), // ca. Aufgüsse pro Flasche
    farbe: z.string().default('#1E3328'), // Akzent der Sorte
    bild: z.string(),
    duftnoten: z.array(z.string()).default([]),
    stimmung: z.array(z.string()).default([]),
    inhaltsstoffe: z.string().optional(),
    herkunft: z.string().optional(),
    dosierung: z.string().optional(),
    sicherheit: z.string().optional(), // CLP-Hinweise
    verfuegbar: z.boolean().default(false), // false = Warteliste
    shopifyVariantId: z.string().optional(), // für Shopify-Warenkorb
    gtin: z.string().optional(),
    sku: z.string(),
    reihenfolge: z.number().default(10),
    verwandt: z.array(z.string()).default([]),
    ratgeber: z.array(z.string()).default([]),
    faq,
    seo,
  }),
});

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ratgeber' }),
  schema: z.object({
    titel: z.string(),
    kurzantwort: z.string(), // 2–3 Sätze, zitierfähig
    thema: z.enum(['grundlagen', 'duftlexikon', 'heimsauna', 'saunieren', 'rituale']),
    datum: z.coerce.date(),
    aktualisiert: z.coerce.date().optional(),
    lesezeit: z.number().default(5),
    produkt: z.string().optional(), // Ziel-Produkt (Slug)
    howto: z
      .object({ name: z.string(), dauer: z.string().optional(), schritte: z.array(z.string()) })
      .optional(),
    faq,
    seo,
  }),
});

const themen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/themen' }),
  schema: z.object({
    titel: z.string(),
    navTitel: z.string(),
    kurzantwort: z.string(),
    reihenfolge: z.number(),
    produkt: z.string().optional(),
    aktualisiert: z.coerce.date(),
    faq,
    seo,
  }),
});

const seiten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seiten' }),
  schema: z.object({ titel: z.string(), aktualisiert: z.coerce.date().optional(), seo }),
});

export const collections = { produkte, ratgeber, themen, seiten };
