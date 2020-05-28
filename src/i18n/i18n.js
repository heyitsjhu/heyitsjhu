import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources.json';

// https://www.i18next.com/overview/configuration-options
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng: 'en',
  // debug: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
