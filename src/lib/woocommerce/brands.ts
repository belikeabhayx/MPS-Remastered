import { Brand } from './types';
import { getWcAuthHeader, WC_API_BASE } from './config';

/**
 * Fetch all brands from WooCommerce brands API
 * Used for PartsFinder and filtering
 */
async function fetchAllBrandsRaw(lang?: string): Promise<Brand[]> {
    let allBrands: Brand[] = [];
    let page = 1;
    const perPage = 100;
    const language = lang || 'en';
    const authHeader = getWcAuthHeader();

    while (true) {
        // Fetch brands from WooCommerce brands API
        const params = new URLSearchParams({
            per_page: perPage.toString(),
            page: page.toString(),
            hide_empty: 'true',
            wpml_language: language
        });

        const response = await fetch(`${WC_API_BASE}/products/brands?${params.toString()}`, {
            headers: { Authorization: authHeader },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            if (page === 1) {
                console.error(`Failed to fetch brands: ${response.status}`);
                throw new Error('Failed to fetch brands');
            }
            break;
        }

        const brands: Brand[] = await response.json();

        if (brands.length === 0) {
            break;
        }

        allBrands = [...allBrands, ...brands];

        if (brands.length < perPage) {
            break;
        }

        page++;
    }

    return allBrands;
}

export async function fetchBrands(lang?: string): Promise<Brand[]> {
    try {
        const allBrands = await fetchAllBrandsRaw(lang);
        return allBrands;
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error('Error fetching brands:', error);
        return [];
    }
}

export async function fetchBrandBySlug(slug: string, lang?: string): Promise<Brand | null> {
    try {
        const allBrands = await fetchAllBrandsRaw(lang);

        // Find brand by slug
        const brand = allBrands.find((b: Brand) => b.slug === slug);

        return brand || null;
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error(`Error fetching brand with slug ${slug}:`, error);
        return null;
    }
}