import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /danke/

# KI-Suchmaschinen ausdrücklich erlaubt (GEO)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
