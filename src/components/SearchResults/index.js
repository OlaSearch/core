import React from 'react'
import SnippetDefault from './../Snippets/Default'
import { getMatchingSnippet } from './../../utilities'
import classNames from 'classnames'

class SearchResults extends React.Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired,
    bookmarks: React.PropTypes.array,
    dispatch: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
  };

  shouldComponentUpdate (nextProps) {
    return (
      this.props.results !== nextProps.results ||
      this.props.bookmarks !== nextProps.bookmarks
    )
  }

  render () {
    let { results, className, ...rest } = this.props
    let { snippetRules, defaultSnippet } = this.context.config
    let klass = classNames('ola-results', className)
    return (
      <div className={klass}>
        {results.map((result, idx) => {
          let OlaSnippet = getMatchingSnippet(snippetRules, result) || defaultSnippet || SnippetDefault
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
