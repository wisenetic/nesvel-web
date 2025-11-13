import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { resources } from "./index";

const savedLang = localStorage.getItem("lang") ?? "en";

void i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    resources,
    lng: savedLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

i18n.on("languageChanged", (lang) => {
  console.log(">>>>>>>lang>>>>>>>", lang);
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = ["ar", "he", "fa", "ur"].includes(lang)
    ? "rtl"
    : "ltr";
});

export default i18n;
