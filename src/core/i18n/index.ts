/**
 * 1) Auto-import all COMMON translation files dynamically:
 *    /core/i18n/common/en.ts
 *    /core/i18n/common/ar.ts
 */
const commonFiles = import.meta.glob("./common/*.ts", { eager: true });

type TranslationMap = Record<string, unknown>;
type CommonMap = Record<string, TranslationMap>;
type ModuleMap = Record<string, TranslationMap>;
type ResourcesMap = Record<string, { translation: TranslationMap }>;

// Build common translations (typed)
const commonTranslations: CommonMap = Object.entries(
  commonFiles
).reduce<CommonMap>((acc, [path, mod]) => {
  const lang = path.split("/").pop()?.replace(".ts", "") ?? "";
  const content = (mod as { default: TranslationMap }).default;

  if (lang) acc[lang] = content;
  return acc;
}, {});

/**
 * 2) Auto-import module translations:
 *    /modules/./i18n/en.ts
 */
const moduleFiles = import.meta.glob("@/modules/*/i18n/*.ts", { eager: true });

// Build module translations (typed)
const moduleTranslations: ModuleMap = Object.entries(
  moduleFiles
).reduce<ModuleMap>((acc, [path, mod]) => {
  const lang = path.split("/").pop()?.replace(".ts", "") ?? "";
  const content = (mod as { default: TranslationMap }).default;

  if (!lang) return acc;

  if (!acc[lang]) acc[lang] = {};
  acc[lang] = { ...acc[lang], ...content };

  return acc;
}, {});

/**
 * 3) Union of all languages in common + modules
 */
const allLanguages = Array.from(
  new Set([
    ...Object.keys(commonTranslations),
    ...Object.keys(moduleTranslations),
  ])
);

/**
 * 4) Build final resources map (ESLint-clean reduce)
 */
export const resources: ResourcesMap = allLanguages.reduce<ResourcesMap>(
  (acc, lang) => {
    acc[lang] = {
      translation: {
        ...(commonTranslations[lang] ?? {}),
        ...(moduleTranslations[lang] ?? {}),
      },
    };
    return acc;
  },
  {}
);
