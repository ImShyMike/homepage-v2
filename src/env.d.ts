/// <reference types="unplugin-icons/types/astro" />

interface ImportMetaEnv {
    readonly CF_PAGES_COMMIT_SHA: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
