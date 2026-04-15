export function getAuthHeaders(): Record<string, string> {
    const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!key || !secret) {
        throw new Error('WooCommerce Consumer Key or Secret is missing in environment variables.');
    }

    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    return {
        Authorization: `Basic ${auth}`,
    };
}