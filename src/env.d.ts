/// <reference types="unplugin-icons/types/astro" />

interface ImportMetaEnv {
    readonly COMMIT_SHA: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
