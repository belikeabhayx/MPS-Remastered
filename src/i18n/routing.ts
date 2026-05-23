import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import categorySlugMap from "../../category-slug-map.json";


export const routing = defineRouting({
  locales: ["en", "es", "de", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed", // hides /en, keeps /es /de /nl
  pathnames: {
    "/": {
      en: "/",
      es: "/",
      de: "/",
      nl: "/",
    },
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
    "/product-category/[...slug]": {
      en: "/product-category/[...slug]",
      es: "/categoria-producto/[...slug]",
      de: "/produkt-kategorie/[...slug]",
      nl: "/product-categorie/[...slug]",
    },
    "/about-us": {
      en: "/about-us",
      de: "/ueber-uns",
      nl: "/over-ons",
      es: "/sobre-nosotros",
    },
    "/contact-us": {
      en: "/contact-us",
      de: "/kontaktieren-sie-uns",
      nl: "/neem-contact-met-ons-op",
      es: "/contacta-con-nosotros",
    },
    "/cart": {
      en: "/cart",
      de: "/wagen",
      nl: "/winkelwagen",
      es: "/carrito",
    },
    "/checkout": {
      en: "/checkout",
      de: "/zur-kasse",
      nl: "/kassa",
      es: "/pago",
    },
    "/my-account": {
      en: "/my-account",
      de: "/mein-konto",
      nl: "/mijn-account",
      es: "/mi-cuenta",
    },
    "/sign-up": {
      en: "/sign-up",
      de: "/registrieren",
      nl: "/aanmelden",
      es: "/registrarse",
    },
    "/blogs": {
      en: '/blogs',
      es: '/blogs',
      de: '/blog',
      nl: '/blogs',
    },
    "/blogs/[slug]": {
      en: '/blogs/[slug]',
      es: '/blogs/[slug]',
      de: '/blog/[slug]',
      nl: '/blogs/[slug]',
    },
    "/legal-page": {
      en: '/legal-page',
      es: '/legal',
      de: '/rechtliches',
      nl: '/juridisch',
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

/**
 * Converts an English canonical /product-category/... path into a
 * next-intl typed href object. The Link from this routing module
 * automatically translates the path prefix per locale.
 * Pass `locale` to also translate the slug content via categorySlugMap.
 *
 * Usage: <Link href={categoryHref('/product-category/engine-parts/cooling-systems', locale)} />
 */
export function categoryHref(enPath: string, locale: string = 'en') {
  const withoutPrefix = enPath.replace(/^\/product-category\/?/, '');
  const segments = withoutPrefix.split('/').filter(Boolean);
  const localised = segments.map(seg => translateCategorySlug(seg, locale));

  if (localised.length === 0) {
    return { pathname: '/product-category' } as const;
  }
  if (localised.length === 1) {
    return {
      pathname: '/product-category/[slug]' as const,
      params: { slug: localised[0] },
    };
  }
  return {
    pathname: '/product-category/[...slug]' as const,
    params: { slug: localised },
  };
}

/**
 * Translates a single English category slug segment to the target locale
 * using the categorySlugMap. Use this only when you need a localised slug
 * in the URL for SEO. For navigation, categoryHref() + Link is sufficient.
 */
export function translateCategorySlug(enSlug: string, lang: string): string {
  if (lang === 'en') return enSlug;
  const map = categorySlugMap as any;
  return map.en_to?.[lang]?.[enSlug] ?? enSlug;
}



