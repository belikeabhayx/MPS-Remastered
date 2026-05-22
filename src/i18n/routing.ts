import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "es", "de", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed", // hides /en, keeps /es /de /nl
  pathnames: {
    "/product": {
      en: "/product",
      es: "/producto",
      de: "/produkt",
      nl: "/product",
    },
    "/product-category": {
      en: "/product-category",
      es: "/categoria-producto",
      de: "/produkt-kategorie",
      nl: "/product-categorie",
    },
    "/product-category/[slug]": {
      en: "/product-category/[slug]",
      es: "/categoria-producto/[slug]",
      de: "/produkt-kategorie/[slug]",
      nl: "/product-categorie/[slug]",
    },
    "/blogs": {
      en: '/blogs',
      es: '/blogs',
      de: '/blogs',
      nl: '/blogs',
    },
    "/blogs/[slug]": {   // ← add this
      en: '/blogs/[slug]',
      es: '/blogs/[slug]',
      de: '/blogs/[slug]',
      nl: '/blogs/[slug]',
    },
    "/privacy-policy": {
      en: '/privacy-policy',
      nl: '/privacybeleid',
      de: '/datenschutzbestimmungen',
      es: '/politica-de-privacidad',
    },
    "/terms-conditions": {
      en: '/terms-conditions',
      nl: '/algemene-voorwaarden',
      de: '/bedingungen-und-konditionen',
      es: '/condiciones-generales',
    },
    "/payment-delivery": {
      en: '/payment-delivery',
      nl: '/betaling-levering',
      de: '/zahlung-lieferung',
      es: '/pago-y-entrega',
    },
    "/right-of-withdrawal": {
      en: '/right-of-withdrawal',
      nl: '/herroepingsrecht',
      de: '/recht-auf-widerruf',
      es: '/derecho-de-desistimiento',
    },
    "/legal-notice": {
      en: '/legal-notice',
      nl: '/wettelijke-kennisgeving',
      de: '/rechtlicher-hinweis',
      es: '/aviso-legal',
    },
    "/cookie-policy": {
      en: '/cookie-policy',
      nl: '/cookiebeleid',
      de: '/cookie-richtlinie',
      es: '/politica-de-cookies',
    }
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export function translateCategoryHref(href: string, locale: string = 'en'): string {
  if (!href) return href;
  
  if (href.startsWith('/product-category')) {
    const rest = href.substring('/product-category'.length);
    const pathnames = routing.pathnames as any;
    const translations = pathnames?.["/product-category"] || {};
    const translatedBase = translations[locale] || translations["en"] || "/product-category";
    const result = `/${locale === 'en' ? '' : locale + '/'}${translatedBase}${rest}`.replace(/\/+/g, '/');
    return result.endsWith('/') && result.length > 1 ? result.slice(0, -1) : result;
  }
  
  const result = `/${locale === 'en' ? '' : locale + '/'}${href}`.replace(/\/+/g, '/');
  return result.endsWith('/') && result.length > 1 ? result.slice(0, -1) : result;
}

export function translateProductHref(href: string, locale: string = 'en'): string {
  if (!href) return href;
  
  if (href.startsWith('/product')) {
    const rest = href.substring('/product'.length);
    const pathnames = routing.pathnames as any;
    const translations = pathnames?.["/product"] || {};
    const translatedBase = translations[locale] || translations["en"] || "/product";
    const result = `/${locale === 'en' ? '' : locale + '/'}${translatedBase}${rest}`.replace(/\/+/g, '/');
    return result.endsWith('/') && result.length > 1 ? result.slice(0, -1) : result;
  }
  
  const result = `/${locale === 'en' ? '' : locale + '/'}${href}`.replace(/\/+/g, '/');
  return result.endsWith('/') && result.length > 1 ? result.slice(0, -1) : result;
}
