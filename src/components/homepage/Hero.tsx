import { getLocale, getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import React from 'react'
import { fetchBrands } from '@/lib/woocommerce/brands';

const PartsFinder = dynamic(() => import("./PartsFinder"), {
    loading: () => (
        <div className="bg-[linear-gradient(130.61deg,#263586_11.08%,#E5E9FF_106.5%)] rounded-[8px] p-5 w-full h-[320px] animate-pulse" />
    ),
});

const Hero = async () => {
    const t = await getTranslations("home");
    const resolvedLang = await getLocale();
    const brands = await fetchBrands(resolvedLang);

    return (
        <section className='max-w-7xl mx-auto px-4 py-4 lg:py-16 xl:py-10'>
            <div className="flex flex-col lg:flex-row justify-center gap-3">
                {/* left card */}
                <div className="relative rounded-[7px] overflow-hidden shadow-lg w-full min-h-[506px] lg:flex-3 xl:flex-none xl:w-[747px] lg:h-[506px] shrink-0">
                    <Image
                        src="/hero/right.webp"
                        alt="Warehouse"
                        fill
                        className="object-cover"
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
                        quality={80}
                    />

                    <div className="relative z-10 bg-black/40 p-4 h-full flex flex-col justify-between">
                        <div>
                            <p className="text-xs md:text-sm tracking-widest text-white uppercase font-satoshi font-bold mt-4">
                                {t("hero.tagline")}
                            </p>
                            <h1 className={`text-[24px] font-bold text-white mt-2 font-serif mb-5 lg:mb-0 ${resolvedLang === 'en' ? 'md:text-[40px]' : 'md:text-[32px]'}`}>
                                {t("hero.title")}
                            </h1>
                        </div>

                       <PartsFinder brands={brands} />
                    </div>
                </div>
                {/* right card */}
                <div className="flex flex-col gap-[14px] w-full lg:flex-2 xl:flex-none xl:w-[486px]"></div>
            </div>
        </section>
    )
}

export default Hero