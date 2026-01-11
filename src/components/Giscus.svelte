<script lang="ts">
    import Giscus from '@giscus/svelte';

    let theme = $derived.by(() => {
        return document?.documentElement?.dataset?.theme === 'light'
            ? 'catppuccin_latte'
            : 'catppuccin_mocha';
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
