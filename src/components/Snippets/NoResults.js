import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../../decorators/withTranslate'
import { removeAllFacets, executeSearch } from './../../actions/Search'

/**
 * Shown when there are no search results
 * @example ./src/components/Snippets/NoResults.md
 */
function NoResults ({
  totalResults,
  isLoading,
  q,
  translate,
  suggestedTerm,
  facets,
  dispatch
}) {
  /*
    Removed `q` (23/6/17 - Vinay)
    q can be empty when filters are used
    (!q && !facets.length)
   */
  if (totalResults || isLoading) return null
  if (!q && !facets.length) return null
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
  var message
  if (totalResults === 0 && suggestedTerm && facets.length > 0) {
    message = (
      <div>
        {translate('no_results_found_filters_too_restrictive', { q }, true, {
          tagName: 'span'
        })}
        <button
          className='ola-reset-filters'
          type='button'
          onClick={removeFilters}
        >
          Remove filters
        </button>
      </div>
    )
  } else {
    if (facets.length) {
      message = (
        <div>
          {translate('no_results_found_filters_only', null, true, {
            tagName: 'span'
          })}
          <button
            className='ola-reset-filters'
            type='button'
            onClick={removeFilters}
          >
            Remove filters
          </button>
        </div>
      )
    } else message = translate('no_results_found', { q }, true)
  }

  return (
    <div className='ola-snippet ola-snippet-noresults'>
      <div className='ola-snippet-inner'>{message}</div>
    </div>
  )
}

NoResults.defaultProps = {
  facets: []
}

NoResults.propTypes = {
  /**
   * Total no of results
   */
  totalResults: PropTypes.number,
  /**
   * Boolean to check if search is in progress
   */
  isLoading: PropTypes.bool,
  /**
   * Search query
   */
  q: PropTypes.string,
  /**
   * Spell-checked query
   */
  suggestedTerm: PropTypes.string,
  /**
   * List of facets selected
   */
  facets: PropTypes.array
}

module.exports = withTranslate(NoResults)
