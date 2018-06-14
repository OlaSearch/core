import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withConfig from './../../decorators/withConfig'
import withLogger from './../../decorators/withLogger'
import withTheme from './../../decorators/withTheme'
import { log } from './../../actions/Logger'
import Mic from '@olasearch/icons/lib/mic'
import MicOff from '@olasearch/icons/lib/mic-off'

/**
 * Displays a voice input button
 */
class SpeechInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      isSpeechSupported:
        window.SpeechRecognition || window.webkitSpeechRecognition
    }
  }

  static defaultProps = {
    lang: 'en',
    continuous: true,
    interimResults: true,
    iconSize: 20
  }

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
    let eventLabel = this.props.isInstantSearch
      ? 'instantsearch'
      : this.props.isAutosuggest ? 'autosuggest' : null
    this.props.log({
      eventType: 'C',
      eventCategory: 'Voice',
      eventAction: 'click',
      payload: this.props.logPayload,
      eventLabel
    })

    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    this.recog = new SpeechRecognition()
    this.recog.lang = lang
    this.recog.continuous = continuous
    this.recog.interimResults = interimResults
    this.recog.serviceURI = 'wami.csail.mit.edu'

    /* Add event listener for onresult event */
    this.recog.addEventListener('result', this.handleEvent)
    // this.recog.addEventListener('end', () => console.warn('end'))
    this.recog.addEventListener('error', this.handleError)
    this.recog.addEventListener('end', this.stopRecording)
    this.recog.addEventListener('onnomatch', this.stopRecording)
    this.recog.addEventListener('onspeechend', this.stopRecording)

    /* Start recognizing */
    this.recog.start()
  }

  stopRecording = () => {
    this.setState({
      isRecording: false
    })
    if (this.recog) this.recog.stop()
  }

  handleError = (err) => {
    this.setState({
      isRecording: false
    })
    console.warn(err)
  }

  handleEvent = (event) => {
    switch (event && event.type) {
      case 'result':
        window.requestAnimationFrame(() => {
          let result = event.results[event.resultIndex]
          let item = result[0]

          this.props.onResult &&
            this.props.onResult(item.transcript, item.confidence)

          if (result.isFinal) {
            this.props.onFinalResult &&
              this.props.onFinalResult(item.transcript)
          }
        })
        break
    }
  }

  render () {
    const { isRecording, isSpeechSupported } = this.state
    const { translate, iconSize } = this.props
    const { voiceSearch } = this.props.config
    if (!isSpeechSupported || !voiceSearch) return null

    const klassName = classnames('ola-link-speech', {
      'ola-link-speech-isrecording': isRecording
    })

    return (
      <div className='ola-speech-input'>
        <button type='button' className={klassName} onClick={this.onLaunch}>
          <Mic size={iconSize} />
        </button>
        <style jsx>
          {`
            .ola-link-speech {
              color: ${this.props.theme.primaryColor};
            }
            .ola-link-speech.ola-link-speech-isrecording {
              color: ${this.props.theme.dangerColor};
            }
          `}
        </style>
      </div>
    )
  }
}

export default withTheme(withLogger(withConfig(withTranslate(SpeechInput))))
