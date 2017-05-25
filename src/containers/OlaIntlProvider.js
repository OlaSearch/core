import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _t from './../translations'
import { supplant, translateKey, createHTMLMarkup } from './../utilities'

class OlaIntlProvider extends React.Component {
  constructor (props) {
    super(props)
    let { locale, translations: t = {} } = props
    this.messages = {
      ..._t[locale] ? _t[locale]['messages'] : {},
      ...t[locale] ? t[locale]['messages'] : {}
    }
  }
  static childContextTypes = {
    translate: PropTypes.func
  };
  translate = (key, placeholders, isHTML, options = {}) => {
    let result = translateKey(key, this.messages)
    let tagName = options.tagName || 'div'
    if (typeof placeholders === 'undefined') {
      return result
    }
    let finalResult = supplant(result, placeholders)
    return isHTML
    ? React.createElement(tagName, { dangerouslySetInnerHTML: createHTMLMarkup(finalResult) }, null)
    : finalResult
  };
  getChildContext () {
    return {
      translate: this.translate
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
