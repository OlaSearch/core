import React from 'react'
import withTranslate from './../../decorators/withTranslate'
import { connect } from 'react-redux'
import {
  updateQueryTerm,
  skipSpellcheck,
  executeSearch
} from './../../actions/Search'

function TermSuggestion ({
  term,
  answer,
  totalResults,
  translate,
  className,
  q,
  updateQueryTerm,
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
        {translate('suggestions_showing_results_for', { term, q }, true)}
      </span>
      {/* <span className='ola-term-suggestion-instead'>
        {translate('suggestions_search_instead')}{' '}
        <button
          className='ola-btn ola-btn-link'
          type='button'
          onClick={() => {
            updateQueryTerm(q)
            skipSpellcheck(true)
            executeSearch()
          }}
        >
          {q}
        </button>
      </span> */}
    </div>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    term: ownProps.suggestedTerm || state.AppState.suggestedTerm,
    q: ownProps.q || state.QueryState.q,
    totalResults: ownProps.totalResult || state.AppState.totalResults,
    answer: state.AppState.answer,
    isLoading: ownProps.isLoading || state.AppState.isLoading
  }
}

module.exports = connect(mapStateToProps, {
  updateQueryTerm,
  skipSpellcheck,
  executeSearch
})(withTranslate(TermSuggestion))
