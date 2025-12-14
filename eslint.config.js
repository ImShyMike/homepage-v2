import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';
import astroConfig from './astro.config.mjs';
import eslintPluginAstro from 'eslint-plugin-astro';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

const tsStrict = ts.configs.strictTypeChecked.map(cfg => ({
	...cfg,
	files: ['**/*.{ts,tsx}'],
	languageOptions: {
		...cfg.languageOptions,
		parser: ts.parser,
		parserOptions: {
			...cfg.languageOptions?.parserOptions,
			projectService: true,
			tsconfigRootDir: import.meta.dirname
		}
	}
}));

const config = [
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	...eslintPluginAstro.configs['flat/recommended'],
	...eslintPluginAstro.configs['jsx-a11y-strict'],
	...tsStrict,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		files: ['**/*.astro'],
		languageOptions: {
			parser: eslintPluginAstro.parser,
			parserOptions: {
				parser: ts.parser,
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.astro'],
				astroConfig
			}
		}
	},
	prettier,
	...svelte.configs.prettier
];

export default config;