import type { APIRoute } from 'astro';
import { getSearchItems } from '../../utils/searchData';

export const GET: APIRoute = async () => {
    const searchItems = await getSearchItems();

    return new Response(JSON.stringify(searchItems), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300, immutable',
        },
    });
};
