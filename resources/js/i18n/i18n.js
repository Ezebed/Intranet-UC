import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import esTranslation from "@/locales/es/translation.json";
import enTranslation from "@/locales/en/translation.json";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en", // fallback language
        lng: "es",
        debug: true, // enable debug mode for development
        interpolation: {
            escapeValue: false, // react already does escaping
        },
        resources: {
            en: {
                translation: {
                    ...enTranslation,
                    hola: "hello how are you",
                },
            },
            es: {
                translation: {
                    ...esTranslation,
                    hola: "hola como estas",
                },
            },
        },
    });

export default i18n;
