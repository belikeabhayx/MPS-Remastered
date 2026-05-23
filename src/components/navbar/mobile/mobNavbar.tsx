"use client";

import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
const MobileSidebar = dynamic(() => import("./MobileSidebar"), { ssr: false });
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface MobileNavbarProps {
    dict?: {
        nav?: {
            searchPlaceholder?: string;
        };
    };
}

function SearchForm({ dict }: { dict?: MobileNavbarProps["dict"] }) {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const q = searchParams.get('q');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.elements.namedItem('q') as HTMLInputElement;
            if (input.value.trim()) {
                push(`/catalogsearch/result/?q=${encodeURIComponent(input.value)}`);
            }
        }} className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 size-5" />
            <input
                type="text"
                name="q"
                defaultValue={q || ''}
                aria-label={dict?.nav?.searchPlaceholder || "Search products"}
                placeholder={dict?.nav?.searchPlaceholder || "Search products"}
                className="w-full bg-[#FAFAFC] border border-[#F1F1F5] rounded-xl px-12 py-3 text-sm outline-none placeholder:text-[#9A9AB0] focus:border-blue-300"
            />
        </form>
    );
}

const MobileNavbar = ({ dict }: MobileNavbarProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="relative z-50 w-full bg-white flex flex-col items-center pb-4 pt-4 xl:hidden">
            {/* Top Row: Menu | Logo | Language | Cart */}
            <div className="w-full px-4 flex items-center justify-between">
                {/* Left: Menu & Logo */}
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setIsSidebarOpen(true)} aria-label="Toggle menu">
                        <Menu className="size-8 text-[#2b2f7f]" />
                    </button>
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="MPS"
                            width={100}
                            height={35}
                            className="h-[35px] w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Right: Language & Cart */}
                <div className="flex items-center gap-4">
                    {/* Language Selector */}
                    <LanguageSwitcher/>
                </div>
            </div>

            {/* Bottom Row: Search Bar */}
            <div className="w-full px-4 mt-4">
                <Suspense fallback={<div className="h-12 bg-[#FAFAFC] rounded-xl animate-pulse" />}>
                    <SearchForm dict={dict} />
                </Suspense>
            </div>

            <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
};

export default MobileNavbar;