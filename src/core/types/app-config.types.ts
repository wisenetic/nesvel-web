export interface LanguageOption {
  key: string;
  label: string;
  flag?: string;
  direction?: "ltr" | "rtl";
}

export interface BrandConfig {
  name: string;
  logoLight?: string;
  logoDark?: string;
  slogan?: string;
}

export interface FeatureFlags {
  i18n: boolean;
  darkMode: boolean;
  multiTenancy?: boolean;
  aiAssistant?: boolean;
  auditLogs?: boolean;
}
