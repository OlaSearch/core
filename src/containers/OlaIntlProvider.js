import React, { Children } from 'react'
import { connect } from 'react-redux'
import _t from './../translations'

class OlaIntlProvider extends React.Component {
  static childContextTypes = {
    translations: React.PropTypes.object
  };
  getChildContext () {
    let { locale, translations: t = {} } = this.props
    return {
      translations: {
        locales: t[locale] ? t[locale]['locales'] : _t[locale]['locales'],
        messages: Object.assign({}, _t[locale]['messages'], t[locale] ? t[locale]['messages'] : {})
      }
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
