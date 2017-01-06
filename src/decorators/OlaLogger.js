import React from 'react'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { log } from './../actions/Logger'

module.exports = (WrappedComponent) => {
  const WithLogger = (props, { store }) => {
    function logFn (params) {
      store.dispatch(log(params))
    }
    return <WrappedComponent {...props} log={logFn} />
  }
  WithLogger.contextTypes = {
    store: React.PropTypes.object
  }
  return hoistNonReactStatics(WithLogger, WrappedComponent)
}
