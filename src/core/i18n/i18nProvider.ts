import type { I18nProvider } from "@refinedev/core";
import i18n from "./i18n";

export const i18nProvider: I18nProvider = {
  translate: (key: string, params?: Record<string, string | number>) => {
    return i18n.t(key, params);
  },
  changeLocale: async (lang: string) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); // persist explicitly
    document.documentElement.lang = lang;
    return Promise.resolve();
  },
  getLocale: () => i18n.language,
};
