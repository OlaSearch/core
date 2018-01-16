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
    let { snippet, highlight } = answer
    let html = snippet.replace(
      new RegExp('(' + highlight.split(' ').join('.*?') + ')', 'gi'),
      '<strong>$1</strong>'
    )
    return createHTMLMarkup(html)
  }
  static defaultProps = {
    mc: {},
    payload: {},
    loader: null
  }
  render () {
    if (this.props.isLoading && this.props.loader) {
      return this.props.loader
    }
    let { mc } = this.props
    let { answer } = mc
    if (!answer) return null
    let { snippet, url, title, confidence } = answer
    /* Do not show answers that are of low confidence */
    if (confidence < 0.2) return null
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
    isLoading: state.AppState.isLoadingMc
  }
}

module.exports = connect(mapStateToProps, { fetchMc })(AnswerMC)
