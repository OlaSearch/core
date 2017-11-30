import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { log } from './../actions/Logger'

module.exports = (WrappedComponent) => {
  function WithLogger (props, { store }) {
    function logFn (params) {
      store.dispatch(log(params))
    }
    return <WrappedComponent {...props} log={logFn} />
  }
  WithLogger.contextTypes = {
    store: PropTypes.object
  }
  return hoistNonReactStatics(WithLogger, WrappedComponent)
}
