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
  searchOnLoad,
  children,
  q,
  className,
  facet_query
}) {
  if (!(searchOnLoad || (!!q || facet_query.length))) return null
  const classes = cx(
    'ola-results-flex',
    `ola-results-view-${view}`,
    {
      'ola-sidebar-open': isSidebarOpen,
      'ola-sidebar-closed': !isSidebarOpen
    },
    className
  )
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
    q: state.QueryState.q,
    facet_query: state.QueryState.facet_query,
    searchOnLoad: state.AppState.searchOnLoad,
    view: state.AppState.view
  }
}

module.exports = connect(mapStateToProps, { toggleSidebar })(ContentWrapper)
