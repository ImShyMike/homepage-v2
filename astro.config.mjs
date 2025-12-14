// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    site: 'https://shymike.dev',
    trailingSlash: "ignore",
    output: 'static',
    vite: {
        plugins: [tailwindcss()],
    },
    prefetch: {
        prefetchAll: true,
    },
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    integrations: [mdx(), sitemap(), svelte()],
    env: {
      schema: {
          API_URL: envField.string({ context: "client", access: "public", optional: true }),
          PORT: envField.number({ context: "server", access: "public", default: 4321 }),
          API_SECRET: envField.string({ context: "server", access: "secret" }),
      }
    },
    markdown: {
      shikiConfig: {
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        }
      }
    }
});
