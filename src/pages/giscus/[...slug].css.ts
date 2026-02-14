const themes = ['catppuccin_latte', 'catppuccin_mocha'];
const contentUrl = 'https://raw.githubusercontent.com/giscus/giscus/refs/heads/main/styles/themes/';

const customCss = `
.gsc-main {
    gap: 0px !important;
}`;

export function getStaticPaths() {
    return themes.map((theme) => ({
        params: { slug: theme },
    }));
}

export async function GET({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const themeUrl = `${contentUrl}${slug}.css`;
    const content = await fetch(themeUrl).then((res) => res.text());

    return new Response(content + customCss, {
        headers: {
            'Content-Type': 'text/css',
        },
    });
}
