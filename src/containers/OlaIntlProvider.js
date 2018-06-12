import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as baseTranslations from './../translations'
import { supplant, translateKey, createHTMLMarkup } from './../utilities'
import { TranslateProvider } from './TranslateContext'

/**
 * Intl provider to access language translations
 */
class OlaIntlProvider extends React.Component {
  constructor (props) {
    super(props)
    const { locale, translations = {} } = props
    /**
     * Cache all translations
     * Translations cannot be dynamically changed. Store in state only if required
     */
    this.messages = {
      ...(baseTranslations[locale] ? baseTranslations[locale]['messages'] : {}),
      ...(translations[locale] ? translations[locale]['messages'] : {})
    }
  }
  static propTypes = {
    /**
     * Current locale
     * @type {String}
     */
    locale: PropTypes.string
  }
  static defaultProps = {
    locale: 'en'
  }
  translate = (key, placeholders, isHTML, options = {}) => {
    const result = translateKey(key, this.messages)
    const tagName = options.tagName || 'div'
    if (typeof placeholders === 'undefined') {
      return result
    }
    const finalResult = supplant(result, placeholders)
    return isHTML
      ? React.createElement(
        tagName,
        { dangerouslySetInnerHTML: createHTMLMarkup(finalResult) },
        null
      )
      : finalResult
  }
  render () {
    return (
      <TranslateProvider value={this.translate}>
        {this.props.children}
      </TranslateProvider>
    )
  }
}

function mapPropsToState (state) {
  const { Intl } = state
  return {
    ...Intl,
    key: Intl.locale
  }
}

export default connect(mapPropsToState)(OlaIntlProvider)
