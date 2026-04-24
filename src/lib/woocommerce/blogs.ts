import { BlogPost } from "./types";

export const WP_BLOG_API_URL = `${process.env.WOOCOMMERCE_URL}/wp-json/wp/v2/posts`;

export async function fetchBlogs(page: number = 1, perPage: number = 9, lang?: string): Promise<{ posts: BlogPost[], totalPages: number }> {

    try {
        const langParam = lang ? `&lang=${lang}` : '';
        const response = await fetch(`${WP_BLOG_API_URL}?_embed&page=${page}&per_page=${perPage}${langParam}`,
            { next: { revalidate: 3600 } });

        if (!response.ok) {
            throw new Error('Failed to fetch a blogs')
        }

        // because total page contains in header
        const totalPagesHeader = response.headers.get('X-WP-TotalPages');
        // Headers are always strings
        const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 0

        const posts: BlogPost[] = await response.json();
        return { posts, totalPages };

    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error('Error fetching blogs:', error);
        return { posts: [], totalPages: 0 };
    }


}

export async function fetchBlogsBySlug(slug: string, lang?: string): Promise<BlogPost | null> {
    try {

        const langParam = lang ? `&lang=${lang}` : '';

        const response = await fetch(`${WP_BLOG_API_URL}?slug=${slug}&_embed${langParam}`, { next: { revalidate: 3600 } });

        if (!response.ok) {
            throw new Error('Failed to fetch blog post');
        }

        const posts: BlogPost[] = await response.json();

        if (posts.length > 0) {
            return posts[0];
        }

        return null;

    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error('Error fetching blog post:', error);
        return null;
    }
}