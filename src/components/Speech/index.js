import React from 'react'
import classnames from 'classnames'

class SpeechInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRecording: false,
      isSpeechSupported: window.SpeechRecognition || window.webkitSpeechRecognition
    }
  }

  static defaultProps = {
    lang: 'en',
    continuous: true,
    interimResults: true
  };

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

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    this.recog = new SpeechRecognition()

    this.recog.lang = lang
    this.recog.continuous = continuous
    this.recog.interimResults = interimResults
    this.recog.serviceURI = 'wami.csail.mit.edu'

    /* Add event listener for onresult event */
    this.recog.addEventListener('result', this.handleEvent)
    // this.recog.addEventListener('end', () => console.warn('end'))
    this.recog.addEventListener('error', (err) => console.warn(err))

    /* Start recognizing */
    this.recog.start()
  };

  handleEvent = (event) => {
    switch (event && event.type) {
      case 'result':
        window.requestAnimationFrame(() => {
          let result = event.results[ event.resultIndex ]
          let item = result[0]

          this.props.onResult.call(this, item.transcript, item.confidence)

          if (result.isFinal) {
            this.props.onFinalResult.call(this, item.transcript)
          }
        })
        break
    }
  };

  render () {
    let { isRecording, isSpeechSupported } = this.state

    if (!isSpeechSupported) return null

    let klassName = classnames('ola-link-speech', {
      'ola-link-speech-stop': isRecording
    })

    return (
      <div>
        <button
          type='button'
          className={klassName}
          onClick={this.onLaunch}
          aria-label='Press to speak'></button>
      </div>
    )
  }
}

module.exports = SpeechInput
