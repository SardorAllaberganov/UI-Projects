import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "@/i18n/locales/ru.json";
import uz from "@/i18n/locales/uz.json";

export const SUPPORTED_LOCALES = ["ru", "uz"] as const;
export const DEFAULT_LOCALE = "ru";
export const LOCALE_STORAGE_KEY = "texnomart.locale";

export const resources = {
  ru: { translation: ru },
  uz: { translation: uz },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      caches: ["localStorage"],
    },
    returnEmptyString: false,
  });

export default i18n;
