import React from 'react'
import { connect } from 'react-redux'
import { supplant, getComponentDisplayName } from './../utilities'

export default function withTranslate (WrappedComponent) {
  class WithTranslate extends React.Component {
    static displayName = `withTranslate(${getComponentDisplayName(WrappedComponent)})`;
    translate = (key, placeholders) => {
      let { locale, translations } = this.props.Intl
      let result = translations[locale]['messages'][key]
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
