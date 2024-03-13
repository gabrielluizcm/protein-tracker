// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationPT from './locales/pt.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
