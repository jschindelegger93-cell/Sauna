import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { S, SITE, euro } from '../lib/site';
export const GET: APIRoute = async () => {
  const p = (await getCollection('produkte')).sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
  const t = (await getCollection('themen')).sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
  const r = await getCollection('ratgeber');
  const teile = [
    `# ${S.marke} – Volltext\n\n${S.beschreibung}\nQuelle: ${SITE}/`,
    ...p.map((x) => `## ${x.data.name} (${euro(x.data.preis)}, ${x.data.inhalt})\nURL: ${SITE}/saunaaufguss/${x.id}/\n${x.data.kurz}\nDuftnoten: ${x.data.duftnoten.join(', ')}\nDosierung: ${x.data.dosierung ?? ''}\n\n${x.body ?? ''}`),
    ...t.map((x) => `## ${x.data.titel}\nURL: ${SITE}/ratgeber/thema/${x.id}/\n${x.data.kurzantwort}\n\n${x.body ?? ''}`),
    ...r.map((x) => `## ${x.data.titel}\nURL: ${SITE}/ratgeber/${x.id}/\n${x.data.kurzantwort}\n\n${x.body ?? ''}`),
  ];
  return new Response(teile.join('\n\n---\n\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
