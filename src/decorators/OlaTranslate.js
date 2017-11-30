import React from 'react'
import PropTypes from 'prop-types'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'

module.exports = (WrappedComponent) => {
  function WithTranslate (props, context) {
    return <WrappedComponent {...props} translate={context.translate} />
  }
  WithTranslate.displayName = `withTranslate(${getComponentDisplayName(
    WrappedComponent
  )})`
  WithTranslate.contextTypes = {
    translate: PropTypes.func
  }
  return hoistNonReactStatics(WithTranslate, WrappedComponent)
}
