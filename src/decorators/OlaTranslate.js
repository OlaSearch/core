import React from 'react'
import { supplant, getComponentDisplayName, translateKey, createHTMLMarkup } from './../utilities'
import hoistNonReactStatic from 'hoist-non-react-statics'

export default function injectTranslate (WrappedComponent) {
  class WithTranslate extends React.Component {
    static displayName = `withTranslate(${getComponentDisplayName(WrappedComponent)})`;
    static contextTypes = {
      translations: React.PropTypes.object
    };
    translate = (key, placeholders, isHTML) => {
      let result = translateKey(key, this.context.translations['messages'])
      if (typeof placeholders === 'undefined') {
        return result
      }
      return isHTML ? <div dangerouslySetInnerHTML={createHTMLMarkup(supplant(result, placeholders))} /> : supplant(result, placeholders)
    };
    render () {
      return <WrappedComponent {...this.props} translate={this.translate} />
    }
  }
  return hoistNonReactStatic(WithTranslate, WrappedComponent)
}
