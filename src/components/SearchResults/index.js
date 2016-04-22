import React from 'react'
import SnippetDefault from './../Snippets/Default'
import NoResults from './../Snippets/NoResults'
import { getMatchingSnippet } from './../../utilities'
import classNames from 'classnames'

class SearchResults extends React.Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired,
    bookmarks: React.PropTypes.array,
    dispatch: React.PropTypes.func,
    isLoading: React.PropTypes.bool
  };

  static contextTypes = {
    config: React.PropTypes.object
  };

  shouldComponentUpdate (nextProps) {
    return (
      this.props.results !== nextProps.results ||
      this.props.bookmarks !== nextProps.bookmarks ||
      this.props.isLoading !== nextProps.isLoading
    )
  }

  render () {
    let { results, isLoading, className, ...rest } = this.props
    let { snippetRules, defaultSnippet, noResultsSnippet } = this.context.config
    let NoResultsSnippet = noResultsSnippet || NoResults
    let klass = classNames('ola-results', className)
    if (!results.length && !isLoading) return <NoResultsSnippet {...this.props} />

    return (
      <div className={klass}>
        {results.map((result, idx) => {
          let OlaSnippet = getMatchingSnippet(snippetRules, result) || defaultSnippet || SnippetDefault

          return (
            <OlaSnippet
              result={result}
              key={idx}
              {...rest}
            />
          )
        })}
      </div>
    )
  }
}

module.exports = SearchResults
