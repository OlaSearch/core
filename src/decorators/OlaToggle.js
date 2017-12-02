import React from 'react'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default function withToggle (WrappedComponent) {
  class WithToggle extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isCollapsed: props.facet ? props.facet.isCollapsed : false
      }
    }
    static displayName = `withToggle(${getComponentDisplayName(
      WrappedComponent
    )})`
    componentWillReceiveProps (nextProps) {
      if (
        nextProps.facet &&
        nextProps.facet.isCollapsed !== this.props.facet.isCollapsed
      ) {
        this.setState({
          isCollapsed: nextProps.facet.isCollapsed
        })
      }
    }
    toggleDisplay = () => {
      this.setState({
        isCollapsed: !this.state.isCollapsed
      })
    }
    hide = () => this.setState({ isCollapsed: false })
    open = () => this.setState({ isCollapsed: true })
    render () {
      return (
        <WrappedComponent
          {...this.props}
          isCollapsed={this.state.isCollapsed}
          toggleDisplay={this.toggleDisplay}
          open={open}
          hide={hide}
        />
      )
    }
  }
  return hoistNonReactStatics(WithToggle, WrappedComponent)
}
