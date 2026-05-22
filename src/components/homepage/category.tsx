'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { translateCategoryHref } from '@/i18n/routing';

export interface CategoryData {
    id: string | number;
    title: string;
    desc: string;
    image: string;
    href: string;
    isFeatured?: boolean;
}

const PopularCategories = ({ dict, data, lang = 'en' }: { dict?: any, data?: CategoryData[], lang?: string }) => {
    const swiperRef = useRef<HTMLDivElement>(null);
    const sliderTrackRef = useRef<HTMLDivElement>(null);
    const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDraggingSlider, setIsDraggingSlider] = useState(false);

    const defaultData: CategoryData[] = [
        {
            id: 1,
            title: dict?.home?.hero?.serviceParts || "Service Parts",
            desc: dict?.home?.hero?.servicePartsDesc || "Filters, oils, belts, impellers and complete service kits for your servicing.",
            image: "/category/oil.png",
            href: translateCategoryHref("/product-category/engine-service-parts", lang)
        },
        {
            id: 2,
            title: dict?.home?.hero?.engineCooling || "Cooling",
            desc: dict?.home?.hero?.engineCoolingDesc || "Water pumps, thermostats, and complete cooling system solutions for your vessel.",
            image: "/category/oil.png",
            href: translateCategoryHref("/product-category/engine-parts/cooling-systems", lang)
        },
        {
            id: 3,
            title: dict?.home?.hero?.electrical || "Electrical",
            desc: dict?.home?.hero?.electricalDesc || "Marine batteries, wiring, starters, alternators and other electrical parts.",
            image: "/category/oil.png",
            href: translateCategoryHref("/product-category/engine-parts/electrical-systems", lang)
        }
    ];

    const displayData = data || defaultData;

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = new Swiper(swiperRef.current, {
                modules: [FreeMode],
                slidesPerView: 2,
                spaceBetween: 16,
                freeMode: {
                    enabled: true,
                    momentum: true,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 24,
                    },
                },
                on: {
                    progress: (s) => {
                        setScrollProgress(s.progress);
                    },
                },
            });
            setSwiperInstance(swiper);

            return () => {
                swiper.destroy();
            };
        }
    }, []);

    const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDraggingSlider(true);
        updateSlider(e.clientX);
    };

    const updateSlider = (clientX: number) => {
        if (!sliderTrackRef.current || !swiperInstance) return;
        const rect = sliderTrackRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        swiperInstance.setProgress(percentage, 0);
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
    }, [isDraggingSlider, swiperInstance]);

    return (
        <section className="py-16 bg-white max-w-7xl mx-auto">
            <div className="container mx-auto px-4">
                <div className="mb-10">
                    <h2 className="text-[24px] md:text-4xl lg:text-5xl font-serif text-slate-900 mb-3 text-center md:text-left">{dict?.home?.popular || "Popular Categories"}</h2>
                    <p className="text-slate-500 text-[14px] md:text-lg max-w-md font-satoshi text-center md:text-left">{dict?.home?.popularDesc || "Quick access to the brands and systems you work with most."}</p>
                </div>

                <div ref={swiperRef} className="swiper overflow-visible pb-4">
                    <div className="swiper-wrapper">
                        {/* Featured Category Card - Engine Parts */}
                        <div className="swiper-slide !h-auto">
                            <Card className="h-[232px] md:h-[337px] w-[168px] md:w-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between group">
                                <div className="absolute w-[125.3px] md:w-[182px] h-[26.16px] md:h-auto flex items-center justify-center md:block text-center top-0 left-6 bg-[#3b4b8c] text-white text-[6.89px] md:text-[10px] font-bold px-0 md:px-3 md:py-1.5 rounded-b-md z-10 tracking-wider">
                                    {dict?.home?.featured || "FEATURED"}
                                </div>

                                <div className="pt-14 px-4 pb-2 relative z-10">
                                    <h3 className="text-[19.55px] md:text-3xl text-slate-900 mb-3 font-serif">{dict?.home?.hero?.engineParts || "Engine Parts"}</h3>
                                    <p className="text-slate-500 text-[9.64px] md:text-sm mb-4 font-satoshi line-clamp-3">
                                        {dict?.home?.hero?.enginePartsDesc || "All core components around your marine engine: cooling, exhaust, fuel, gaskets and more."}
                                    </p>
                                    <Link href={translateCategoryHref("/product-category/engine-parts", lang)} className="inline-flex items-center text-[#3b4b8c] font-medium text-sm hover:underline group-hover:gap-2 transition-all">
                                        {dict?.common?.shopNow || "Shop Now"} <ArrowRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </div>

                                <div className="mt-auto relative h-48 w-full flex justify-end items-end p-4">
                                    {/* Visual placeholder for image until real assets are available */}
                                    <div className="w-full h-full relative">
                                        <Image
                                            src="/category/engine.png" // Temporary placeholder using available asset
                                            alt="Engine Parts"
                                            width={360}
                                            height={200}
                                            className="absolute bottom-[-92px] right-[-96px] md:bottom-[-90px] md:right-[-140px] max-w-none w-[248px] md:w-[360px] h-auto"
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Service Parts Cards */}
                        {displayData.map((item) => (
                            <div key={item.id} className="swiper-slide !h-auto">
                                <Card className="h-[232px] md:h-[337px] w-[168px] md:w-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between group">
                                    <div className="pt-14 px-4 pb-2 relative z-10">
                                        <h3 className="text-[19.55px] md:text-3xl font-serif text-slate-900 mb-3">{item.title}</h3>
                                        <p className="text-slate-500 text-[9.64px] md:text-sm mb-4 font-satoshi line-clamp-3">
                                            {item.desc}
                                        </p>
                                        <Link href={item.href} className="inline-flex items-center text-[#3b4b8c] font-medium text-sm hover:underline group-hover:gap-2 transition-all">
                                            {dict?.common?.shopNow || "Shop Now"} <ArrowRight className="ml-1 w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="mt-auto relative h-40 w-full flex justify-center items-end p-4">
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                height={100}
                                                width={300}
                                                className="absolute bottom-[-48px]"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}

                        {/* Browse All Categories Card */}
                        <div className="swiper-slide !h-auto">
                            <Card className="h-full border border-[#0000001A] shadow-sm hover:shadow-md transition-shadow duration-300 bg-[#F8FAFC] flex flex-col justify-center items-center text-center p-6 min-h-[232px] md:min-h-[337px] w-[168px] md:w-full">
                                <h3 className="text-[19.55px] md:text-3xl font-serif text-slate-900 mb-6 leading-tight">
                                    {dict?.home?.browse?.title || "Browse all categories"}
                                </h3>
                                <Button asChild className="bg-[#3b4b8c] hover:bg-[#2d3a6e] text-white rounded-md px-6 py-2 h-auto text-sm font-medium">
                                    <Link href={translateCategoryHref("/category", lang)}>
                                        {dict?.common?.browseAll || "Browse all"} <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Slider Control */}
                <div
                    ref={sliderTrackRef}
                    className={`w-full h-1.5 bg-gray-100 rounded-full mt-8 mx-auto overflow-hidden relative select-none block md:hidden ${isDraggingSlider ? 'cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={handleSliderMouseDown}
                >
                    <div
                        className={`h-full bg-[#2e3b84]/20 w-1/2 rounded-full absolute top-0 left-0 hover:bg-[#2e3b84]/30 transition-colors ${isDraggingSlider ? 'bg-[#2e3b84]/40' : ''}`}
                        style={{
                            transform: `translateX(${scrollProgress * 100}%)`,
                            willChange: 'transform'
                        }}
                    ></div>
                </div>
            </div>
        </section>
    )
}

export default PopularCategories