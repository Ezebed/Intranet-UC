import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n.use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en", // fallback language
        lng: "es",
        ns: ["translation", "test"],
        DefaultNs: "translation",
        debug: true, // enable debug mode for development
        interpolation: {
            escapeValue: false, // react already does escaping
        },
        backend: {
            loadPath: "./locales/{{lng}}/{{ns}}.json",
        },
    });

export default i18n;
