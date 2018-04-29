import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'
import Overlay from './Overlay'

function ContentWrapper ({
  toggleSidebar,
  isDesktop,
  isSidebarOpen,
  view,
  children
}) {
  const classes = cx('ola-results-flex', `ola-results-view-${view}`, {
    'ola-sidebar-open': isSidebarOpen,
    'ola-sidebar-closed': !isSidebarOpen
  })
  return (
    <div className={classes}>
      <Overlay active={!isDesktop && isSidebarOpen} onDismiss={toggleSidebar} />
      {children}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    isDesktop: state.Device.isDesktop,
    view: state.AppState.view
  }
}

module.exports = connect(mapStateToProps, { toggleSidebar })(ContentWrapper)
