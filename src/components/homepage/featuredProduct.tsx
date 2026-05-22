"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useParams } from "next/navigation";
import { translateProductHref, translateCategoryHref } from "@/i18n/routing";
import type { ProductResult } from "@/lib/api/types";
import { useCartStore } from "@/store/useCartStore";
import type SwiperType from "swiper";
import { SanitizedHTML } from "@/components/common/SanitizedHTML";
import { toast } from "sonner";
import { getAvailabilityText, getIsOutOfStock } from '@/lib/product-availability';

// Dynamically import Swiper to reduce initial bundle
const loadSwiper = async () => {
  const [{ default: Swiper }, { FreeMode }] = await Promise.all([
    import("swiper"),
    import("swiper/modules"),
  ]);
  return { Swiper, FreeMode };
};

interface FeaturedProductProps {
  products: ProductResult[];
  dict?: any;
}

const ProductItem = ({
  product,
  dict,
}: {
  product: ProductResult;
  dict?: any;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const addToCart = useCartStore((state) => state.addToCart);
  const params = useParams();
  const lang = (params?.locale as string) || "en";
  const p = dict?.product;
  const isOutOfStock = getIsOutOfStock(product.stockStatus, product.availability);

  const handleMouseEnter = () => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  };

  return (
    <Link href={translateProductHref(`/product/${product.slug}`, lang)}>
      <Card
        // FIX 1: Replaced fixed w-[292px] with clamp() for responsive sizing on all iPhones
        // FIX 2: Added -webkit-backface-visibility and translateZ(0) to prevent Safari rendering bugs
        style={
          {
            width: "clamp(240px, 75vw, 292px)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          } as React.CSSProperties
        }
        className="h-[460px] rounded-[8px] border border-black/5 bg-transparent shadow-none overflow-hidden transition-opacity flex flex-col group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* IMAGE */}
        <div className="relative mx-2 mt-2 rounded-xl h-[250px] min-h-[250px] shrink-0 overflow-hidden flex items-center justify-center bg-white">
          {/* Sale badge */}
          {product.isOnSale && product.salePercentage && (
            <Badge className="absolute top-3 left-3 bg-[#2b7a2b] text-white text-[10px] font-semibold px-2 py-1 rounded-md border-none shadow-sm z-10">
              {dict?.common?.sale || "SALE"} {product.salePercentage}%
            </Badge>
          )}

          {/* FIX 3: Added translateZ(0) to image wrapper to force GPU layer and prevent blur on scale in Safari */}
          <div
            className="relative w-full h-full transition-transform duration-300 group-hover:scale-105"
            style={
              {
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
              } as React.CSSProperties
            }
          >
            <Image
              src={images[currentImageIndex]}
              alt={product.title}
              fill
              // FIX 4: Added [backface-visibility:hidden] to prevent blurry images on Safari during scale
              className="object-contain p-4 backface-hidden [-webkit-backface-visibility:hidden]"
              sizes="(max-width: 375px) 240px, 292px"
            />
          </div>

          {/* Pagination dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 flex gap-1.5 z-10">
              {images.slice(0, 3).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    idx === currentImageIndex % 3
                      ? "bg-gray-600"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <CardContent className="px-3 pt-2 pb-3 flex flex-col flex-1 font-satoshi">
          <p className="text-[10px] font-bold text-[#2b7a2b] uppercase tracking-wide mb-1">
            {product.condition}
          </p>

          <SanitizedHTML 
            tag="h3"
            className="text-[15px] font-medium text-[#0f172a] leading-snug line-clamp-2 min-h-[44px] mb-1 shrink-0"
            content={product.title}
          />

          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full shrink-0 ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <SanitizedHTML 
              tag="p"
              className={`text-[11px] ${isOutOfStock ? 'text-red-600' : 'text-green-600'} font-medium`}
              content={getAvailabilityText(product.availability || "", p, product.stockStatus, product.physicalStockCount, product.allowsBackorder)}
            />
          </div>

          <div className="mt-auto mb-4 flex items-baseline gap-2">
            <span className="text-[17px] font-bold text-[#b45309]">
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(product.price)}
            </span>

            {product.originalPrice && (
              <span className="text-[12px] text-gray-500 line-through">
                {new Intl.NumberFormat("en-IE", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.originalPrice)}
              </span>
            )}
          </div>

          {/* FIX 5: Replaced hardcoded w-[272px] with w-full — critical fix for small iPhones */}
          <Button
            type="button"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isOutOfStock) {
                toast.error(dict?.product?.outOfStock || "This product is out of stock.");
                return;
              }
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: images[0],
                slug: product.slug,
                stockQuantity: product.stockQuantity ?? null,
                stockStatus: product.stockStatus,
                availability: product.availability,
                isOutOfStock: isOutOfStock,
              });
            }}
            className="w-full h-[48px] rounded-md bg-[#2e3b84] text-white text-sm font-medium shadow-sm transition-all hover:bg-[#232d66] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? (dict?.product?.outOfStock || "Out of Stock") : `+ ${dict?.common?.addToCart || "Add to cart"}`}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

