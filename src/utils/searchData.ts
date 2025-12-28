import { getCollection } from 'astro:content';

export type SearchItem = {
    title: string;
    description: string;
    url: string;
    type: 'Post' | 'Project';
    tags?: string[];
    date?: number;
};

let cachedSearchItems: SearchItem[] | null = null;

export async function getSearchItems(): Promise<SearchItem[]> {
    const posts = await getCollection('blog');
    const projects = await getCollection('projects');

    cachedSearchItems = [
        ...posts.map(({ id, data }) => ({
            title: data.title,
            description: data.description,
            url: `/blog/${id}`,
            type: 'Post' as const,
            tags: data.tags ?? [],
            date: data.pubDate.valueOf(),
        })),
        ...projects.map(({ id, data }) => ({
            title: data.title,
            description: data.description,
            url: `/project/${id}`,
            type: 'Project' as const,
            tags: data.techStack ?? [],
            date: data.date.valueOf(),
        })),
    ].sort((a, b) => b.date - a.date);

    return cachedSearchItems;
}
