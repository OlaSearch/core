import React from 'react'
import { initSearch } from './../actions/Search'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'

module.exports = (WrappedComponent) => {
  class OlaRoute extends React.Component {
    static contextTypes = {
      config: React.PropTypes.object,
      router: React.PropTypes.object
    };
    static displayName = `olaRoute(${getComponentDisplayName(WrappedComponent)})`;
    componentWillMount () {
      if (!this.context.router) window.addEventListener('popstate', this.onPopState)
    }
    componentWillUnmount () {
      if (!this.context.router) window.removeEventListener('popstate', this.onPopState)
    }
    componentWillReceiveProps (nextProps) {
      if (this.context.router && this.props.location.search !== nextProps.location.search) this.onPopState()
    }
    onPopState = () => {
      console.log('called')
      this.props.dispatch(initSearch({ config: this.context.config }))
    };
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return hoistNonReactStatics(OlaRoute, WrappedComponent)
}
