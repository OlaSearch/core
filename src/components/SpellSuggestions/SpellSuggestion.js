import React from 'react'
import { updateQueryTerm, executeSearch } from './../../actions/Search'
import injectTranslate from './../../decorators/olaTranslate'

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

    dispatch(updateQueryTerm(term))

    dispatch(executeSearch())
  };
  handleClick = (term) => {
    this.props.onChange ? this.props.onChange(term) : this.onChange(term)
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
class TermItem extends React.Component {
  handleClick = () => {
    this.props.handleClick(this.props.item.term)
  };
  render () {
    let { item, showCount } = this.props
    let { term, count } = item
    return (
      <button
        type='button'
        className='ola-spell-links'
        onClick={this.handleClick}
      >
        <span className='ola-spell-term'>{term}</span>
        {showCount && <span className='ola-spell-count'>{count}</span>}
      </button>
    )
  }
}

module.exports = injectTranslate(SpellSuggestion)
