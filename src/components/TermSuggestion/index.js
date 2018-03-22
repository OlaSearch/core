import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../../decorators/withTranslate'
import { connect } from 'react-redux'
import {
  updateQueryTerm,
  skipSpellcheck,
  executeSearch
} from './../../actions/Search'
import {
  SPELLCHECK_SOURCE_CONTENT,
  SPELLCHECK_SOURCE_UNIVERSAL
} from './../../constants/Settings'

/**
 * Shows a spellchecked query
 */
function TermSuggestion ({
  term,
  answer,
  totalResults,
  translate,
  className,
  q,
  updateQueryTerm,
  spellCheckSource,
  skipSpellcheck,
  executeSearch
}) {
  if (!term) return null
  if (
    (answer &&
      (answer.data ||
        answer.callback ||
        (answer.suggestions && answer.suggestions.length))) ||
    totalResults === 0 ||
    !totalResults
  ) {
    return null
  }
  return (
    <div className='ola-term-suggestion' {...className}>
      <span className='ola-term-suggestion-showing'>
        {translate(
          'suggestions_showing_results_for',
          {
            term,
            no_results_message:
              spellCheckSource === SPELLCHECK_SOURCE_CONTENT
                ? translate('suggestions_no_results', { q })
                : null
          },
          true
        )}
      </span>
      {spellCheckSource === SPELLCHECK_SOURCE_UNIVERSAL ? (
        <span className='ola-term-suggestion-instead'>
          {translate('suggestions_search_instead')}
          <button
            className='ola-btn ola-btn-term-suggestion'
            type='button'
            onClick={() => {
              /* Change the query term */
              updateQueryTerm(q)
              /* Skip both intent engine and solr spellchecker */
              skipSpellcheck(true)
              /* Search */
              executeSearch()
            }}
          >
            {q}
          </button>
        </span>
      ) : null}
    </div>
  )
}

TermSuggestion.propTypes = {
  term: PropTypes.string
}

function mapStateToProps (state, ownProps) {
  return {
    term: ownProps.term || state.AppState.suggestedTerm,
    q: ownProps.q || state.QueryState.q,
    totalResults:
      typeof ownProps.totalResults !== 'undefined'
        ? ownProps.totalResults
        : state.AppState.totalResults,
    answer: state.AppState.answer,
    spellCheckSource: state.AppState.spellCheckSource,
    isLoading: ownProps.isLoading || state.AppState.isLoading
  }
}

module.exports = connect(mapStateToProps, {
  updateQueryTerm,
  skipSpellcheck,
  executeSearch
})(withTranslate(TermSuggestion))
