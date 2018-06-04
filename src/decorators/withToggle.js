import React from 'react'
import { getComponentDisplayName } from './../utilities'
import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * Show hide components
 */
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
    static getDerivedStateFromProps (nextProps, prevState) {
      if (
        nextProps.facet &&
        nextProps.facet.isCollapsed !== prevState.isCollapsed &&
        nextProps.facet.isCollapsed
      ) {
        return {
          isCollapsed: nextProps.facet.isCollapsed
        }
      }
      return null
    }
    toggle = () => {
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
          toggle={this.toggle}
          open={this.open}
          hide={this.hide}
        />
      )
    }
  }
  return hoistNonReactStatics(WithToggle, WrappedComponent)
}
