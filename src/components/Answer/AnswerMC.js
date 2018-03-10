import React from 'react'
import PropTypes from 'prop-types'
import Title from './../Fields/Title'
import Url from './../Fields/Url'
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
    let {
      snippet,
      highlight,
      snippet_confidence: snippetConfidence,
      highlight_confidence: highlightConfidence
    } = answer
    if (snippetConfidence <= 0.5 && highlightConfidence > 0.5) {
      return createHTMLMarkup(snippet)
    }
    if (highlightConfidence < this.props.highlightConfidenceThreshold) {
      return createHTMLMarkup(snippet)
    }
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
    showWhileFiltering: false,
    highlightConfidenceThreshold: 0.65
  }
  render () {
    if (this.props.isLoadingMc && this.props.loader) {
      return this.props.loader
    }
    let {
      mc,
      facetQuery,
      highlightConfidenceThreshold,
      showWhileFiltering,
      theme
    } = this.props
    let { mcThreshold = 0.4 } = this.props.config
    /* Always parse threshold */
    mcThreshold = parseFloat(mcThreshold)
    let { answer } = mc
    /**
     * Only show if there are no facets selected
     */
    if (!answer) {
      return null
    }
    if (!showWhileFiltering && facetQuery.length) return null

    let {
      snippet,
      url,
      title,
      snippet_confidence: confidence,
      highlight_confidence: highlightConfidence
    } = answer
    /* Do not show answers that are of low confidence */
    if (
      confidence < mcThreshold // ||
      // highlightConfidence < highlightConfidenceThreshold
    ) {
      return null
    }
    return (
      <div className='ola-snippet ola-snippet-mc'>
        <div className='ola-snippet-inner'>
          <p
            className='ola-snippet-text'
            dangerouslySetInnerHTML={this.getSnippet(answer)}
          />
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
    // isLoading: state.AppState.isLoading,
    facetQuery: state.QueryState.facet_query
    /* If its a spelling mistake: Show the answer */
    // suggestedTerm: state.AppState.suggestedTerm
  }
}

module.exports = connect(mapStateToProps, { fetchMc })(
  withConfig(withTheme(AnswerMC))
)
