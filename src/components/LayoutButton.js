import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { toggleView } from './../actions/Ui'
import { getNextView } from './../utilities'
import injectTranslate from './../decorators/injectTranslate'

function LayoutButton ({ toggleView, facets, view, translate }) {
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
      <span>{title}</span>
    </button>
  )
}

function mapStateToProps (state) {
  return {
    view: state.AppState.view
  }
}

module.exports = connect(mapStateToProps, { toggleView })(
  injectTranslate(LayoutButton)
)
