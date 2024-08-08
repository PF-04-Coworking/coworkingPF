import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

i18n
    .use(backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "es",
        supportedLngs: ["en", "es"],
        debug: false,
        ns: [""],
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
    });

export default i18n;