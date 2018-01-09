import React from 'react'
import Title from './../Fields/Title'
import { connect } from 'react-redux'
import { fetchMc } from './../../actions/Search'
import { createHTMLMarkup } from './../../utilities'

class AnswerMC extends React.Component {
  componentDidMount () {
    this.fetch()
  }
  fetch () {
    let { mc } = this.props
    let { key } = mc
    if (key) this.props.fetchMc(key)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.mc.key !== this.props.mc.key) this.fetch()
  }
  getSnippet = (answer) => {
    let { snippet, highlight } = answer
    let html = snippet.replace(new RegExp('(' + highlight.split(' ').join('.*?') + ')', 'gi') , '<strong>$1</strong>')
    return createHTMLMarkup(html)
  };
  static defaultProps = {
    mc: {}
  };
  render () {
    let { mc } = this.props
    let { answer } = mc
    if (!answer) return null
    let { snippet, url, title, confidence } = answer
    if (confidence < 0.3) return null
    return (
      <div className='ola-snippet ola-snippet-mc'>
        <div className='ola-snippet-inner'>
          <p className='ola-snippet-text' dangerouslySetInnerHTML={this.getSnippet(answer)} />
          <Title result={answer} />
        </div>
      </div>
    )
  }
}

module.exports = connect(null, { fetchMc })(AnswerMC)
