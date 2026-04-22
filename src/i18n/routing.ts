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
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
