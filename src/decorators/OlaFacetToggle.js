import React from 'react'

export var facetToggle = (ComposedComponent) => class extends React.Component {
  static displayName = 'OlaFacetToggle'

  constructor (props) {
    super(props)
    this.state = {
      isCollapsed: false
    }
  }

  toggleDisplay = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  render () {
    return <ComposedComponent {...this.props} isCollapsed={this.state.isCollapsed} toggleDisplay={this.toggleDisplay} />
  }
}
