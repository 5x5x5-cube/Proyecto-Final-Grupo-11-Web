import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonES from './locales/es/common.json';
import travelersES from './locales/es/travelers.json';
import mobileES from './locales/es/mobile.json';
import hotelsES from './locales/es/hotels.json';

import commonEN from './locales/en/common.json';
import travelersEN from './locales/en/travelers.json';
import mobileEN from './locales/en/mobile.json';
import hotelsEN from './locales/en/hotels.json';

i18n.use(initReactI18next).init({
  resources: {
    ES: {
      common: commonES,
      travelers: travelersES,
      mobile: mobileES,
      hotels: hotelsES,
    },
    EN: {
      common: commonEN,
      travelers: travelersEN,
      mobile: mobileEN,
      hotels: hotelsEN,
    },
  },
  lng: 'ES',
  fallbackLng: 'ES',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
