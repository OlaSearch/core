import React from 'react'
import { initSearch } from './../actions/Search'

export var OlaRoute = (ComposedComponent) => class extends React.Component {
  static displayName = 'OlaRoute'

  static contextTypes = {
    config: React.PropTypes.object
  };

  componentWillMount () {
    window.addEventListener('popstate', this.onPopState)
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this.onPopState)
  }

  onPopState = () => {
    this.props.dispatch(initSearch({ config: this.context.config }))
  };

  render () {
    return <ComposedComponent {...this.props} />
  }
}
