import React from 'react'
import classNames from 'classnames'
import { createHTMLMarkup, truncate } from './../../utilities'
import { RE_ESCAPE } from './../../constants/Settings'

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
  buildAnswers = (answer) => {
    let str = `<div class='ola-answer-autocomplete'>`
    let totalFound = answer.length
    answer.filter((item, idx) => idx < 1).forEach((item) => {
      str+= `
        <div class='ola-answer-item'>
          ${item.image ?
            `<div class='ola-answer-image'>
              <img src='${item.image}' alt='${item.title}' />
            </div>`
            : ''
          }
          <div class='ola-answer-content'>
            <p class='ola-answer-title'>${item.title}</p>
            ${item.description ? `<p class='ola-answer-desc'>${truncate(item.description, 100)}</p>`: ''}
            ${totalFound > 1 ? `<p class='ola-answer-more'>Found ${totalFound} more results. View all</p>` : ''}
          </div>
        </div>
      `
    })
    str+=`</div>`
    return str
  }
  render () {
    let activeClass = this.state.isActive ? this.props.activeClassName : null
    let { type, answer, term, taxo_term, isLastCategory, isFirstCategory } = this.props.result
    let pattern = '(^' + this.props.q.replace(RE_ESCAPE, '\\$1') + ')'

    /* Create term */
    term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>')

    let klass = classNames('ola-suggestion-item', activeClass, `ola-suggestion-type-${type}`, {
      'ola-suggestion-category-last': isLastCategory,
      'ola-suggestion-category-first': isFirstCategory,
      'ola-suggestion-category-name': taxo_term
    })
    /**
     * If its a category
     */
    if (taxo_term && type !== 'taxonomy') {
      term = term + (taxo_term ? ' in <span class="ola-suggestion-category-name">' + taxo_term + '</span>' : '')
    }

    /**
     * If its a answer
     */
    if (type === 'answer') {
      term = this.buildAnswers(answer)
    }

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
