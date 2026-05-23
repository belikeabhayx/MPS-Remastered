"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ValueItem {
  id: string;
  title: string;
  description: string;
}

interface InventoryClientProps {
  values: ValueItem[];
  valuesLabel: string;
}

export default function InventoryClient({ values, valuesLabel }: InventoryClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTitle = values[activeIndex]?.title;
  const currentDescription = values[activeIndex]?.description;

  return (
    <div className="flex flex-col lg:flex-row w-full mx-auto lg:items-center lg:gap-16 p-4 xl:p-0">
      {/* Left Side */}
      <div className="relative w-full lg:w-[490px] xl:w-[717px] bg-neutral-900 overflow-hidden h-[492px] rounded-[8px] shrink-0">
        {/* Background Image */}
        <Image
          src="/hero/right.webp"
          alt="Warehouse Background"
          height={492}
          width={717}
          className="opacity-40 absolute inset-0 w-full h-full object-cover rounded-2xl"
          priority
        />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
          <span className="text-md font-bold tracking-[0.2em] text-white uppercase mb-8 md:mb-12 font-satoshi">
            {valuesLabel}
          </span>
          <div className="flex flex-col gap-6 md:gap-8">
            {values.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className="group cursor-pointer"
              >
                <h2
                  className={cn(
                    "font-serif transition-all duration-300",
                    index === activeIndex
                      ? "text-[30px] xl:text-[36px] text-white"
                      : "text-[24px] text-white/30 group-hover:text-white/50",
                  )}
                >
                  {item.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:flex-1 bg-white flex flex-col justify-center py-16 lg:py-0 lg:h-[492px]">
        <div className="max-w-3xl">
          <span className="text-sm font-bold text-neutral-900 mb-2 block">
            {values[activeIndex]?.id}
          </span>
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-normal mb-8 leading-tight">
            {currentTitle}
          </h3>
          <p className="text-[#00000099] text-lg md:text-2xl font-satoshi">
            {currentDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
