import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  createHTMLMarkup,
  highlightTokens,
  getDisplayName
} from './../../utilities'
import {
  RE_ESCAPE,
  TYPE_DOC,
  TYPE_HISTORY,
  TYPE_TAXONOMY,
  TYPE_FACET
} from './../../constants/Settings'
import AnswerQuick from './../Answer/AnswerQuick'

function groupFacets (suggestions, fieldLabels) {
  let group = {}
  suggestions.forEach((s) => {
    let label = fieldLabels[s.taxo_label] || s.taxo_label
    if (!(label in group)) {
      group[label] = []
    }
    group[label].push(s)
  })
  return group
}

export default function Suggestions ({ q, results, fieldLabels, ...rest }) {
  let isFacet = false // results.some(({ type }) => type === 'facet')
  let groups = isFacet ? groupFacets(results, fieldLabels) : {}
  return (
    <div className='ola-fuzzy-suggestions'>
      {isFacet
        ? Object.keys(groups).map((key) => {
          return (
            <div key={key}>
              <div className='ola-suggestion-header'>{key}</div>
              {groups[key].map((result, idx) => (
                <SuggestionItem
                  key={idx}
                  index={idx}
                  q={q}
                  result={result}
                  {...rest}
                />
              ))}
            </div>
          )
        })
        : results.map((result, idx) => (
          <SuggestionItem
            key={idx}
            index={idx}
            q={q}
            result={result}
            {...rest}
          />
        ))}
    </div>
  )
}

Suggestions.defaultProps = {
  fieldLabels: {}
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
  }
  onMouseOver = () => {
    this.setState({
      isActive: true
    })
  }
  onMouseOut = () => {
    this.setState({
      isActive: false
    })
  }
  onSelect = (event, result) => {
    this.props.onSelect(result || this.props.result, {
      position: this.props.index + 1,
      event
    })
    event && event.preventDefault()
  }
  removeHistory = (event) => {
    this.props.onRemoveHistory(this.props.result)
    event.stopPropagation()
  }
  createMarkup = (term, tokens) => {
    /* Highlight tokens if available */
    // console.log(term, tokens, highlightTokens(term, tokens))
    if (tokens) term = highlightTokens(term, tokens)

    return createHTMLMarkup(term)
  }
  render () {
    let activeClass = this.state.isActive ? this.props.activeClassName : null
    let { index, result } = this.props
    if (!result) return null
    let {
      type,
      term,
      title,
      taxo_term: taxoTerm,
      isLastCategory,
      isFirstCategory,
      answer,
      tokens
    } = result
    const isHistory = type === TYPE_HISTORY
    const isFacet = type === TYPE_FACET
    const isDoc = type === TYPE_DOC
    let pattern =
      '(^' +
      this.props.q
        .replace(RE_ESCAPE, '\\$1')
        .split(/\s/)
        .join('|') +
      ')'

    /**
     * Get the display name of the facet
     * lower|ID|Normal
     */
    if (isFacet) term = getDisplayName(null, term)

    /* Create term */
    if (isDoc) {
      term = title
    } else {
      if ((tokens && tokens.length) || isHistory) {
        // Pass
      } else {
        term = term.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>')
      }
    }

    let klass = classNames(
      'ola-suggestion-item',
      activeClass,
      `ola-suggestion-type-${type}`,
      {
        'ola-suggestion-category-last': isLastCategory,
        'ola-suggestion-category-first': isFirstCategory,
        'ola-suggestion-category-name': taxoTerm,
        'ola-suggestion-history': isHistory,
        'ola-suggestion-hasToken': tokens && tokens.length,
        'ola-suggestion-hasAnswer': answer && index === 0
      }
    )
    /**
     * If its a category
     */
    if (taxoTerm && type !== TYPE_TAXONOMY) {
      term =
        term +
        (taxoTerm
          ? '<span class="ola-suggestion-separator"> in </span><span class="ola-suggestion-category-name">' +
            taxoTerm +
            '</span>'
          : '')
    }
    return (
      <div className='ola-suggestion-wrapper'>
        <div
          className={klass}
          onClick={this.onSelect}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          <div
            className='ola-suggestion-item-text'
            dangerouslySetInnerHTML={this.createMarkup(term, tokens)}
          />
          {index === 0 ? (
            <AnswerQuick
              answer={answer}
              onSelect={this.onSelect}
              index={index}
            />
          ) : null}
        </div>
      </div>
    )
  }
}
