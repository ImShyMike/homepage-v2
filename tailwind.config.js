/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Noto Sans Variable', 'sans-serif'],
                mono: ['Fira Code Variable', 'monospace'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@catppuccin/tailwindcss')({
            prefix: 'ctp',
            defaultFlavour: 'mocha',
        }),
    ],
};
