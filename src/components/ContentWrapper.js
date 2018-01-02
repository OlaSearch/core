import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'

function ContentWrapper ({ toggleSidebar, isSidebarOpen, view, children }) {
  let classes = cx('ola-results-flex', `ola-results-view-${view}`, {
    'ola-sidebar-open': isSidebarOpen,
    'ola-sidebar-closed': !isSidebarOpen
  })
  let modalClasses = cx('ola-modal-background', {
    'ola-modal-show': isSidebarOpen,
    'ola-modal-hide': !isSidebarOpen
  })
  return (
    <div className={classes}>
      <div className={modalClasses} onClick={toggleSidebar} />
      {children}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    view: state.AppState.view
  }
}

module.exports = connect(mapStateToProps, { toggleSidebar })(ContentWrapper)