const FeaturedProduct = ({ products = [], dict }: FeaturedProductProps) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const params = useParams();
  const lang = (params?.locale as string) || "en";

  useEffect(() => {
    if (swiperRef.current && products.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadSwiper().then(({ Swiper, FreeMode }) => {
                const swiper = new Swiper(swiperRef.current!, {
                  modules: [FreeMode],
                  slidesPerView: "auto",
                  spaceBetween: 24,
                  freeMode: {
                    enabled: true,
                    momentum: true,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5,
                  },
                  breakpoints: {
                    320: { spaceBetween: 24 },
                    768: { spaceBetween: 24 },
                    1024: { spaceBetween: 24 },
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
        { rootMargin: "100px" },
      );

      observer.observe(swiperRef.current);

      return () => {
        observer.disconnect();
        if (swiperInstance) {
          swiperInstance.destroy();
        }
      };
    }
  }, [products]);

  // Shared update logic — accepts a clientX number from both mouse and touch events
  const updateSlider = (clientX: number) => {
    if (!sliderTrackRef.current || !swiperInstance) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );
    swiperInstance.setProgress(percentage, 0);
  };

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingSlider(true);
    updateSlider(e.clientX);
  };

  // FIX 6: Added touch event handlers for the custom slider — mouse events don't fire on iPhone
  const handleSliderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDraggingSlider(true);
    updateSlider(e.touches[0].clientX);
  };

  const handleSliderTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDraggingSlider) {
      e.preventDefault(); // prevent page scroll while dragging slider
      updateSlider(e.touches[0].clientX);
    }
  };

  const handleSliderTouchEnd = () => {
    setIsDraggingSlider(false);
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
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSlider, swiperInstance]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto select-none mt-10 md:mt-28">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-5 md:gap-4">
        <div className="w-full md:w-auto flex flex-col items-center md:items-start">
          <h2 className="text-center md:text-left text-2xl md:text-3xl lg:text-5xl font-serif text-[#0f172a] mb-3">
            {dict?.home?.featured || "Featured Products"}
          </h2>
          <p className="text-center md:text-left text-sm md:text-md lg:text-xl font-satoshi">
            {dict?.home?.featuredDesc ||
              "A snapshot of what ships daily from our warehouse."}
          </p>
        </div>
        <Link
          href={translateCategoryHref("/product-category", lang)}
          className="mt-2 md:mt-0 hidden md:block"
        >
          <Button
            variant="outline"
            className="text-[#2e3b84] border-[#2e3b84]/30 hover:bg-[#2e3b84] hover:text-white transition-colors group rounded-md px-6 py-5 font-satoshi"
          >
            {dict?.product?.browseAll || "Browse all products"}{" "}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* FIX 7: Added -webkit-overflow-scrolling: touch for smooth momentum scrolling in Safari
                FIX 8: Added isolation: isolate to fix z-index stacking context issues in Safari */}
      <div
        ref={swiperRef}
        className="swiper overflow-hidden"
        style={
          {
            WebkitOverflowScrolling: "touch",
            isolation: "isolate",
          } as React.CSSProperties
        }
      >
        <div className="swiper-wrapper pb-8">
          {products.map((product) => (
            // FIX 9: Replaced className="swiper-slide w-auto!" with style={{ width: 'auto' }}
            // The w-auto! Tailwind important shorthand breaks in some Safari versions
            <div
              key={product.id}
              className="swiper-slide"
              style={{ width: "auto" }}
            >
              <ProductItem product={product} dict={dict} />
            </div>
          ))}
        </div>
      </div>

      {/* FIX 10: Added full touch event support (onTouchStart, onTouchMove, onTouchEnd) to custom slider */}
      <div
        ref={sliderTrackRef}
        className={`w-full max-w-[1024px] h-1.5 bg-gray-100 rounded-full mt-8 mx-auto overflow-hidden relative select-none ${isDraggingSlider ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleSliderMouseDown}
        onTouchStart={handleSliderTouchStart}
        onTouchMove={handleSliderTouchMove}
        onTouchEnd={handleSliderTouchEnd}
      >
        <div
          className={`h-full bg-[#2e3b84]/20 w-1/2 rounded-full absolute top-0 left-0 hover:bg-[#2e3b84]/30 transition-colors ${isDraggingSlider ? "bg-[#2e3b84]/40" : ""}`}
          style={{
            transform: `translateX(${scrollProgress * 100}%)`,
            willChange: "transform",
          }}
        />
      </div>
    </section>
  );
};

export default FeaturedProduct;
