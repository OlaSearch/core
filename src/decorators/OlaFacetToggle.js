import React from 'react'
import { getComponentDisplayName } from './../utilities'

export default function withFacetToggle (WrappedComponent) {
  return class WithFacetToggle extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isCollapsed: props.facet.isCollapsed || false
      }
    }
    static displayName = `withFacetToggle(${getComponentDisplayName(WrappedComponent)})`;
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
      return <WrappedComponent {...this.props} isCollapsed={this.state.isCollapsed} toggleDisplay={this.toggleDisplay} />
    }
  }
}
