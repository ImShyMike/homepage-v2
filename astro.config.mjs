// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import Icons from 'unplugin-icons/vite';
import remarkEmojify from './src/remark/emojify.mjs';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
    site: import.meta.env.DEV ? 'http://localhost:4321' : 'https://shymike.dev',
    trailingSlash: 'ignore',
    output: 'static',
    image: {
        domains: ['cachet.dunkirk.sh'],
    },
    vite: {
        plugins: [
            tailwindcss(),
            Icons({
                compiler: 'svelte',
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
    integrations: [
        mdx(),
        sitemap({
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date(),
        }),
        svelte(),
    ],
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
        remarkPlugins: [remarkEmojify, [remarkToc, { ordered: true, tight: true }]],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'wrap',
                    headingProperties: {
                        className: ['rehype-heading'],
                    },
                    properties: {
                        className: ['rehype-heading-link'],
                    },
                },
            ],
        ],
        shikiConfig: {
            themes: {
                light: 'catppuccin-latte',
                dark: 'catppuccin-mocha',
            },
        },
    },
});
