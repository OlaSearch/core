import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { toggleView } from './../actions/Ui'
import { getNextView } from './../utilities'
import withTranslate from './../decorators/withTranslate'
import ViewModule from '@olasearch/icons/lib/material-view_module'
import ViewList from '@olasearch/icons/lib/material-view_list'

function LayoutButton ({
  toggleView,
  facets,
  view,
  translate,
  layoutSwitching
}) {
  /**
   * Check if its enable
   */
  if (!layoutSwitching) return null
  const nextView = getNextView(view)
  const classes = cx('ola-link-change-layout', {
    [`ola-link-layout-${nextView}`]: nextView
  })
  const title = translate('change_layout', { view: nextView })
  return (
    <button
      className={classes}
      onClick={() => toggleView(nextView)}
      type='button'
      title={title}
    >
      {view === 'list' ? <ViewModule /> : <ViewList />}
      <span>{title}</span>
    </button>
  )
}

function mapStateToProps (state) {
  return {
    view: state.AppState.view,
    layoutSwitching: state.AppState.layoutSwitching
  }
}

module.exports = connect(mapStateToProps, { toggleView })(
  withTranslate(LayoutButton)
)
