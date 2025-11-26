import type {
  LanguageOption,
  BrandConfig,
  FeatureFlags,
} from "@/core/types/app-config.types";

export type EnvConfig = {
  apiBaseUrl: string;
  wsBaseUrl?: string;
  environment: "mock" | "dev" | "staging" | "production";
};

export type AppConfig = {
  brand: BrandConfig;
  features: FeatureFlags;
  env: EnvConfig;
  defaultLanguage: string;
  supportedLanguages: LanguageOption[];
};

export const appConfig: AppConfig = {
  brand: {
    name: "AI Vision Camera",
    logoLight: "/assets/logo-light.svg",
    logoDark: "/assets/logo-dark.svg",
    slogan: "Smarter Insights. Safer Decisions.",
  },
  features: {
    i18n: true,
    darkMode: true,
    multiTenancy: false,
    aiAssistant: true,
    auditLogs: true,
  },
  env: {
    apiBaseUrl: import.meta.env.VITE_API_URL,
    wsBaseUrl: import.meta.env.VITE_WS_URL ?? undefined,
    environment:
      (import.meta.env.MODE as "mock" | "dev" | "staging" | "production") ??
      "dev",
  },
  defaultLanguage: "en",
  supportedLanguages: [
    { key: "en", label: "English", flag: "🇬🇧", direction: "ltr" },
    { key: "ar", label: "العربية", flag: "🇸🇦", direction: "rtl" },
  ],
};

export const getAppLanguages = (): LanguageOption[] =>
  appConfig.supportedLanguages;

export const getLanguageByKey = (key: string): LanguageOption | undefined =>
  appConfig.supportedLanguages.find((lang) => lang.key === key);

export const getEnvironment = (): EnvConfig["environment"] =>
  appConfig.env.environment;
