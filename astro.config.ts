import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const site = 'https://sy-serendipity.org';

// PORT lets parallel worktrees run side by side (7734 is the main checkout, see the Caddyfile).
const port = Number(process.env.PORT ?? 7734);
// Leading dot = the host and every subdomain: Caddy .test doors and their tailnet mirrors.
const allowedHosts = ['.test', '.mini.jkrumm.com'];

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
  server: { port, allowedHosts },
  vite: {
    plugins: [tailwindcss()],
    // The workerd dev runner crashes when this dep is discovered late and re-optimized.
    ssr: { optimizeDeps: { include: ['astro/assets/services/noop'] } },
    server: { strictPort: true, allowedHosts },
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
