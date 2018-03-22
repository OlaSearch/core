import React from 'react'
import PropTypes from 'prop-types'
import { removeAllFacets, executeSearch } from './../actions/Search'
import withTranslate from './../decorators/withTranslate'

/**
 * Clear all selected facets
 */
function ClearAllFacets ({ selected, dispatch, translate }) {
  function handleClick () {
    dispatch(removeAllFacets())
    dispatch(executeSearch())
  }
  if (!selected.length) return null
  return (
    <button
      type='button'
      className='ola-link-clear-filters'
      onClick={handleClick}
    >
      {translate('clear_all_filters')}
    </button>
  )
}

ClearAllFacets.defaultProps = {
  selected: []
}

ClearAllFacets.propTypes = {
  /**
   * Selected facets
   */
  selected: PropTypes.array,
  dispatch: PropTypes.func,
  translate: PropTypes.func
}

module.exports = withTranslate(ClearAllFacets)
