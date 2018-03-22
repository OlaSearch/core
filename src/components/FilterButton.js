import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'
import withTranslate from './../decorators/withTranslate'
import Tune from '@olasearch/icons/lib/material-tune'

/**
 * Show/hide filters
 */
function FilterButton ({
  toggleSidebar,
  facets,
  isSidebarOpen,
  translate,
  showSidebar
}) {
  /**
   * Check if its enable
   */
  if (!showSidebar) return null
  const hasFilter = facets.some((item) => item.values.length > 0)
  const classes = cx('ola-link-open-filter', {
    'ola-link-open-filter-active': isSidebarOpen
  })
  const title = isSidebarOpen
    ? translate('filter_button_close')
    : translate('filter_button_open')
  return (
    <button
      className={classes}
      onClick={toggleSidebar}
      type='button'
      disabled={!hasFilter}
      title={title}
    >
      <Tune />
      <span>{title}</span>
    </button>
  )
}

FilterButton.defaultProps = {
  facets: []
}

FilterButton.contextTypes = {
  sidebar: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    showSidebar: state.AppState.showSidebar,
    facets: state.AppState.facets
  }
}

module.exports = connect(mapStateToProps, { toggleSidebar })(
  withTranslate(FilterButton)
)
