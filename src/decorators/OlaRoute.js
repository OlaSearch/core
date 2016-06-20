import React from 'react'
import { initSearch } from './../actions/Search'

export const OlaRoute = (ComposedComponent) => class extends React.Component {
  static contextTypes = {
    config: React.PropTypes.object,
    router: React.PropTypes.object
  };
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
    this.props.dispatch(initSearch({ config: this.context.config }))
  };
  render () {
    return <ComposedComponent {...this.props} />
  }
}
