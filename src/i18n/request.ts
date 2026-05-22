import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
    if (!locale || !routing.locales.includes(locale as any)){
        locale = routing.defaultLocale;
    }
    let messages;
    switch (locale) {
        case 'nl':
            messages = (await import(`../../messages/nl.json`)).default;
            break;
        case 'de':
            messages = (await import(`../../messages/de.json`)).default;
            break;
        case 'es':
            messages = (await import(`../../messages/es.json`)).default;
            break;
        case 'en':
        default:
            messages = (await import(`../../messages/en.json`)).default;
            break;
    }

    return {
      locale,
      messages,
    };
});
