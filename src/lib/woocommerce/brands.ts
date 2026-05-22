import { AttributeTerm, Brand, Category, WcV3Product } from './types';
import { getWcAuthHeader, WC_API_BASE } from './config';

/**
 * Fetch all brands from WooCommerce brands API
 * Used for PartsFinder and filtering
 */
async function fetchAllBrandsRaw(lang?: string): Promise<Brand[]> {
    const language = lang || 'en';
    const authHeader = getWcAuthHeader();

    const params = new URLSearchParams({
        per_page: '100',
        page: '1',
        hide_empty: 'true',
        wpml_language: language
    });

    const response = await fetch(`${WC_API_BASE}/products/brands?${params.toString()}`, {
        headers: { Authorization: authHeader },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        console.error(`Failed to fetch brands: ${response.status}`);
        throw new Error('Failed to fetch brands');
    }

    const brands: Brand[] = await response.json();
    return brands;
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

export async function fetchCategoriesByBrand(brandId: number, lang?: string): Promise<Category[]> {
    try {
        const language = lang || 'en';
        const authHeader = getWcAuthHeader();

        // Fetch products for this brand
        const params = new URLSearchParams({
            per_page: '100',
            brand: brandId.toString(),
            wpml_language: language
        });

        const url = `${WC_API_BASE}/products?${params.toString()}`;
        const response = await fetch(url, {
            headers: { Authorization: authHeader },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`Failed to fetch products for brand ${brandId}:`, response.status);
            return [];
        }

        const products: WcV3Product[] = await response.json();

        // Extract unique categories from products
        const categoryMap = new Map<number, Category>();
        for (const product of products) {
            for (const cat of product.categories) {
                if (!categoryMap.has(cat.id)) {
                    categoryMap.set(cat.id, {
                        id: cat.id,
                        name: cat.name,
                        slug: cat.slug,
                        count: 0,
                        parent: 0,
                        link: cat.link
                    });
                }
            }
        }

        return Array.from(categoryMap.values());
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error(`Error fetching categories for brand ${brandId}:`, error);
        return [];
    }
}

async function fetchAttributeTerms(attributeId: number, lang?: string, include?: number[]): Promise<AttributeTerm[]> {
    try {
        const language = lang || 'en';
        const authHeader = getWcAuthHeader();

        const params = new URLSearchParams({
            per_page: '100',
            hide_empty: 'true',
            wpml_language: language
        });

        if (include && include.length > 0) {
            params.set('include', include.join(','));
        }

        const url = `${WC_API_BASE}/products/attributes/${attributeId}/terms?${params.toString()}`;
        const response = await fetch(url, {
            headers: { Authorization: authHeader },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`Failed to fetch terms for attribute ${attributeId}:`, response.status);
            return [];
        }

        return await response.json();
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error(`Error fetching terms for attribute ${attributeId}:`, error);
        return [];
    }
}

export async function fetchCategories(lang?: string): Promise<Category[]> {
    try {
        const language = lang || 'en';
        const authHeader = getWcAuthHeader();

        const params = new URLSearchParams({
            per_page: '100',
            hide_empty: 'false', // Disable hide_empty for now to ensure all categories are fetched
            wpml_language: language
        });

        const url = `${WC_API_BASE}/products/categories?${params.toString()}`;
        const response = await fetch(url, {
            headers: { Authorization: authHeader },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error('Error fetching categories:', response.status);
            return [];
        }

        return await response.json();
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function fetchModelsByBrandAndCategory(brandId: number, categoryId: number, lang?: string): Promise<Category[]> {
    try {
        const language = lang || 'en';
        const authHeader = getWcAuthHeader();

        // Fetch products for this brand and category
        const params = new URLSearchParams({
            per_page: '100',
            brand: brandId.toString(),
            category: categoryId.toString(),
            wpml_language: language
        });

        const url = `${WC_API_BASE}/products?${params.toString()}`;
        const response = await fetch(url, {
            headers: { Authorization: authHeader },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`Failed to fetch products for brand ${brandId} and category ${categoryId}:`, response.status);
            return [];
        }

        const products: WcV3Product[] = await response.json();

        // Manually filter products to ensure they are in the selected category AND brand,
        // as a safeguard against the API treating brand/category as OR.
        const correctlyFilteredProducts = products.filter(p =>
            p.categories.some(cat => cat.id === categoryId) &&
            p.brands?.some(b => b.id === brandId)
        );

        // Extract model term IDs from "pa_model" attribute (ID 22) or attribute named "Model"
        const presentModelIds = new Set<number>();
        const modelNamesMap = new Map<number, string>();

        for (const product of correctlyFilteredProducts) {
            let modelAttr = null;
            if (product.attributes) {
                for (const a of product.attributes) {
                    if (
                        a.id === 22 ||
                        a.slug === 'pa_model' ||
                        a.name?.toLowerCase() === 'model' ||
                        a.name?.toLowerCase() === 'engine / model'
                    ) {
                        modelAttr = a;
                        break;
                    }
                }
            }

            if (modelAttr && modelAttr.option_ids) {
                modelAttr.option_ids.forEach((id, index) => {
                    if (id) {
                        presentModelIds.add(id);
                        if (modelAttr && modelAttr.options?.[index]) {
                            modelNamesMap.set(id, modelAttr.options[index]);
                        }
                    }
                });
            }
        }

        // If we found model IDs in attributes, fetch their full details (slugs, names)
        if (presentModelIds.size > 0) {
            const modelIdsArray = Array.from(presentModelIds);
            const allModelTerms = await fetchAttributeTerms(22, lang, modelIdsArray);

            if (allModelTerms.length > 0) {
                return allModelTerms.map(term => ({
                    id: term.id,
                    name: term.name,
                    slug: term.slug,
                    count: term.count,
                    parent: categoryId,
                }));
            }

            // Backup: if term fetch fails, use names from products
            return modelIdsArray.map(id => ({
                id,
                name: modelNamesMap.get(id) || `Model ${id}`,
                slug: (modelNamesMap.get(id) || id.toString()).toLowerCase().replace(/[\s/]+/g, '-').replace(/[^a-z0-9-]/g, ''),
                count: 0,
                parent: categoryId,
            }));
        }

        // Fallback: original logic — extract child categories (models) that are children of the selected category
        const fallbackMap = new Map<number, Category>();

        // Fetch all categories to determine parent-child relationships for fallback
        const allCategories = await fetchCategories(lang);
        const categoryMap = new Map<number, Category>();
        for (const cat of allCategories) {
            categoryMap.set(cat.id, cat);
        }

        for (const product of correctlyFilteredProducts) {
            for (const cat of product.categories) {
                const fullCat = categoryMap.get(cat.id);
                // Include if this category is a child of the selected category
                if (fullCat && fullCat.parent === categoryId) {
                    fallbackMap.set(cat.id, fullCat);
                }
            }
        }

        return Array.from(fallbackMap.values());
    } catch (error: any) {
        if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
        console.error(`Error fetching models for brand ${brandId} and category ${categoryId}:`, error);
        return [];
    }
}