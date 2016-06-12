import React from 'react'
import { connect } from 'react-redux'
import { supplant, getComponentDisplayName, translateKey } from './../utilities'

export default function withTranslate (WrappedComponent) {
  class WithTranslate extends React.Component {
    static displayName = `withTranslate(${getComponentDisplayName(WrappedComponent)})`;
    translate = (key, placeholders) => {
      let { locale, translations } = this.props.Intl
      let result = translateKey(key, translations[locale]['messages'])
      if (typeof placeholders === 'undefined') {
        return result
      }
      return supplant(result, placeholders)
    };
    render () {
      return <WrappedComponent {...this.props} translate={this.translate} />
    }
  }

  return connect((state) => ({
    Intl: state.Intl
  }))(WithTranslate)
}
