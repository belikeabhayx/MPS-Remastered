"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'nl', label: 'Dutch' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // next-intl's useRouter.push handles the locale switching and prefixing automatically
    // when using the hooks from createNavigation in routing.ts
    router.push(pathname, { locale: newLocale as any });
  };

  return (
    <select
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
      className="border rounded px-2 py-1 text-sm bg-background cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
