import React from 'react'
import classNames from 'classnames'
import { createHTMLMarkup } from './../../utilities'

const Suggestions = ({ q, results, ...rest }) => {
  return (
    <div className='ola-fuzzy-suggestions'>
      {results.map((result, idx) => <SuggestionItem key={idx} q={q} result={result} {...rest} />)}
    </div>
  )
}

/**
 * Suggestion item
 */

const reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g')
class SuggestionItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }
  }

  static propTypes = {
    result: React.PropTypes.obj.isRequired
  };
  onMouseOver = () => {
    this.setState({
      isActive: true
    })
  };
  onMouseOut = () => {
    this.setState({
      isActive: false
    })
  };
  onSelect = (event) => {
    this.props.onSelect(this.props.result)
    event.preventDefault()
  };
  render () {
    let activeClass = this.state.isActive ? this.props.activeClassName : null
    let { term, payload, category_name: categoryName, isLastCategory, isFirstCategory } = this.props.result
    let pattern = '(' + this.props.q.replace(reEscape, '\\$1') + ')'
    term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>') + (categoryName ? ' in <span class="ola-suggestion-category-name">' + categoryName + '</span>' : '')
    let klass = classNames('ola-suggestion-item', activeClass, {
      'ola-suggestion-category-last': isLastCategory,
      'ola-suggestion-category-first': isFirstCategory,
      'ola-suggestion-category-name': payload.taxo_group
    })
    return (
      <a
        className={klass}
        onClick={this.onSelect}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        dangerouslySetInnerHTML={createHTMLMarkup(term)}
      />
    )
  }
}

module.exports = Suggestions
