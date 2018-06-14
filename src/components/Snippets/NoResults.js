import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../../decorators/withTranslate'
import { removeAllFacets, executeSearch } from './../../actions/Search'
import { connect } from 'react-redux'

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
  removeAllFacets,
  executeSearch,
  canRemoveFilters
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
    removeAllFacets()
    executeSearch()
  }
  var message
  const resetFilters = (
    <button className='ola-reset-filters' type='button' onClick={removeFilters}>
      {translate('no_results_remove_filters')}
    </button>
  )
  if (totalResults === 0 && suggestedTerm && facets.length > 0) {
    message = (
      <div>
        {translate('no_results_found_filters_too_restrictive', { q }, true, {
          tagName: 'span'
        })}
        {canRemoveFilters ? resetFilters : null}
      </div>
    )
  } else {
    if (facets.length) {
      message = (
        <div>
          {translate('no_results_found_filters_only', null, true, {
            tagName: 'span'
          })}
          {canRemoveFilters ? resetFilters : null}
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
  facets: [],
  canRemoveFilters: true
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
  facets: PropTypes.array,
  /**
   * Can user remove filters if applied
   */
  canRemoveFilters: PropTypes.bool
}

export default connect(null, { removeAllFacets, executeSearch })(
  withTranslate(NoResults)
)
