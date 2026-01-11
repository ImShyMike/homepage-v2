import { getCollection } from 'astro:content';

type SearchType = 'Post' | 'Projects' | 'Page';

export type SearchItem = {
    title: string;
    description: string;
    url: string;
    type: SearchType;
    tags?: string[];
    date?: number;
};

const routes: SearchItem[] = [
    {
        title: 'Home',
        description: 'The homepage of this site',
        url: '/',
        type: 'Page',
        date: 3
    },
    {
        title: 'Projects',
        description: 'The gallery of unfinished projects',
        url: '/projects',
        type: 'Page',
        date: 2,
    },
    {
        title: 'Blog',
        description: 'Ramblings about random stuff',
        url: '/blog',
        type: 'Page',
        date: 1
    },
];

export async function getSearchItems(): Promise<SearchItem[]> {
    const posts = await getCollection('blog');
    const projects = await getCollection('projects');

    const searchItems = [
        ...routes,
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
            type: 'Projects' as const,
            tags: data.techStack ?? [],
            date: data.date.valueOf(),
        })),
    ].sort((a, b) => (b.date ?? 0) - (a.date ?? 0));

    return searchItems;
}
