"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'nl', label: 'Dutch' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // next-intl pathname without locale prefix
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const isBlogPost = pathname.startsWith('/blogs/') && !!params?.slug;

  const switchLocale = async (newLocale: string) => {
    if (newLocale === locale || loading) return;

    if (isBlogPost) {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/translated-blog-slug?slug=${params.slug}&lang=${newLocale}&fromLang=${locale}`
        );
        const { slug: translatedSlug } = await res.json();

        router.push(
          // @ts-ignore — next-intl dynamic pathnames
          { pathname: '/blogs/[slug]', params: { slug: translatedSlug } },
          { locale: newLocale as any }
        );
      } catch {
        router.push(pathname as any, { locale: newLocale as any });
      } finally {
        setLoading(false);
      }
    } else {
      // ✅ Fix: use replace instead of push to avoid history stack issues
      // and pass params so next-intl can correctly match i18n pathnames
      router.replace(
        // @ts-ignore
        { pathname, params },  // ← pass current params (e.g. category slug)
        { locale: newLocale as any }
      );
    }
  };

  return (
    <select
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
      disabled={loading}
      className="border rounded px-2 py-1 text-sm bg-background cursor-pointer disabled:opacity-50"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {loading ? '...' : lang.label}
        </option>
      ))}
    </select>
  );
}