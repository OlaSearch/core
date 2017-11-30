import React from 'react'
import PropTypes from 'prop-types'
import { updateQueryTerm, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/OlaTranslate'
import { SEARCH_INPUTS } from './../../constants/Settings'

function SpellSuggestion (props) {
  function onChange (term) {
    var { dispatch } = props
    dispatch(updateQueryTerm(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION))
    dispatch(executeSearch())
  }
  function handleClick (term) {
    props.onChange ? props.onChange(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION) : onChange(term)
  }
  var {
    suggestions,
    showCount,
    translate
  } = props

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

  let { term, count } = item
  return (
    <button
      type='button'
      className='ola-spell-links'
      onClick={onClick}
    >
      <span className='ola-spell-term'>{term}</span>
      {showCount && <span className='ola-spell-count'>{count}</span>}
    </button>
  )
}

module.exports = injectTranslate(SpellSuggestion)
