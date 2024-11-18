import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import enTranslation from "./locales/en/translation.json";
import enTest from "./locales/en/test.json";
import enCommon from "./locales/en/common.json";

import esTranslation from "./locales/es/translation.json";
import esTest from "./locales/es/test.json";
import esCommon from "./locales/es/common.json";

i18n.use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en", // fallback language
        lng: "es",
        ns: ["common", "translation", "test"],
        defaultNs: "common",
        debug: true, // enable debug mode for development
        interpolation: {
            escapeValue: false, // react already does escaping
        },
        resources: {
            en: {
                translation: enTranslation,
                test: enTest,
                common: enCommon,
            },
            es: {
                translation: esTranslation,
                test: esTest,
                common: esCommon,
            },
        },
    });

export default i18n;
