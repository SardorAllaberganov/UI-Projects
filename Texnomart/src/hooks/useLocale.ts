import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUiStore } from "@/stores/ui.store";
import type { Locale } from "@/types";

export function useLocaleSync() {
  const { i18n } = useTranslation();
  const locale = useUiStore((s) => s.locale);

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
  }, [locale, i18n]);
}

export function useLocale() {
  const locale = useUiStore((s) => s.locale);
  const setLocale = useUiStore((s) => s.setLocale);
  return { locale, setLocale: (l: Locale) => setLocale(l) };
}
