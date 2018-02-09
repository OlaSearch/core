import React from 'react'
import PropTypes from 'prop-types'
import Title from './../Fields/Title'
import Url from './../Fields/Url'
import { connect } from 'react-redux'
import { fetchMc } from './../../actions/Search'
import { createHTMLMarkup } from './../../utilities'
import { ThemeConsumer } from './../../containers/OlaThemeContext'

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
      o.push(arr[i])
      if (arr[i].length < 2) o.push('\\s')
      else o.push('.*?')
    }
    return o.join('')
  }
  getSnippet = (answer) => {
    let {
      snippet,
      highlight,
      highlight_confidence: highlightConfidence
    } = answer
    if (highlightConfidence < this.props.highlightConfidenceThreshold) {
      return createHTMLMarkup(snippet)
    }
    let html = snippet.replace(
      new RegExp('(' + this.createRegex(highlight) + ')', 'gi'),
      '<strong>$1</strong>'
    )
    return createHTMLMarkup(html)
  }
  static contextTypes = {
    config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  }
  static defaultProps = {
    mc: {},
    payload: {},
    loader: null,
    highlightConfidenceThreshold: 0.2
  }
  render () {
    if (this.props.isLoadingMc && this.props.loader) {
      return this.props.loader
    }
    let { mc, facetQuery } = this.props
    let { mcThreshold = 0.4 } = this.context.config
    /* Always parse threshold */
    mcThreshold = parseFloat(mcThreshold)
    let { answer } = mc
    if (!answer || facetQuery.length > 0) {
      return null
    }
    let { snippet, url, title, snippet_confidence: confidence } = answer
    /* Do not show answers that are of low confidence */
    if (confidence < mcThreshold) return null
    return (
      <ThemeConsumer>
        {(theme) => (
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
        )}
      </ThemeConsumer>
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

module.exports = connect(mapStateToProps, { fetchMc })(AnswerMC)