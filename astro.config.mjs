// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import Icons from 'unplugin-icons/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://shymike.dev',
    trailingSlash: 'ignore',
    output: 'static',
    vite: {
        plugins: [
            tailwindcss(),
            Icons({
                compiler: 'astro',
            }),
        ],
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
            CF_PAGES_COMMIT_SHA: envField.string({
                context: 'client',
                access: 'public',
                default: 'dev',
            }),
        },
        validateSecrets: true,
    },
    markdown: {
        shikiConfig: {
            theme: 'catppuccin-mocha',
        },
    },
});
