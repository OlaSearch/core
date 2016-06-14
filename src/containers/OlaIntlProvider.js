import React, { Children } from 'react'
import { connect } from 'react-redux'
import defaultTranslations from './../translations'

class OlaIntlProvider extends React.Component {
  static childContextTypes = {
    translations: React.PropTypes.object
  };
  getChildContext () {
    let { locale, translations = {} } = this.props
    return {
      translations: { ...defaultTranslations[locale], ...translations[locale] }
    }
  }
  render () {
    return Children.only(this.props.children)
  }
}

function mapPropsToState (state) {
  const { Intl } = state
  return {
    ...Intl,
    key: Intl.locale
  }
}

module.exports = connect(mapPropsToState)(OlaIntlProvider)
