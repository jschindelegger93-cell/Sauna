# ALMGLUT – Saunaaufguss aus Österreich

Astro + Sveltia CMS auf Netlify. Shop-Vorlage mit Ratgeber, gebaut für organisches Wachstum (SEO & GEO).

## Struktur

| Bereich | URL | Inhalt (CMS) |
| --- | --- | --- |
| Shop | `/saunaaufguss/`, `/saunaaufguss/[slug]/` | `src/content/produkte` |
| Ratgeber-Hub | `/ratgeber/` | – |
| Pillar-Seiten | `/ratgeber/thema/[thema]/` | `src/content/themen` |
| Artikel | `/ratgeber/[slug]/` | `src/content/ratgeber` |
| Werkzeuge | `/aufguss-rechner/`, `/duft-finder/` | – |
| Rechtstexte | `/impressum/` etc. | `src/content/seiten` |
| Einstellungen | – | `src/data/settings.json` |

## SEO / GEO eingebaut

- JSON-LD automatisch: Organization, WebSite, Product + Offer (Versand, Rückgabe), CollectionPage + ItemList, Article mit Autor, HowTo, FAQPage, BreadcrumbList, WebApplication, AboutPage
- Title, Description, Canonical, Open Graph, hreflang de-AT/de-DE, Sitemap, robots.txt (KI-Crawler erlaubt)
- `/llms.txt` und `/llms-full.txt` automatisch aus den Inhalten
- Jede Seite startet mit einer zitierfähigen Kurzantwort
- Interne Verlinkung: Artikel → Pillar → Produkt, Produkt → Ratgeber, verwandte Produkte

## Shopify verbinden

1. In `/admin` → Einstellungen → Shopify-Domain eintragen (z. B. `almglut.myshopify.com`).
2. Bei jedem Produkt die **Shopify Variant-ID** eintragen und **Verfügbar** aktivieren.
3. Dann wird aus „Auf die Warteliste“ automatisch „In den Warenkorb“ (Shopify-Cart-Link, Checkout bei Shopify).

## Einrichtung in 5 Schritten

1. Repo ist mit Netlify verbunden, jeder Push auf `main` baut automatisch.
2. `/admin` aufrufen, mit GitHub-Token anmelden.
3. Platzhalter ersetzen (Suche nach `[PLATZHALTER]`).
4. Domain almglut.at in Netlify verbinden, `site` in `astro.config.mjs` prüfen.
5. Google Search Console + Bing Webmaster Tools: Sitemap `https://almglut.at/sitemap-index.xml` einreichen, Google Merchant Center anlegen.

## Lokal

```
npm install
npm run dev
node scripts/bilder.mjs   # Platzhalter-Produktbilder neu erzeugen
```
