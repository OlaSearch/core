import React from 'react'
import PropTypes from 'prop-types'
import {
  updateQueryTerm,
  executeSearch,
  removeAllTokens
} from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import withLogger from './../../decorators/withLogger'
import { connect } from 'react-redux'
import { SEARCH_INPUTS } from './../../constants/Settings'

/**
 * Did you mean spell suggestions
 */
function SpellSuggestion ({
  suggestions,
  showCount,
  translate,
  log,
  logPayload
}) {
  if (!suggestions.length) return null
  function onChange (term) {
    /* Update the query term */
    updateQueryTerm(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION)
    /* Remove any tokens */
    removeAllTokens()
    /* Do a search */
    executeSearch()
  }
  function handleClick (term) {
    /**
     * Log the click event
     */
    log({
      eventType: 'C',
      eventCategory: 'SpellSuggestion',
      eventAction: 'click',
      eventLabel: term,
      payload: logPayload
    })
    props.onChange
      ? props.onChange(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION)
      : onChange(term)
  }

  return (
    <div className='ola-spell-suggestion'>
      <span>{translate('suggestions_did_you_mean')}</span>
      {suggestions.map((item, idx) => {
        return (
          <TermItem
            handleClick={handleClick}
            showCount={showCount}
            item={item}
            key={idx}
          />
        )
      })}
    </div>
  )
}

SpellSuggestion.propTypes = {
  suggestions: PropTypes.array.isRequired,
  totalResults: PropTypes.number.isRequired,
  showCount: PropTypes.bool
}

SpellSuggestion.defaultProps = {
  showCount: false,
  alwaysVisible: false,
  suggestions: []
}

/**
 * Spell suggestion term
 */
function TermItem ({ item, showCount, handleClick }) {
  function onClick () {
    handleClick(item.term)
  }

  const { term, count } = item
  return (
    <button type='button' className='ola-spell-links' onClick={onClick}>
      <span className='ola-spell-term'>{term}</span>
      {showCount && <span className='ola-spell-count'>{count}</span>}
    </button>
  )
}

export default connect(null, {
  updateQueryTerm,
  executeSearch,
  removeAllTokens
})(withTranslate(withLogger(SpellSuggestion)))
