import React from 'react'
import PropTypes from 'prop-types'
import Header from './common/Header'
import cx from 'classnames'
import Play from '@olasearch/icons/lib/play'
import Portal from './../Portal'
import Overlay from './../Overlay'

/**
 * Create an answer card
 */
class AnswerEmbed extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false
    }
  }
  toggle = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }
  render () {
    const { isVisible } = this.state
    const { card, onSelect } = this.props
    const { url, title, image, subtitle, classname, width, height } = card
    const classes = cx(
      'ola-answer-card',
      'ola-answer-embed',
      {
        'ola-answer-embed-active': isVisible
      },
      classname
    )
    const embedIframe = (
      <iframe
        className='ola-embed-frame ola-embed-frame-active'
        src={url}
        width={width}
        height={height}
        frameBorder='0'
        allow='geolocation; microphone; camera'
      />
    )
    const embedThumbnail = (
      <iframe
        className='ola-embed-frame'
        src={url}
        width={width}
        height={height}
        frameBorder='0'
      />
    )
    return (
      <div className={classes}>
        <div className='ola-answer-card-wrapper'>
          <div className='ola-answer-body'>
            {/* <Overlay active={!isVisible} isAbsolute /> */}

            {image ? (
              <img src={image} width={width} className='ola-embed-image' />
            ) : (
              embedThumbnail
            )}

            <button
              className='ola-btn-play'
              onClick={this.toggle}
              type='button'
            >
              <Play size={40} />
            </button>

            <Portal isOpen={isVisible} onRequestClose={this.toggle}>
              {embedIframe}
            </Portal>
          </div>

          <Header title={title} subtitle={subtitle} url={url} />
        </div>
      </div>
    )
  }
}

AnswerEmbed.propTypes = {
  /**
   * answer card object
   */
  card: PropTypes.object,
  /**
   * Callback when a card is clicked
   */
  onSelect: PropTypes.func
}

export default AnswerEmbed
