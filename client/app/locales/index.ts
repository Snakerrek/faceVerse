import { en } from "./en";
import { pl } from "./pl";
import { es } from "./es";

export type LanguageCode = "en" | "pl" | "es";

export const LANGUAGES: Record<LanguageCode, string> = {
  en: "🇬🇧 English",
  pl: "🇵🇱 Polski",
  es: "🇪🇸 Español",
};

export const translations = {
  en,
  pl,
  es,
};

export const getTranslation = (lang: LanguageCode, key: string): string => {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
