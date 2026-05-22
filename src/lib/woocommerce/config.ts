const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || process.env.WOOCOMMERCE_URL || '';

export const WP_API_URL = `${WOOCOMMERCE_URL}/wp-json/wp/v2/posts`;
export const WC_STORE_URL = `${WOOCOMMERCE_URL}/wp-json/wc/store/products`;

// WooCommerce REST API v3 — supports wpml_language for server-side WPML filtering
export const WC_API_BASE = `${WOOCOMMERCE_URL}/wp-json/wc/v3`;

/**
 * Returns a Base64-encoded Basic Auth header from the WooCommerce consumer credentials.
 * Safe to use server-side only (never exposed to the client).
 */
export function getWcAuthHeader(): string {
    const key = process.env.WOOCOMMERCE_CONSUMER_KEY ?? '';
    const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET ?? '';
    if (!key || !secret) {
        console.warn('WOOCOMMERCE_CONSUMER_KEY or WOOCOMMERCE_CONSUMER_SECRET is not set');
    }
    return 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');
}
