import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import us from './locales/us.json'
import jp from './locales/jp.json'

export const resources = {
  us: {
    translation: us,
  },
  jp: {
    translation: jp,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'jp', // if you're using a language detector, do not define the lng option
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})
