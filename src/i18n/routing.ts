import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "de", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed", // hides /en, keeps /es /de /nl
});