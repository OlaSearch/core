import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cross from '@olasearch/icons/lib/x'
import { createHTMLMarkup, truncate } from './../../utilities'
import { hideSearchHelp } from './../../actions/Ui'

function QueryHelp (
  { isVisible, isNewUser, showSearchHelp, hideSearchHelp },
  { config: { searchHelpText } }
) {
  if (!isVisible || !showSearchHelp) return null
  return (
    <div className='ola-query-help'>
      <button className='ola-btn ola-btn-close' onMouseDown={hideSearchHelp}>
        <Cross size={20} />
      </button>
      <div className='ola-query-help-content'>
        <div dangerouslySetInnerHTML={createHTMLMarkup(searchHelpText)} />
      </div>
    </div>
  )
}

QueryHelp.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

function mapStateToProps (state) {
  return {
    isNewUser: state.Context.isNewUser,
    showSearchHelp: state.AppState.showSearchHelp
  }
}

module.exports = connect(mapStateToProps, { hideSearchHelp })(QueryHelp)
