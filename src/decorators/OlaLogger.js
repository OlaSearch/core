import React from 'react'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { log } from './../actions/Logger'

module.exports = (WrappedComponent) => {
  class WithLogger extends React.Component {
    log = (params) => this.context.store.dispatch(log(params));
    render () {
      return <WrappedComponent {...this.props} log={log} />
    }
  }
  WithLogger.displayName = `withLogger(${getComponentDisplayName(WrappedComponent)})`
  WithLogger.contextTypes = {
    store: React.PropTypes.object
  }
  return hoistNonReactStatics(WithLogger, WrappedComponent)
}
