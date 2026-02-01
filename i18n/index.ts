import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { resources } from "./resources";

const deviceLocale = Localization.getLocales()[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLocale,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
