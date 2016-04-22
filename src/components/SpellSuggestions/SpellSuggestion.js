import React from 'react'
import { updateQueryTerm, executeSearch } from './../../actions/Search'

class SpellSuggestion extends React.Component {
  static propTypes = {
    suggestions: React.PropTypes.array.isRequired,
    totalResults: React.PropTypes.number.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    showCount: React.PropTypes.bool
  };

  static defaultProps = {
    showCount: true
  };

  onChange = (term) => {
    var { dispatch } = this.props

    dispatch(updateQueryTerm(term))

    dispatch(executeSearch())
  };
  handleClick = (term) => {
    this.props.onChange ? this.props.onChange(term) : this.onChange(term)
  };
  render () {
    var {
      suggestions,
      totalResults,
      showCount
    } = this.props

    if (!suggestions.length) return null

    var max = suggestions.reduce((a, b) => a.count > b.count ? a : b)

    /* Check if Current results is less than the suggestions */

    if (totalResults >= max.count) return null

    return (
      <div className='ola-spell-suggestion'>
        <span>Did you mean</span>
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
        className='ola-btn ola-spell-links'
        onClick={this.handleClick}
      >
        <span className='ola-spell-term'>{term}</span>
        {showCount && <span className='ola-spell-count'>{count}</span>}
      </button>
    )
  }
}

module.exports = SpellSuggestion
