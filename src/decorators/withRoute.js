import React from 'react'
import PropTypes from 'prop-types'
import { initSearch } from './../actions/Search'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * Use React router to manage state. Fallbacks to browser history
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
      this.props.dispatch(initSearch({ config: this.props.config }))
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return hoistNonReactStatics(WithRoute, WrappedComponent)
}
