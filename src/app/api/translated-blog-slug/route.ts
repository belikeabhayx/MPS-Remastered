import { WP_BLOG_API_URL } from '@/lib/woocommerce/blogs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Fetch with timeout + Next.js caching
 */
async function fetchWithTimeout(url: string, ms = 5000): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);

    try {
        return await fetch(url, {
            signal: controller.signal,
            next: { revalidate: 3600 }, // cache 1h
        });
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Sanitize slug
 */
function sanitizeSlug(slug: string): string {
    return slug.replace(/[^a-z0-9-]/gi, '').toLowerCase();
}

/**
 * Fetch post by slug (optionally with language)
 */
async function fetchPostBySlug(slug: string, lang?: string) {
    const params = new URLSearchParams({
        slug,
        per_page: '1',
        _fields: 'id,slug,date',
    });

    if (lang) params.set('lang', lang);

    const res = await fetchWithTimeout(`${WP_BLOG_API_URL}?${params}`);
    if (!res.ok) return null;

    const posts = await res.json();
    return posts[0] as { id: number; slug: string; date: string } | undefined ?? null;
}

/**
 * Fetch translated slug using WPML include[] trick
 */
async function fetchTranslatedSlug(postId: number, lang: string) {
    const params = new URLSearchParams({
        lang,
        per_page: '1',
        _fields: 'id,slug',
    });

    params.append('include[]', String(postId));

    const res = await fetchWithTimeout(`${WP_BLOG_API_URL}?${params}`);
    if (!res.ok) return null;

    const posts = await res.json();
    return posts[0]?.slug ?? null;
}

/**
 * Fetch post slug by date (fallback for default language)
 */
async function fetchPostByDate(date: string, lang: string) {
    // WP uses ISO dates. We search with a 2-second window to be safe.
    // WP uses local dates in the API for after/before.
    // We manually adjust the seconds to create a 2-second window.
    const dateStr = date; // e.g. "2025-11-02T15:53:20"
    const [datePart, timePart] = dateStr.split('T');
    const [h, m, s] = timePart.split(':').map(Number);

    const d = new Date(2000, 0, 1, h, m, s); // temporary date object to handle overflow
    const dAfter = new Date(d.getTime() - 1000);
    const dBefore = new Date(d.getTime() + 1000);

    const formatTime = (dateObj: Date) => dateObj.toTimeString().split(' ')[0];
    
    const after = `${datePart}T${formatTime(dAfter)}`;
    const before = `${datePart}T${formatTime(dBefore)}`;

    const params = new URLSearchParams({
        lang,
        after,
        before,
        per_page: '1',
        _fields: 'slug',
    });

    const res = await fetchWithTimeout(`${WP_BLOG_API_URL}?${params}`);
    if (!res.ok) return null;

    const posts = await res.json();
    return posts[0]?.slug ?? null;
}

/**
 * API Handler
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const rawSlug = searchParams.get('slug');
    const lang = searchParams.get('lang');
    const fromLang = searchParams.get('fromLang') || 'en';

    // ❌ Validation
    if (!rawSlug || !lang) {
        return NextResponse.json({ error: 'Missing slug or lang' }, { status: 400 });
    }

    const slug = sanitizeSlug(rawSlug);
    if (!slug) {
        return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    try {
        // 1️⃣ Get source post
        let sourcePost = await fetchPostBySlug(slug, fromLang);

        // fallback if language-specific slug not found
        if (!sourcePost && fromLang !== 'en') {
            sourcePost = await fetchPostBySlug(slug);
        }

        if (!sourcePost) {
            return NextResponse.json({ slug }); // fallback
        }

        // 2️⃣ Get translated slug (works for ALL languages including English)
        let translatedSlug = await fetchTranslatedSlug(sourcePost.id, lang);

        // 3️⃣ Fallback for default language (English) where ID-based lookup often fails
        if (!translatedSlug && sourcePost.date) {
            translatedSlug = await fetchPostByDate(sourcePost.date, lang);
        }

        if (translatedSlug) {
            return NextResponse.json({ slug: translatedSlug });
        }

        // fallback if translation not found
        return NextResponse.json({ slug });

    } catch (error) {
        console.error('Error resolving translated blog slug:', error);
        return NextResponse.json({ slug });
    }
}