import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const site = 'https://sy-serendipity.org';

function pageFileForUrl(url: string): string {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, '');
  return `src/pages/${path === '' ? 'index' : path}.astro`;
}

function gitLastModified(file: string): string | undefined {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
    }).trim();
    return out || undefined;
  } catch (error) {
    console.warn(`[sitemap] no git lastmod for ${file} (shallow clone?)`, error);
    return undefined;
  }
}

export default defineConfig({
  site,
  output: 'static',
  adapter: cloudflare({ imageService: 'passthrough' }),
  session: false,
  build: { format: 'directory' },
  integrations: [
    react(),
    sitemap({
      serialize: (item) => ({ ...item, lastmod: gitLastModified(pageFileForUrl(item.url)) }),
    }),
  ],
  server: { port: 7734, allowedHosts: ['sy-serendipity.test', 'sy-serendipity.mini.jkrumm.com'] },
  vite: {
    plugins: [tailwindcss()],
    server: {
      strictPort: true,
      allowedHosts: ['sy-serendipity.test', 'sy-serendipity.mini.jkrumm.com'],
    },
    css: {
      modules: { localsConvention: 'camelCase' },
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
        },
      },
    },
  },
});
