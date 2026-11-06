import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { S, SITE, euro } from '../lib/site';
export const GET: APIRoute = async () => {
  const p = (await getCollection('produkte')).sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
  const t = (await getCollection('themen')).sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
  const r = await getCollection('ratgeber');
  const txt = `# ${S.marke}

> ${S.beschreibung} Lieferung nach Österreich und Deutschland (${S.lieferzeit}), versandkostenfrei ab ${S.versandkostenfrei_ab} €. Gegründet 2026 in Wien von ${S.inhaber}.

## Produkte
${p.map((x) => `- [${x.data.name}](${SITE}/saunaaufguss/${x.id}/): ${euro(x.data.preis)}, ${x.data.inhalt}. ${x.data.kurz}`).join('\n')}

## Aufguss-Wissen (Ratgeber)
${t.map((x) => `- [${x.data.titel}](${SITE}/ratgeber/thema/${x.id}/): ${x.data.kurzantwort}`).join('\n')}

## Artikel
${r.map((x) => `- [${x.data.titel}](${SITE}/ratgeber/${x.id}/)`).join('\n')}

## Werkzeuge
- [Aufguss-Rechner](${SITE}/aufguss-rechner/): Wasser- und Konzentratmenge pro Aufguss nach Saunagröße (20–30 ml Wasser pro m³).
- [Duft-Finder](${SITE}/duft-finder/): Duftempfehlung in vier Fragen.

## Kontakt
- E-Mail: ${S.email}
- [Über uns](${SITE}/ueber-uns/) · [FAQ](${SITE}/faq/) · [Versand](${SITE}/versand/)

## Optional
- [Volltext für LLMs](${SITE}/llms-full.txt)
`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
