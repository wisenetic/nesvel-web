import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { appConfig } from "@/core/config/app.config";

import { resources } from "./index";

const savedLang = localStorage.getItem("lang") || "en";

// ✅ Immediately set dir before React renders
const dir = i18n.dir(savedLang);
document.documentElement.setAttribute("dir", dir);
document.documentElement.lang = savedLang;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: appConfig.defaultLanguage,
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = ["ar", "he", "fa", "ur"].includes(lang)
    ? "rtl"
    : "ltr";
});

export default i18n;
