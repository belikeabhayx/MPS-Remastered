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