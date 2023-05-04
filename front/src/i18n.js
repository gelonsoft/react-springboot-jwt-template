import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import translationEng from './locales/en.json'
import translationRus from './locales/ru.json'
//import Backend from "i18next-http-backend";


i18n
    //.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
       // loadPath: "./",
        debug: true,
        lng: "ru",
        fallbackLng: "en", // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },

        resources: {
            en: {
                translations: translationEng
            },
            ru: {
                translations: translationRus
            }
        },
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations"
    });

export default i18n;

window.i18n=i18n