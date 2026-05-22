"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";

const languages = [
  { code: 'en', label: 'English', short: 'En' },
  { code: 'nl', label: 'Dutch', short: 'Nl' },
  { code: 'de', label: 'German', short: 'De' },
  { code: 'es', label: 'Spanish', short: 'Es' },
];

function FlagIcon({ code }: { code: string }) {
  if (code === 'en') {
    return (
      <div className="relative w-5 h-3.5 bg-blue-900 overflow-hidden border border-gray-200 shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[2px] bg-red-600 rotate-12 absolute scale-150"></div>
          <div className="w-full h-[2px] bg-red-600 -rotate-12 absolute scale-150"></div>
          <div className="w-full h-1 bg-white absolute"></div>
          <div className="h-full w-1 bg-white absolute"></div>
          <div className="w-full h-[6px] bg-red-600 absolute"></div>
          <div className="h-full w-[6px] bg-red-600 absolute"></div>
        </div>
      </div>
    );
  }
  if (code === 'nl') {
    return (
      <div className="relative w-5 h-3.5 overflow-hidden border border-gray-200 shrink-0 flex flex-col">
        <div className="h-1/3 w-full bg-[#AE1C28]"></div>
        <div className="h-1/3 w-full bg-white"></div>
        <div className="h-1/3 w-full bg-[#21468B]"></div>
      </div>
    );
  }
  if (code === 'de') {
    return (
      <div className="relative w-5 h-3.5 overflow-hidden border border-gray-200 shrink-0 flex flex-col">
        <div className="h-1/3 w-full bg-[#000000]"></div>
        <div className="h-1/3 w-full bg-[#DD0000]"></div>
        <div className="h-1/3 w-full bg-[#FFCE00]"></div>
      </div>
    );
  }
  if (code === 'es') {
    return (
      <div className="relative w-5 h-3.5 overflow-hidden border border-gray-200 shrink-0 flex flex-col">
        <div className="h-1/4 w-full bg-[#AA151B]"></div>
        <div className="h-2/4 w-full bg-[#F1BF00]"></div>
        <div className="h-1/4 w-full bg-[#AA151B]"></div>
      </div>
    );
  }
  return null;
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const { push, replace } = useRouter();
  const pathname = usePathname(); // next-intl pathname without locale prefix
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isBlogPost = pathname.startsWith('/blogs/') && !!params?.slug;
  const currentLanguage =
    languages.find((lang) => lang.code === locale) ?? languages[0];

  const switchLocale = async (newLocale: string) => {
    if (newLocale === locale || loading) return;

    if (isBlogPost) {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/translated-blog-slug?slug=${params.slug}&lang=${newLocale}&fromLang=${locale}`
        );
        const { slug: translatedSlug } = await res.json();

        push(
          // @ts-ignore — next-intl dynamic pathnames
          { pathname: '/blogs/[slug]', params: { slug: translatedSlug } },
          { locale: newLocale as any }
        );
      } catch {
        push(pathname as any, { locale: newLocale as any });
      } finally {
        setLoading(false);
      }
    } else {
      // ✅ Fix: use replace instead of push to avoid history stack issues
      // and pass params so next-intl can correctly match i18n pathnames
      replace(
        // @ts-ignore
        { pathname, params },  // ← pass current params (e.g. category slug)
        { locale: newLocale as any }
      );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          disabled={loading}
          className="relative z-0 md:z-101 flex items-center gap-2 bg-[#F3F5FC] px-3 py-1.5 rounded text-sm text-[#0F0F0F] font-medium transition-opacity outline-none"
        >
          <span className="flex items-center gap-2">
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <FlagIcon code={currentLanguage.code} />
            )}
            <span className="text-sm">{currentLanguage.short}</span>
          </span>
          <ChevronDown className={`size-3.5 mt-px transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32 z-100 mt-2">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className="flex items-center gap-3 cursor-pointer py-2"
            disabled={lang.code === locale}
          >
            <FlagIcon code={lang.code} />
            <span className="text-sm">{lang.label}</span>
            {lang.code === locale && (
              <span className="ml-auto size-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}