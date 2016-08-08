import React from 'react'
import classnames from 'classnames'
import injectTranslate from './../../decorators/OlaTranslate'
import { log } from './../../actions/Logger'

class SpeechInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      isSpeechSupported: window.SpeechRecognition || window.webkitSpeechRecognition
    }
  }

  static contextTypes = {
    store: React.PropTypes.object
  };

  static defaultProps = {
    lang: 'en',
    continuous: true,
    interimResults: true
  };

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.isRecording !== this.state.isRecording
  }

  onLaunch = () => {
    let { isRecording } = this.state
    let { lang, continuous, interimResults } = this.props

    this.setState({
      isRecording: !isRecording
    })

    if (isRecording && this.recog) {
      this.recog.stop()
      return
    }

    /**
     * Log
     */
    let eventLabel = this.props.isInstantSearch ? 'instantsearch' : this.props.isAutosuggest ? 'autosuggest' : null
    this.context.store.dispatch(log({
      eventType: 'C',
      eventCategory: 'Voice',
      eventAction: 'click',
      eventLabel
    }))

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    this.recog = new SpeechRecognition()
    this.recog.lang = lang
    this.recog.continuous = continuous
    this.recog.interimResults = interimResults
    this.recog.serviceURI = 'wami.csail.mit.edu'

    /* Add event listener for onresult event */
    this.recog.addEventListener('result', this.handleEvent)
    // this.recog.addEventListener('end', () => console.warn('end'))
    this.recog.addEventListener('error', this.handleError)

    /* Start recognizing */
    this.recog.start()
  };

  handleError = (err) => {
    this.setState({
      isRecording: false
    })
    console.warn(err)
  };

  handleEvent = (event) => {
    switch (event && event.type) {
      case 'result':
        window.requestAnimationFrame(() => {
          let result = event.results[event.resultIndex]
          let item = result[0]

          this.props.onResult && this.props.onResult(item.transcript, item.confidence)

          if (result.isFinal) {
            this.props.onFinalResult && this.props.onFinalResult(item.transcript)
          }
        })
        break
    }
  };

  render () {
    let { isRecording, isSpeechSupported } = this.state
    let { translate } = this.props
    if (!isSpeechSupported) return null

    let klassName = classnames('ola-link-speech', {
      'ola-link-speech-stop': isRecording
    })

    return (
      <div>
        <button
          type='button'
          className={klassName}
          onClick={this.onLaunch}>
          <span className='ola-btn-hint hint--top' aria-label={translate('speech_label')} />
        </button>
      </div>
    )
  }
}

module.exports = injectTranslate(SpeechInput)
