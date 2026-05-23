
import { fetchReviews, ReviewResult } from "@/lib/woocommerce/reviews";
import TestimonialCarousel from "./testimonials";
import { getLocale, getMessages } from "next-intl/server";

// Fallback static data for avatars and verification status
const STATIC_REVIEW_METADATA = [
    {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
        verified: true,
    },
    {
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
        verified: true,
    },
    {
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop",
        verified: false,
    },
];

export function getFallbackReviews(dict: any): ReviewResult[] {
    const translatedReviews = dict.home.testimonials.fallbackReviews || [];
    return translatedReviews.map((review: any, index: number) => ({
        ...review,
        id: review.id || index + 1,
        avatar: STATIC_REVIEW_METADATA[index]?.avatar || "",
        verified: STATIC_REVIEW_METADATA[index]?.verified ?? false,
    }));
}

export default async function TestimonialsSection() {
    const [resolvedLang, dict] = await Promise.all([
        getLocale(),
        getMessages(),
    ]);

    let reviews: ReviewResult[] = [];

    try {
        reviews = await fetchReviews(10, 1, resolvedLang);
    } catch (err) {
        console.error("TestimonialsSection: failed to fetch reviews:", err);
    }

    if (reviews.length === 0) {
        reviews = getFallbackReviews(dict);
    }

    return <TestimonialCarousel reviews={reviews} dict={dict} />;
}
