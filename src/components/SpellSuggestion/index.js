import React from 'react'
import PropTypes from 'prop-types'
import {
  updateQueryTerm,
  executeSearch,
  removeAllTokens
} from './../../actions/Search'
import withTranslate from './../../decorators/withTranslate'
import { SEARCH_INPUTS } from './../../constants/Settings'

/**
 * Did you mean spell suggestions
 */
function SpellSuggestion (props) {
  function onChange (term) {
    const { dispatch } = props
    /* Update the query term */
    dispatch(updateQueryTerm(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION))
    /* Remove any tokens */
    dispatch(removeAllTokens())
    /* Do a search */
    dispatch(executeSearch())
  }
  function handleClick (term) {
    props.onChange
      ? props.onChange(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION)
      : onChange(term)
  }
  const { suggestions, showCount, translate } = props

  if (!suggestions.length) return null

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
  dispatch: PropTypes.func.isRequired,
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

module.exports = withTranslate(SpellSuggestion)
