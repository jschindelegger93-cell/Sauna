// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// [PLATZHALTER] Live-Domain prüfen (almglut.at / almglut.com)
export default defineConfig({
  site: 'https://almglut.at',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(danke|admin|impressum|datenschutz|agb|bildnachweis)\//.test(page),
      i18n: { defaultLocale: 'de', locales: { de: 'de-AT' } },
    }),
  ],
});
