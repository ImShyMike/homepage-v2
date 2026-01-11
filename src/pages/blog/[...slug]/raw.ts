import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function getStaticPaths() {
    const posts = await getCollection('blog');
    return posts.map((post) => ({
        params: { slug: post.id },
        props: post,
    }));
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

    return new Response(post.body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
