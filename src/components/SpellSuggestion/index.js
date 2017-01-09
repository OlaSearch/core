import React from 'react'
import { updateQueryTerm, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/OlaTranslate'
import { SEARCH_INPUTS } from './../../constants/Settings'

class SpellSuggestion extends React.Component {
  static propTypes = {
    suggestions: React.PropTypes.array.isRequired,
    totalResults: React.PropTypes.number.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    showCount: React.PropTypes.bool
  };

  static defaultProps = {
    showCount: false,
    alwaysVisible: false
  };

  onChange = (term) => {
    var { dispatch } = this.props

    dispatch(updateQueryTerm(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION))
    dispatch(executeSearch())
  };
  handleClick = (term) => {
    this.props.onChange ? this.props.onChange(term, SEARCH_INPUTS.DID_YOU_MEAN_SUGGESTION) : this.onChange(term)
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.suggestions !== this.props.suggestions
  }
  render () {
    var {
      suggestions,
      showCount,
      translate
    } = this.props

    if (!suggestions.length) return null

    return (
      <div className='ola-spell-suggestion'>
        <span>{translate('suggestions_did_you_mean')}</span>
        {suggestions.map((item, idx) => {
          return (
            <TermItem
              handleClick={this.handleClick}
              showCount={showCount}
              item={item}
              key={idx}
            />
          )
        })}
      </div>
    )
  }
}

/**
 * Spell suggestion term
 */
const TermItem = ({ item, showCount, handleClick }) => {
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
