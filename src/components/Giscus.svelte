<script lang="ts">
    import Giscus from '@giscus/svelte';

    let { site }: { site: URL | undefined } = $props();

    let theme = $derived.by(() => {
        const theme =
            document?.documentElement?.dataset?.theme === 'light'
                ? 'catppuccin_latte'
                : 'catppuccin_mocha';
        return site ? `${site}giscus/${theme}.css` : theme;
    });
</script>

<Giscus
    id="giscus"
    term="blog-comments"
    repo="ImShyMike/blog"
    repoId="R_kgDOQIYt4w"
    category="General"
    categoryId="DIC_kwDOQIYt484CxA1R"
    mapping="pathname"
    strict="1"
    reactionsEnabled="1"
    emitMetadata="1"
    inputPosition="top"
    {theme}
    lang="en"
    loading="eager"
/>
