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

export async function getDictionary(locale: string) {
    try {
        const dict = await import(`../../messages/${locale}.json`);
        return dict.default || dict;
    } catch (error) {
        // Fallback to English if locale file not found
        const dict = await import(`../../messages/en.json`);
        return dict.default || dict;
    }
}

export const productCategoryMapping: Record<string, string> = {
    en: '/product-category',
    nl: '/nl/product-categorie',
    de: '/de/produkt-kategorie',
    es: '/es/categoria-producto',
};

export const productMapping: Record<string, string> = {
    en: '/product',
    nl: '/nl/product',
    de: '/de/produkt',
    es: '/es/producto',
};

export function translateCategoryHref(href: string, lang: string = 'en'): string {
    if (!href.startsWith('/product-category') && !href.startsWith('/en/product-category') && !href.startsWith('/nl/product-categorie') && !href.startsWith('/de/produkt-kategorie') && !href.startsWith('/es/categoria-producto')) {
        return href;
    }

    let slugPath = href;
    // Include /en/product-category since the app uses /en/ locale prefix for English
    const prefixes = ['/en/product-category', ...Object.values(productCategoryMapping)].sort((a, b) => b.length - a.length);
    for (const prefix of prefixes) {
        if (href.startsWith(prefix)) {
            slugPath = href.substring(prefix.length);
            break;
        }
    }

    let segments = slugPath.split('/').filter(Boolean);

    const typecastMap = categorySlugMap as any;
    const translatedSegments = segments.map(segment => {
        // 1. Find the English key for this segment
        let enKey = segment;
        if (typecastMap.to_en && typecastMap.to_en[segment]) {
            enKey = typecastMap.to_en[segment];
        }

        // 2. Translate English key to target language
        if (lang === 'en') {
            return enKey;
        } else if (typecastMap.en_to && typecastMap.en_to[lang] && typecastMap.en_to[lang][enKey]) {
            return typecastMap.en_to[lang][enKey];
        }

        return enKey;
    });

    const newPrefix = productCategoryMapping[lang] || productCategoryMapping.en;
    const newSlug = translatedSegments.length > 0 ? '/' + translatedSegments.join('/') : '';

    const trailingSlash = href.endsWith('/') && newSlug !== '' ? '/' : '';
    return `${newPrefix}${newSlug}${trailingSlash}`;
}

// All product URL prefixes including locale-prefixed English
const allProductPrefixes = [
    '/en/product',
    '/nl/product',
    '/de/produkt',
    '/es/producto',
    '/product',
];

export function translateProductHref(href: string, lang: string = 'en'): string {
    const matchesProduct = allProductPrefixes.some(p => href.startsWith(p));
    if (!matchesProduct) return href;

    let slug = href;
    // Sort by length descending so longer prefixes match first (e.g. /en/product before /product)
    const prefixes = allProductPrefixes.slice().sort((a, b) => b.length - a.length);
    for (const prefix of prefixes) {
        if (href.startsWith(prefix)) {
            slug = href.substring(prefix.length);
            break;
        }
    }

    const newPrefix = productMapping[lang] || productMapping.en;
    if (!slug.startsWith('/') && slug.length > 0) {
        slug = '/' + slug;
    }
    return `${newPrefix}${slug}`;
}

export function translateHref(href: string, lang: string = 'en'): string {
    // 1. Root / Home
    if (href === '/') {
        return lang === 'en' ? '/' : `/${lang}`;
    }

    // 2. Product Category
    if (href.startsWith('/product-category') || href.startsWith('/en/product-category') || href.startsWith('/nl/product-categorie') || href.startsWith('/de/produkt-kategorie') || href.startsWith('/es/categoria-producto')) {
        return translateCategoryHref(href, lang);
    }

    // 3. Product
    if (allProductPrefixes.some(p => href.startsWith(p))) {
        return translateProductHref(href, lang);
    }

    // 4. Static Pathnames listed in routing.pathnames
    const pathnames = routing.pathnames as Record<string, Record<string, string>>;
    if (pathnames[href]) {
        const localizedPath = pathnames[href][lang];
        if (localizedPath) {
            const prefix = lang === 'en' ? '' : `/${lang}`;
            return `${prefix}${localizedPath}`;
        }
    }

    // Fallback
    return href;
}

