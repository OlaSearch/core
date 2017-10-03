import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { createHTMLMarkup } from './../../utilities'
import { RE_ESCAPE } from './../../constants/Settings'
import AnswerQuick from './../Answer/AnswerQuick'

const Suggestions = ({ q, results, ...rest }) => {
  return (
    <div className='ola-fuzzy-suggestions'>
      {results.map((result, idx) => <SuggestionItem key={idx} index={idx} q={q} result={result} {...rest} />)}
    </div>
  )
}

/**
 * Suggestion item
 */
class SuggestionItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }
  }
  static propTypes = {
    result: PropTypes.obj.isRequired
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
    event && event.preventDefault()
  };
  render () {
    let activeClass = this.state.isActive ? this.props.activeClassName : null
    let { index, result } = this.props
    let { type, term, taxo_term: taxoTerm, isLastCategory, isFirstCategory, history, answer } = result
    let pattern = '(^' + this.props.q.replace(RE_ESCAPE, '\\$1').split(/\s/).join('|') + ')'

    /* Create term */
    term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>')

    let klass = classNames('ola-suggestion-item', activeClass, `ola-suggestion-type-${type}`, {
      'ola-suggestion-category-last': isLastCategory,
      'ola-suggestion-category-first': isFirstCategory,
      'ola-suggestion-category-name': taxoTerm,
      'ola-suggestion-history': history,
      'ola-suggestion-hasAnswer': answer && index === 0
    })
    /**
     * If its a category
     */
    if (taxoTerm && type !== 'taxonomy') {
      term = term + (taxoTerm ? '<span class="ola-suggestion-separator"> in </span><span class="ola-suggestion-category-name">' + taxoTerm + '</span>' : '')
    }
    return (
      <div className='ola-suggestion-wrapper'>
        <div
          className={klass}
          onClick={this.onSelect}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          <div className='ola-suggestion-item-text' dangerouslySetInnerHTML={createHTMLMarkup(term)} />
          {index === 0
            ? <AnswerQuick
              answer={answer}
              onSelect={this.onSelect}
              index={index}
              />
            : null
          }
        </div>
      </div>
    )
  }
}

module.exports = Suggestions
