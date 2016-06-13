import React from 'react'
import { supplant, getComponentDisplayName, translateKey } from './../utilities'
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function injectTranslate (WrappedComponent) {
  class WithTranslate extends React.Component {
    static displayName = `withTranslate(${getComponentDisplayName(WrappedComponent)})`;
    static contextTypes = {
      translations: React.PropTypes.object
    };
    translate = (key, placeholders) => {
      let result = translateKey(key, this.context.translations['messages'])
      if (typeof placeholders === 'undefined') {
        return result
      }
      return supplant(result, placeholders)
    };
    render () {
      return <WrappedComponent {...this.props} translate={this.translate} />
    }
  }
  return hoistNonReactStatic(WithTranslate, WrappedComponent)
}
