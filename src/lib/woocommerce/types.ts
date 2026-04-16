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