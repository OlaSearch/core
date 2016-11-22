import React from 'react'
import SnippetFallback from './../Snippets/Default'
import Answer from './../Snippets/Answer'
import { getMatchingSnippet } from './../../utilities'
import classNames from 'classnames'

class SearchResults extends React.Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired,
    bookmarks: React.PropTypes.array,
    dispatch: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    alwaysUpdate: false
  };

  static contextTypes = {
    config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
  };

  shouldComponentUpdate (nextProps) {
    if (nextProps.alwaysUpdate) return true
    return (
      this.props.results !== nextProps.results ||
      this.props.bookmarks !== nextProps.bookmarks
    )
  }

  render () {
    let { results, className, snippet: snippetOverride, ...rest } = this.props
    let { snippetRules, defaultSnippet } = this.context.config
    let klass = classNames('ola-results', className)
    return (
      <div className={klass}>
        {results.map((result, idx) => {
          let { ola_answer: isAnswer } = result
          let OlaSnippet = isAnswer ? Answer : snippetOverride || getMatchingSnippet(snippetRules, result) || defaultSnippet || SnippetFallback
          let key = result.id || idx
          return (
            <OlaSnippet
              result={result}
              key={key}
              {...rest}
            />
          )
        })}
      </div>
    )
  }
}

module.exports = SearchResults
