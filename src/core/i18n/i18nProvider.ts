import type { I18nProvider } from "@refinedev/core";

import i18n from "./i18n";

export const i18nProvider: I18nProvider = {
  translate: (key: string, params?: Record<string, string | number>) =>
    i18n.t(key, params),
  changeLocale: (lang: string) => i18n.changeLanguage(lang),
  getLocale: () => i18n.language,
};
