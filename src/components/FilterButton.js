import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'

function FilterButton ({ toggleSidebar, facets, isSidebarOpen }) {
  const hasFilter = facets.some((item) => item.values.length > 0)
  const classes = cx('ola-link-open-filter', {
    'ola-link-open-filter-active': isSidebarOpen
  })
  return (
    <button
      className={classes}
      onClick={toggleSidebar}
      type='button'
      disabled={!hasFilter}
    >
      <span>Filter</span>
    </button>
  )
}

FilterButton.defaultProps = {
  facets: []
}

function mapStateToProps (state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    facets: state.AppState.facets
  }
}

module.exports = connect(mapStateToProps, { toggleSidebar })(FilterButton)
