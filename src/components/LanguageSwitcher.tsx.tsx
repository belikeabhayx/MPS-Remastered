"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", label: "🇬🇧 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "du", label: "🇳🇱 Dutch" },
  { code: "sp", label: "🌐 SP" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace current locale prefix in path
    const segments = pathname.split("/");
    const locales = ["en", "es", "du", "sp"];

    if (locales.includes(segments[1])) {
      segments[1] = newLocale === "en" ? "" : newLocale;
    } else {
      segments.splice(1, 0, newLocale === "en" ? "" : newLocale);
    }

    const newPath = segments.filter(Boolean).join("/") || "/";
    router.push(`/${newPath}`);
  };

  return (
    <select
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
