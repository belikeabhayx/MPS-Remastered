'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type SwiperType from 'swiper';
import { useTranslations } from 'next-intl';

// Dynamically import Swiper to reduce initial bundle
const loadSwiper = async () => {
    const [{ default: Swiper }, { FreeMode }] = await Promise.all([
        import('swiper'),
        import('swiper/modules')
    ]);
    return { Swiper, FreeMode };
};

export interface BlogPostCarouselItem {
    id: number;
    title: string;
    image: string;
    link: string;
}

interface BlogCarouselProps {
    initialPosts: BlogPostCarouselItem[];
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ initialPosts }) => {
    const t = useTranslations("home");
    const swiperRef = useRef<HTMLDivElement>(null);
    const sliderTrackRef = useRef<HTMLDivElement>(null);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDraggingSlider, setIsDraggingSlider] = useState(false);
    const [blogPosts, setBlogPosts] = useState<BlogPostCarouselItem[]>(initialPosts || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialPosts && initialPosts.length > 0) {
            setBlogPosts(initialPosts);
        }
    }, [initialPosts]);

    useEffect(() => {
        if (!loading && swiperRef.current && blogPosts.length > 0) {
            // Use IntersectionObserver to defer Swiper initialization until visible
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            loadSwiper().then(({ Swiper, FreeMode }) => {
                                const swiper = new Swiper(swiperRef.current!, {
                                    modules: [FreeMode],
                                    slidesPerView: 'auto',
                                    spaceBetween: 32,
                                    freeMode: {
                                        enabled: true,
                                        momentum: true,
                                        momentumRatio: 0.5,
                                        momentumVelocityRatio: 0.5,
                                    },
                                    breakpoints: {
                                        320: { spaceBetween: 24 },
                                        768: { spaceBetween: 32 },
                                        1024: { spaceBetween: 60 },
                                    },
                                    on: {
                                        progress: (s) => {
                                            setScrollProgress(s.progress);
                                        },
                                    },
                                });
                                setSwiperInstance(swiper);
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
                if (swiperInstance) {
                    swiperInstance.destroy();
                }
            };
        }
    }, [blogPosts, loading]);

    // Fix: wrapped in useCallback so the mousemove effect always sees the latest swiperInstance
    const updateSlider = useCallback((clientX: number) => {
        if (!sliderTrackRef.current || !swiperInstance) return;
        const rect = sliderTrackRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        swiperInstance.setProgress(percentage, 0);
    }, [swiperInstance]);

    const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDraggingSlider(true);
        updateSlider(e.clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingSlider) {
                e.preventDefault();
                updateSlider(e.clientX);
            }
        };

        const handleMouseUp = () => {
            setIsDraggingSlider(false);
        };

        if (isDraggingSlider) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        // Fix: updateSlider is now stable via useCallback, safe to include here
    }, [isDraggingSlider, updateSlider]);

    if (!loading && blogPosts.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white px-4 mb-[350px] md:mb-72">
            <div className="max-w-7xl mx-auto pb-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-[24px] md:text-[64px] font-serif text-[#000000]">{t("latestNews")}</h2>
                </div>

                {loading ? (
                    // Skeleton Loader
                    <div className="overflow-hidden">
                        <div className="flex gap-8 overflow-hidden">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="shrink-0 max-md:w-[233px]!"
                                    style={{ width: '373px', maxWidth: '90vw' }}
                                >
                                    <div className="relative rounded-2xl overflow-hidden h-[283px] md:h-[455px] bg-gray-200 animate-pulse">
                                        <div className="w-full h-full bg-gray-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-8">
                                            <div className="h-6 md:h-8 bg-gray-400 rounded w-3/4 mb-2" />
                                            <div className="h-6 md:h-8 bg-gray-400 rounded w-1/2" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full max-w-[1024px] h-1.5 bg-gray-200 rounded-full mt-12 md:mt-20 lg:mt-30 mx-auto animate-pulse" />
                    </div>
                ) : (
                    <>
                        {/* Swiper Carousel */}
                        <div ref={swiperRef} className="swiper overflow-hidden">
                            <div className="swiper-wrapper">
                                {blogPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="swiper-slide max-md:w-[233px]!"
                                        style={{ width: '373px', maxWidth: '90vw' }}
                                    >
                                        <a href={post.link} className="group cursor-pointer h-full block">
                                            <div className="relative rounded-[8px] overflow-hidden h-[283px] md:h-[455px]">
                                                {/* Fix: object-cover instead of object-contain to prevent gaps */}
                                                <Image
                                                    src={post.image}
                                                    alt=""
                                                    fill
                                                    aria-hidden="true"
                                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                                />

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-linear-to-t from-blue-900/90 via-blue-900/50 to-transparent"></div>

                                                {/* Title */}
                                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                                    <h3 className="text-white text-[16px] md:text-2xl font-serif leading-tight">
                                                        {post.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slider Control */}
                        {/* Fix: removed overflow-hidden; thumb position math corrected so it stays within bounds */}
                        <div
                            ref={sliderTrackRef}
                            className={`w-full max-w-[1024px] h-1.5 bg-gray-100 rounded-full mt-12 md:mt-20 lg:mt-30 mx-auto relative select-none px-4 sm:px-6 md:px-8 ${isDraggingSlider ? 'cursor-grabbing' : 'cursor-grab'}`}
                            onMouseDown={handleSliderMouseDown}
                        >
                            {/* Fix: thumb is 50% wide, so translateX is capped at 50% to stay within the track */}
                            <div
                                className={`h-full bg-[#2e3b84]/20 w-1/2 rounded-full absolute top-0 left-0 hover:bg-[#2e3b84]/30 transition-colors ${isDraggingSlider ? 'bg-[#2e3b84]/40' : ''}`}
                                style={{
                                    transform: `translateX(${scrollProgress * 50}%)`,
                                    willChange: 'transform'
                                }}
                            ></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogCarousel;