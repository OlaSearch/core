import React from 'react'
import PropTypes from 'prop-types'
import Title from './../Fields/Title'
import Url from './../Fields/Url'
import TextField from './../Fields/TextField'
import { connect } from 'react-redux'
import { fetchMc } from './../../actions/Search'
import { createHTMLMarkup, escapeRegEx } from './../../utilities'
import withTheme from './../../decorators/withTheme'
import withConfig from './../../decorators/withConfig'

class AnswerMC extends React.Component {
  componentDidMount () {
    this.fetch()
  }
  fetch () {
    let { mc, payload } = this.props
    let { key } = mc
    if (key) this.props.fetchMc(key, payload)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.mc.key !== this.props.mc.key) {
      this.fetch()
    }
  }
  createRegex = (term) => {
    let arr = term.split(/\s/gi)
    let o = []
    for (let i = 0; i < arr.length; i++) {
      o.push(escapeRegEx(arr[i]))
      if (arr[i].length < 2) o.push('\\s')
      else o.push('.*?')
    }
    return o.join('')
  }
  getSnippet = (answer) => {
    /**
     * highlighting an answer should be based on snippet_confidence and highlight confidence
     */
    let { mcHighlightThreshold = 0.6 } = this.props.config
    let {
      snippet,
      highlight,
      snippet_confidence: snippetConfidence,
      highlight_confidence: highlightConfidence
    } = answer
    if (
      snippetConfidence <= 0.8 &&
      highlightConfidence < mcHighlightThreshold
    ) {
      return createHTMLMarkup(snippet)
    }
    if (highlightConfidence < mcHighlightThreshold) { return createHTMLMarkup(snippet) }

    let html = snippet.replace(
      new RegExp('(' + this.createRegex(highlight) + ')', 'gi'),
      '<strong>$1</strong>'
    )
    return createHTMLMarkup(html)
  }
  static defaultProps = {
    mc: {},
    payload: {},
    loader: null,
    showWhileFiltering: false
  }
  render () {
    if (this.props.isLoadingMc && this.props.loader) {
      return this.props.loader
    }
    let { mc, facetQuery, showWhileFiltering, theme } = this.props
    let {
      mcThreshold = 0.4,
      mcShowDoc,
      mcHighlightThreshold = 0.6
    } = this.props.config
    /* Always parse threshold */
    mcThreshold = parseFloat(mcThreshold)
    const { answer } = mc
    /**
     * Only show if there are no facets selected
     */
    if (!answer) {
      return null
    }
    if (!showWhileFiltering && facetQuery.length) return null

    let { snippet, url, title, snippet_confidence: confidence } = answer
    /* Do not show answers that are of low confidence */
    if (confidence < mcThreshold) {
      return null
    }
    return (
      <div className='ola-snippet ola-snippet-mc'>
        <div className='ola-snippet-inner'>
          {mcShowDoc ? (
            <TextField result={answer} field='doc' length={800} />
          ) : (
            <p
              className='ola-snippet-text'
              dangerouslySetInnerHTML={this.getSnippet(answer)}
            />
          )}
          <Title result={answer} />
          <Url result={answer} />
        </div>
        <style jsx>
          {`
            .ola-snippet-inner {
              border: 1px ${theme.primaryColor} solid;
            }
            .ola-snippet :global(.ola-field-title a) {
              color: ${theme.searchLinkColor};
            }
            .ola-snippet
              :global(.ola-field-title a:hover, .ola-field-title a:focus) {
              color: ${theme.searchLinkHoverColor};
            }
          `}
        </style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isLoadingMc: state.AppState.isLoadingMc,
    facetQuery: state.QueryState.facet_query
  }
}

module.exports = connect(mapStateToProps, { fetchMc })(
  withConfig(withTheme(AnswerMC))
)
