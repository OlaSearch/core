import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cross from '@olasearch/icons/lib/x'
import { createHTMLMarkup } from './../../utilities'
import { hideSearchHelp } from './../../actions/Ui'
import withConfig from './../../decorators/withConfig'

function QueryHelp ({ isVisible, showSearchHelp, hideSearchHelp, config }) {
  const { searchHelpText } = config
  if (!isVisible || !showSearchHelp || !searchHelpText) return null
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

QueryHelp.propTypes = {
  isVisible: PropTypes.bool,
  showSearchHelp: PropTypes.bool,
  hideSearchHelp: PropTypes.bool,
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.function])
}

function mapStateToProps (state) {
  return {
    showSearchHelp: state.AppState.showSearchHelp
  }
}

export default connect(mapStateToProps, { hideSearchHelp })(
  withConfig(QueryHelp)
)
