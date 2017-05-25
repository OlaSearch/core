import React from 'react'
import PropTypes from 'prop-types'
import injectTranslate from './../../decorators/OlaTranslate'
import { removeAllFacets, executeSearch } from './../../actions/Search'

const NoResults = ({
    totalResults,
    isLoading,
    q,
    isBookmark,
    translate,
    suggestedTerm,
    facets,
    dispatch
  }) => {
  if (totalResults || isLoading) return null
  if (!isBookmark && !q) return null
  /**
   * Show help suggestion if:
   * totalResults = 0
   * suggestedTerm is present
   * facets have been applied
   */
  function removeFilters () {
    dispatch(removeAllFacets())
    dispatch(executeSearch())
  }
  let message
  if (totalResults === 0 &&
      suggestedTerm &&
      facets.length > 0) {
    message = (
      <div>
        {translate('no_results_found_filters_too_restrictive', { q }, true, { tagName: 'span' })}<button className='ola-reset-filters' type='button' onClick={removeFilters}>Remove filters</button>
      </div>
    )
  } else {
    message = translate('no_results_found', { q }, true)
    if (isBookmark) {
      message = translate('bookmarks_empty_label')
    }
  }

  return (
    <div className='ola-snippet ola-snippet-noresults'>
      {message}
    </div>
  )
}

NoResults.propTypes = {
  totalResults: PropTypes.number,
  isLoading: PropTypes.bool,
  q: PropTypes.string,
  suggestedTerm: PropTypes.string,
  facets: PropTypes.array
}

module.exports = injectTranslate(NoResults)
