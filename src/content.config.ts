import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            tags: z.array(z.string()).optional(),
            heroImage: image().optional(),
        }),
});

const projects = defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            date: z.coerce.date(),
            link: z.string().url().optional(),
            repo: z.string().url().optional(),
            techStack: z.array(z.string()).optional(),
            heroImage: image().optional(),
        }),
});

const buttons = defineCollection({
    loader: file('./src/content/88x31.json'),
    schema: ({ image }) =>
        z
            .object({
                id: z.string(),
                link: z.string().url().optional(),
                rlink: z.string().optional(),
                image: z.union([image(), z.string().url()]),
            })
            .refine((data) => data.link || data.rlink, {
                message: "Either 'link' or 'rlink' must be provided",
            }),
});

export const collections = { blog, projects, buttons };
