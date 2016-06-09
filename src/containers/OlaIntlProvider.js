import React from 'react'
import defaultTranslations from './../translations'
import { IntlProvider } from 'react-intl'

const OlaIntlProvider = ({ lang = 'en', translations = {}, children }) => {
  var activeTranslation = lang && translations ? translations[lang] : {}
  var { locales, messages, formats } = { ...defaultTranslations[lang], ...activeTranslation }
  return (
    <IntlProvider locale={locales} messages={messages} formats={formats}>
      {children}
    </IntlProvider>
  )
}

module.exports = OlaIntlProvider
