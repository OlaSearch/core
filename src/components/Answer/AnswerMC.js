import React from 'react'
import Title from './../Fields/Title'
import Url from './../Fields/Url'
import { connect } from 'react-redux'
import { fetchMc } from './../../actions/Search'
import { createHTMLMarkup } from './../../utilities'

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
    if (prevProps.mc.key !== this.props.mc.key) this.fetch()
  }
  getSnippet = (answer) => {
    let { snippet, highlight, highlight_confidence: highlightConfidence } = answer
    if (highlightConfidence < this.props.highlightConfidenceThreshold) return createHTMLMarkup(snippet)
    
    let html = snippet.replace(
      new RegExp('(' + highlight.split(' ').join('.*?') + ')', 'gi'),
      '<strong>$1</strong>'
    )
    return createHTMLMarkup(html)
  }
  static defaultProps = {
    mc: {},
    payload: {},
    loader: null,
    confidenceThreshold: 0.4,
    highlightConfidenceThreshold: 0.1
  }
  render () {
    if (this.props.isLoadingMc && this.props.loader) {
      return this.props.loader
    }
    let { mc, confidenceThreshold, facetQuery, isLoading, suggestedTerm } = this.props
    let { answer } = mc
    if (suggestedTerm || !answer || facetQuery.length > 0 || isLoading) return null
    let { snippet, url, title, snippet_confidence: confidence } = answer
    /* Do not show answers that are of low confidence */
    if (confidence < confidenceThreshold) return null
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
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isLoadingMc: state.AppState.isLoadingMc,
    isLoading: state.AppState.isLoading,
    facetQuery: state.QueryState.facet_query,
    /* If its a spelling mistake */
    suggestedTerm: state.AppState.suggestedTerm
  }
}

module.exports = connect(mapStateToProps, { fetchMc })(AnswerMC)
