import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

import { ANALYTICS } from './src/util/analytics';

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
  redirects: { '/about/': '/' },
  devToolbar: { enabled: false },
  adapter: netlify({
    devFeatures: { environmentVariables: false, images: true, edgeFunctions: false },
  }),
  session: false,
  build: { format: 'directory' },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/images/') && !page.includes('/admin/'),
      serialize: (item) => ({ ...item, lastmod: gitLastModified(pageFileForUrl(item.url)) }),
    }),
  ],
  server: { port, allowedHosts },
  env: {
    schema: {
      EMAIL_GATEWAY_URL: envField.string({
        context: 'server',
        access: 'public',
        default: 'https://email-gateway.jkrumm.com',
      }),
      EMAIL_GATEWAY_SECRET_KEY: envField.string({ context: 'server', access: 'secret' }),
      // Admin panel (/admin/). Optional so `astro build` works without them; the pages then
      // render a "not configured" notice.
      EMAIL_GATEWAY_READ_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      UMAMI_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      ADMIN_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
      ADMIN_SESSION_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      UMAMI_URL: envField.string({
        context: 'server',
        access: 'public',
        default: ANALYTICS.origin,
      }),
      UMAMI_WEBSITE_ID: envField.string({
        context: 'server',
        access: 'public',
        default: ANALYTICS.websiteId,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: { strictPort: true, allowedHosts },
    // Without this the dev server answers 504 for the lightbox chunk and the Gallery island never hydrates.
    optimizeDeps: { include: ['yet-another-react-lightbox'] },
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
