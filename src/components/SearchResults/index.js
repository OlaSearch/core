import React from 'react'
import PropTypes from 'prop-types'
import SnippetFallback from './../Snippets/Default'
import AnswerSnippet from './../Snippets/Answer'
import { getMatchingSnippet } from './../../utilities'
import classNames from 'classnames'
import withTheme from './../../decorators/withTheme'
import withConfig from './../../decorators/withConfig'
import Swipeable from './../Swipeable'

/**
 * Display search results
 */
class SearchResults extends React.Component {
  static propTypes = {
    /**
     * Array of search results
     */
    results: PropTypes.array.isRequired,
    /**
     * List of bookmarks
     */
    bookmarks: PropTypes.array
  }

  static defaultProps = {
    alwaysUpdate: false,
    results: [],
    bookmarks: []
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.alwaysUpdate) return true
    return (
      this.props.results !== nextProps.results ||
      this.props.bookmarks !== nextProps.bookmarks
    )
  }

  render () {
    const {
      results,
      className,
      snippet: snippetOverride,
      theme,
      config,
      ...rest
    } = this.props
    const { snippetRules, defaultSnippet } = config
    const classes = classNames('ola-results', className)
    return (
      <div className={classes}>
        {results.map((result, idx) => {
          const { ola_answer: isAnswer } = result
          const OlaSnippet = isAnswer
            ? AnswerSnippet
            : snippetOverride ||
              getMatchingSnippet(snippetRules, result) ||
              defaultSnippet ||
              SnippetFallback
          const key = result.id || idx
          return (
            <OlaSnippet result={result} key={key} theme={theme} {...rest} />
          )
        })}
        <style jsx>
          {`
            .ola-results :global(.ola-field-title a) {
              color: ${theme.searchLinkColor};
            }
            .ola-results :global(.ola-field-title a:hover),
            .ola-results :global(.ola-field-title a:focus) {
              color: ${theme.searchLinkHoverColor};
            }
            .ola-results :global(.ola-cta-button) {
              color: ${theme.primaryButtonColor};
              background: ${theme.primaryButtonBackground};
            }
            .ola-results :global(.ola-btn-share) {
              color: ${theme.shareButtonColor};
              background: ${theme.shareButtonBackground};
            }
            .ola-results :global(.ola-drop-link) {
              color: ${theme.primaryColor};
              background: white;
            }
            .ola-results :global(.ola-drop-link:hover) {
              background: #eee;
            }
            .ola-results :global(.ola-btn-directions) {
              color: ${theme.primaryColor};
            }
            .ola-results :global(.ola-btn-person) {
              color: ${theme.primaryColor};
            }
          `}
        </style>
      </div>
    )
  }
}

module.exports = withConfig(withTheme(SearchResults))
