export interface BlogPost {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    date: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text?: string;
        }>;
        author?: Array<{
            name: string;
            avatar_urls?: {
                [key: string]: string;
            };
        }>;
    };
    content: {
        rendered: string;
        protected?: boolean;
    };
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    count: number;
    description?: string;
    link?: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    count: number;
    parent: number;
    description?: string;
    extra_category_description?: string;
    link?: string;
    image?: {
        id: number;
        src: string;
        name: string;
        alt: string;
    } | null;
}

export interface WcV3Product {
    id: number;
    name: string;
    slug: string;
    categories: Array<{ id: number; name: string; slug: string; link: string }>;
    brands?: Array<{ id: number; name: string; slug: string; link?: string }>;
    attributes: Array<{
        id: number;
        name: string;
        slug: string;
        options: string[];
        option_ids?: number[];
    }>;
}

export interface AttributeTerm {
    id: number;
    name: string;
    slug: string;
    count: number;
}

export interface ProductResult {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    condition: 'New' | 'Used';
    isOnSale: boolean;
    salePercentage?: number;
    availability: string;
    allowsBackorder: boolean;
    physicalStockCount: number | null;
    description?: string;
    shortDescription?: string;
    sku?: string;
    stockStatus?: string;
    stockQuantity?: number | null;
    slug: string;
    attributes?: Array<{
        id: number;
        name: string;
        taxonomy: string;
        terms: Array<{
            id: number;
            name: string;
            slug: string;
        }>;
    }>;
    brands?: Array<{
        id: number;
        name: string;
        slug: string;
        link: string;
    }>;
    categories?: Array<{
        id: number;
        name: string;
        slug: string;
        link: string;
    }>;
    averageRating: number;
    reviewCount: number;
    type?: string;
    variations?: Array<{
        id: number;
        price: number;
        originalPrice?: number;
        isOnSale: boolean;
        stockStatus: string;
        stockQuantity: number | null;
        attributes: Array<{
            id: number;
            name: string;
            slug: string;
            option: string;
        }>;
        image?: string;
    }>;
}

export interface ProductResponse {
    products: ProductResult[];
    total: number;
    totalPages: number;
}