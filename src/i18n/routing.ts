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
