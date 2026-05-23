'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from "next/image";
import type { ReviewResult } from '@/lib/woocommerce/reviews';
import type SwiperType from 'swiper';

// Dynamically import Swiper to reduce initial bundle
const loadSwiper = async () => {
    const [{ default: Swiper }, { FreeMode }] = await Promise.all([
        import('swiper'),
        import('swiper/modules')
    ]);
    return { Swiper, FreeMode };
};

interface Props {
    reviews: ReviewResult[];
    dict?: any;
}

const Stars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`size-6 ${index < rating ? 'text-blue-600 fill-current' : 'text-gray-300 fill-current'}`}
                viewBox="0 0 20 20"
            >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

const TestimonialCarousel: React.FC<Props> = ({ reviews, dict }) => {
    const swiperRef = useRef<HTMLDivElement>(null);
    const sliderTrackRef = useRef<HTMLDivElement>(null);
    const swiperInstanceRef = useRef<SwiperType | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDraggingSlider, setIsDraggingSlider] = useState(false);

    useEffect(() => {
        if (swiperRef.current) {
            // Use IntersectionObserver to defer Swiper initialization until visible
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            loadSwiper().then(({ Swiper, FreeMode }) => {
                                const swiper = new Swiper(swiperRef.current!, {
                                    modules: [FreeMode],
                                    slidesPerView: 'auto',
                                    spaceBetween: 24,
                                    freeMode: {
                                        enabled: true,
                                        momentum: true,
                                        momentumRatio: 0.5,
                                        momentumVelocityRatio: 0.5,
                                    },
                                    breakpoints: {
                                        320: { spaceBetween: 16 },
                                        768: { spaceBetween: 20 },
                                        1024: { spaceBetween: 24 },
                                    },
                                    on: {
                                        progress: (s) => {
                                            setScrollProgress(s.progress);
                                        },
                                    },
                                });
                                swiperInstanceRef.current = swiper;
                            });
                            observer.disconnect();
                        }
                    });
                },
                { rootMargin: '100px' }
            );

            observer.observe(swiperRef.current);

            return () => {
                observer.disconnect();
                if (swiperInstanceRef.current) {
                    swiperInstanceRef.current.destroy();
                    swiperInstanceRef.current = null;
                }
            };
        }
    }, []);

    const updateSlider = useCallback((clientX: number) => {
        if (!sliderTrackRef.current || !swiperInstanceRef.current) return;
        const rect = sliderTrackRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        swiperInstanceRef.current.setProgress(percentage, 0);
    }, []);

    const updateSliderRef = useRef(updateSlider);
    useEffect(() => {
        updateSliderRef.current = updateSlider;
    }, [updateSlider]);

    const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDraggingSlider(true);
        updateSlider(e.clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingSlider) {
                e.preventDefault();
                updateSliderRef.current(e.clientX);
            }
        };
        const handleMouseUp = () => setIsDraggingSlider(false);

        if (isDraggingSlider) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingSlider]);

    // Average rating across all reviews
    const avgRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '5.0';

    return (
        <div className="w-full py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-5xl font-serif mb-4">
                        {dict?.home?.testimonials?.title || "Our customers"}
                        <br />
                        {dict?.home?.testimonials?.subtitle || "are satisfied"}
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-[#00000099] font-satoshi text-sm md:text-base">
                        <span>{dict?.home?.testimonials?.rateUs || "Customers rate us with"}</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="size-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <p className="mt-1 text-sm md:text-base text-[#00000099]">
                        {avgRating} / 5 {dict?.home?.testimonials?.basedOn || "based on"} {reviews.length} {dict?.home?.testimonials?.reviews || "reviews"}.
                    </p>
                </div>

                {/* Swiper Carousel */}
                <div ref={swiperRef} className="swiper overflow-visible pb-14">
                    <div className="swiper-wrapper">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="swiper-slide w-[calc(90vw-32px)]! sm:w-[500px]!"
                            >
                                <div className="bg-white rounded-[8px] p-8 shadow-sm hover:shadow-md transition-shadow w-full max-w-[502px] h-[296px] border border-[#0000000D] flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-medium text-[#263586] mb-4 font-satoshi">
                                            {review.rating === 5
                                                ? (dict?.home?.testimonials?.excellent || 'Excellent')
                                                : review.rating >= 4
                                                    ? (dict?.home?.testimonials?.veryGood || 'Very Good')
                                                    : (dict?.home?.testimonials?.good || 'Good')}
                                        </h3>
                                        <p className="text-[#000000] mb-4 leading-relaxed line-clamp-4 font-satoshi text-sm md:text-base">
                                            {review.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 md:w-16 h-12 md:h-16 shrink-0">
                                            {review.avatar ? (
                                                <Image
                                                    src={review.avatar}
                                                    alt={review.author}
                                                    fill
                                                    sizes="(max-width: 768px) 48px, 64px"
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-[#2e3b84] flex items-center justify-center text-white font-bold text-lg">
                                                    {review.author.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <Stars rating={review.rating} />
                                            <p className="mt-2 text-[#263586]">
                                                <span className="font-semibold">{review.author}</span>
                                                {review.verified && (
                                                    <span className="text-gray-500"> • {dict?.home?.testimonials?.verifiedBuyer || "Verified buyer"}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slider Control */}
                <div
                    ref={sliderTrackRef}
                    className={`w-full max-w-[1024px] h-1.5 bg-gray-100 rounded-full mt-8 mx-auto overflow-hidden relative select-none ${isDraggingSlider ? 'cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={handleSliderMouseDown}
                >
                    <div
                        className={`h-full bg-[#2e3b84]/20 w-1/2 rounded-full absolute top-0 left-0 hover:bg-[#2e3b84]/30 transition-colors ${isDraggingSlider ? 'bg-[#2e3b84]/40' : ''}`}
                        style={{
                            transform: `translateX(${scrollProgress * 100}%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;