const WP_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;

function getAuthHeaders() {
    const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!key || !secret) {
        throw new Error('WooCommerce Consumer Key or Secret is missing.');
    }

    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    return {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
    };
}

export interface WCReview {
    id: number;
    product_id: number;
    status: string;
    reviewer: string;
    reviewer_email: string;
    review: string;           // HTML content
    rating: number;           // 0-5
    verified: boolean;
    reviewer_avatar_urls: {
        '24': string;
        '48': string;
        '96': string;
    };
    date_created: string;
}

export interface ReviewResult {
    id: number;
    rating: number;
    /** Plain text content (HTML stripped) */
    content: string;
    author: string;
    /** 96px avatar URL */
    avatar: string;
    verified: boolean;
    date: string;
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Fetch approved product reviews from WooCommerce REST API.
 * Requires WOOCOMMERCE_CONSUMER_KEY + WOOCOMMERCE_CONSUMER_SECRET env vars.
 * Server-side only.
 */
export async function fetchReviews(
    perPage: number = 10,
    page: number = 1,
    lang?: string
): Promise<ReviewResult[]> {
    try {
        // Defense-in-depth: middleware already returns 410 for page > 50,
        // so this guard only fires for internal/bypassed calls.
        const MAX_PAGE_LIMIT = 50;
        if (page > MAX_PAGE_LIMIT) {
            console.warn(`[fetchReviews] Blocked deep-pagination crawler: page=${page}`);
            return [];
        }

        const language = lang || 'en';
        const params = new URLSearchParams({
            per_page: perPage.toString(),
            page: page.toString(),
            status: 'approved',
            wpml_language: language,
        });

        const response = await fetch(
            `${WP_URL}/wp-json/wc/v3/products/reviews?${params.toString()}`,
            {
                headers: getAuthHeaders(),
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            console.error('fetchReviews failed:', response.status, await response.text());
            return [];
        }

        const data: WCReview[] = await response.json();

        return data.map((review) => ({
            id: review.id,
            rating: review.rating,
            content: stripHtml(review.review),
            author: review.reviewer,
            avatar: review.reviewer_avatar_urls?.['96'] || '',
            verified: review.verified,
            date: new Date(review.date_created).toLocaleDateString('en-IE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        }));
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error('Error fetching reviews:', error);
        return [];
    }
}

/**
 * Fetch approved reviews for a specific product by its numeric WC product ID.
 * Server-side only.
 */
export async function fetchReviewsByProductId(
    productId: number,
    perPage: number = 20,
    page: number = 1
): Promise<ReviewResult[]> {
    try {
        const MAX_PAGE_LIMIT = 50;
        if (page > MAX_PAGE_LIMIT) {
            console.warn(`[fetchReviewsByProductId] Blocked request for excessive page number: ${page}`);
            return [];
        }

        const params = new URLSearchParams({
            product: productId.toString(),
            per_page: perPage.toString(),
            page: page.toString(),
            status: 'approved',
        });

        const response = await fetch(
            `${WP_URL}/wp-json/wc/v3/products/reviews?${params.toString()}`,
            {
                headers: getAuthHeaders(),
                next: { revalidate: 3600 }
            }
        );

        if (!response.ok) {
            console.error('fetchReviewsByProductId failed:', response.status);
            return [];
        }

        const data: WCReview[] = await response.json();

        return data.map((review) => ({
            id: review.id,
            rating: review.rating,
            content: stripHtml(review.review),
            author: review.reviewer,
            avatar: review.reviewer_avatar_urls?.['96'] || '',
            verified: review.verified,
            date: new Date(review.date_created).toLocaleDateString('en-IE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        }));
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error('Error fetching product reviews:', error);
        return [];
    }
}
