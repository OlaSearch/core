import React from 'react'

export const FacetToggle = (ComposedComponent) => class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isCollapsed: props.facet.isCollapsed || false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.facet.isCollapsed !== this.props.facet.isCollapsed) {
      this.setState({
        isCollapsed: nextProps.facet.isCollapsed
      })
    }
  }

  toggleDisplay = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  };

  render () {
    return <ComposedComponent {...this.props} isCollapsed={this.state.isCollapsed} toggleDisplay={this.toggleDisplay} />
  }
}
