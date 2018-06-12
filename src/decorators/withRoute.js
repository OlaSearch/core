import React from 'react'
import PropTypes from 'prop-types'
import { initSearch } from './../actions/Search'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * Check if react router is enabled and use it to manage URL state
 * @param  {Object} WrappedComponent
 * @return {Object}
 */
export default function (WrappedComponent) {
  class WithRoute extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    }
    static displayName = `withRoute(${getComponentDisplayName(
      WrappedComponent
    )})`
    componentDidMount () {
      if (!this.context.router) {
        window.addEventListener('popstate', this.onPopState)
      }
    }
    componentWillUnmount () {
      if (!this.context.router) {
        window.removeEventListener('popstate', this.onPopState)
      }
    }
    componentDidUpdate (prevProps) {
      if (
        this.context.router &&
        this.props.location.search !== prevProps.location.search
      ) {
        this.onPopState()
      }
    }
    onPopState = () => {
      if (!this.props.dispatch) return
      this.props.dispatch(initSearch({ config: this.props.config }))
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return hoistNonReactStatics(WithRoute, WrappedComponent)
}
