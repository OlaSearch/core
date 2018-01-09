import React from 'react'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'
import { STYLE_TAG_ID, MODAL_ROOT_CLASSNAME } from './../constants/Settings'

class Sidebar extends React.Component {
  componentDidMount () {
    if (document.getElementById(STYLE_TAG_ID) || this.props.isDesktop) return
    /* Add inline css */
    var style = document.createElement('style')
    style.id = STYLE_TAG_ID
    style.type = 'text/css'
    style.innerHTML = this.props.isDesktop
      ? ``
      : `
      .${MODAL_ROOT_CLASSNAME}, .${MODAL_ROOT_CLASSNAME} body{
        -webkit-overflow-scrolling : touch !important;
        overflow: hidden !important;
        height: 100% !important;
    `
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.isSidebarOpen !== this.props.isSidebarOpen) {
      document.documentElement.classList.toggle(
        MODAL_ROOT_CLASSNAME,
        this.props.isSidebarOpen
      )
    }
  }
  render () {
    let { children, toggleSidebar, isSidebarOpen } = this.props
    return (
      <div className='ola-sidebar'>
        {isSidebarOpen && children}
        <button
          onClick={toggleSidebar}
          type='button'
          className='ola-close-sidebar'
        >
          Close
        </button>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isSidebarOpen: ownProps.isSidebarOpen || state.AppState.isSidebarOpen,
    isDesktop: state.Device.isDesktop
  }
}

module.exports = connect(mapStateToProps, { toggleSidebar })(Sidebar)
