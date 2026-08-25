import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function getStaticPaths() {
    const posts = await getCollection('blog');
    return posts.map((post) => ({
        params: { slug: post.id },
        props: post,
    }));
}

export function replaceRelativePaths(content: string | undefined, slug: string): string {
    if (!content) return '';
    if (content.includes(`../../assets/blog/${slug}/`)) {
        return content.replaceAll(`../../assets/blog/${slug}/`, './');
    } else if (content.includes(`../../assets/blog/`)) {
        return content.replaceAll(`../../assets/blog/`, './');
    }
    return content;
}

export async function GET(context: APIContext) {
    const { slug } = context.params;
    if (!slug || Array.isArray(slug)) {
        return new Response('Not Found', { status: 404 });
    }

    const posts = await getCollection('blog');
    const post = posts.find((p) => p.id === slug);
    if (!post) {
        return new Response('Not Found', { status: 404 });
    }

    return new Response(replaceRelativePaths(post.body, post.id), {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
