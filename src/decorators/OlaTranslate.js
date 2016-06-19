import React from 'react'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'

module.exports = (WrappedComponent) => {
  const WithTranslate = (props, context) => {
    return <WrappedComponent {...props} translate={context.translate} />
  }
  WithTranslate.displayName = `withTranslate(${getComponentDisplayName(WrappedComponent)})`
  WithTranslate.contextTypes = {
    translate: React.PropTypes.func
  }
  return hoistNonReactStatics(WithTranslate, WrappedComponent)
}
