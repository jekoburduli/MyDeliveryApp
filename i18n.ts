import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const deviceLocale = Localization.getLocales()[0]?.languageCode || "en";

const resources = {
  en: {
    translation: {
      welcome: "Welcome!",
      getStarted: "Get Started",
      home: "Home",
      cart: "Cart",
      profile: "Profile",
      changeLanguage: "Change Language",
      restaurants: "Restaurants",
      location: "Tbilisi, Georgia",
      emptycart: "Your cart is empty",
      notLoggedIn: "You are not logged in yet",
      welcomeUser: "Welcome, {{name}}!",
      email: "Email",
      logout: "Log Out",
      open: "Open",
      closed: "Closed",
      selected: "selected",
      hour: "hour",
      minute: "min",
    },
  },
  ka: {
    translation: {
      welcome: "მოგესალმებით!",
      getStarted: "დაიწყე",
      home: "მთავარი",
      cart: "კალათა",
      profile: "პროფილი",
      changeLanguage: "ენის შეცვლა",
      restaurants: "რესტორნები",
      location: "თბილისი, საქართველო",
      emptycart: "შენი კალათა ცარიელია",
      notLoggedIn: "თქვენ ჯერ არ ხართ შესული",
      welcomeUser: "მოგესალმებით, {{name}}!",
      email: "ელ.ფოსტა",
      logout: "გამოსვლა",
      open: "ღია",
      closed: "დახურული",
      selected: "არჩეულია",
      hour: "საათი",
      minute: "წუთი",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLocale,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
