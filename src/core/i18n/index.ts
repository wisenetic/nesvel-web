import enCommon from "./common/en";
import arCommon from "./common/ar";

/**
 * Auto-import all module translations
 * Example: src/modules/./i18n/en.ts
 **/
const moduleFiles = import.meta.glob("@/modules/*/i18n/*.ts", { eager: true });

type LangResource = Record<string, any>;

// Reduce into structured resources like: { en: { translation: {...} }, ar: {...} }
const moduleTranslations = Object.entries(moduleFiles).reduce(
  (acc, [path, mod]) => {
    // Extract language code from filename: e.g. "en.ts" → "en"
    const lang = path.split("/").pop()?.replace(".ts", "") as string;
    const content = (mod as { default: Record<string, any> }).default;

    if (!acc[lang]) acc[lang] = { translation: {} };
    acc[lang].translation = { ...acc[lang].translation, ...content };
    return acc;
  },
  {} as Record<string, { translation: LangResource }>,
);

// Merge with global common translations
export const resources = {
  en: {
    translation: {
      ...enCommon,
      ...(moduleTranslations.en?.translation || {}),
    },
  },
  ar: {
    translation: {
      ...arCommon,
      ...(moduleTranslations.ar?.translation || {}),
    },
  },
};
