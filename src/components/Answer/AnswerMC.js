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
    const { mc, payload } = this.props
    const { key } = mc
    if (key) this.props.fetchMc(key, payload)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.mc.key !== this.props.mc.key) {
      this.fetch()
    }
  }
  createRegex = (term) => {
    const arr = term.split(/\s/gi)
    const o = []
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
    const { mcHighlightThreshold = 0.6 } = this.props.config
    const {
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
    if (highlightConfidence < mcHighlightThreshold) {
      return createHTMLMarkup(snippet)
    }

    const html = snippet.replace(
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
    const { mc, facetQuery, showWhileFiltering, theme, config } = this.props
    const { mcShowDoc, mcHighlightThreshold = 0.6 } = config
    const mcThreshold = parseFloat(config.mcThreshold)
    const { answer } = mc
    /**
     * Only show if there are no facets selected
     */
    if (!answer) {
      return null
    }
    if (!showWhileFiltering && facetQuery.length) return null

    const { snippet, url, title, snippet_confidence: confidence } = answer
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

/**
 * Wrapper on MC
 */
function McWrapper (props) {
  const { config, mc } = props
  if (!config.mc || !mc) return null
  return <AnswerMC {...props} />
}

module.exports = connect(mapStateToProps, { fetchMc })(
  withConfig(withTheme(McWrapper))
)
