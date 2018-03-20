import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { log } from './../actions/Logger'

/**
 * Access log function
 * @example withLogger.md
 */
export default function (WrappedComponent) {
  class WithLogger extends React.PureComponent {
    log = (params) => {
      this.context.store.dispatch(log(params))
    }
    render () {
      return <WrappedComponent {...this.props} log={this.log} />
    }
  }
  WithLogger.contextTypes = {
    store: PropTypes.object
  }
  return hoistNonReactStatics(WithLogger, WrappedComponent)
}
