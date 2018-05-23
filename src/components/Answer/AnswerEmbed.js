import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Field from './common/Field'
import Header from './common/Header'
import Source from './common/Source'
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
    const { url, title, subtitle, classname } = card
    const classes = cx(
      'ola-answer-card',
      'ola-answer-embed',
      {
        [`ola-answer-embed-active`]: isVisible
      },
      classname
    )
    const embedClassName = cx('ola-embed-frame', {
      'ola-embed-frame-active': isVisible
    })
    const embedIframe = (
      <iframe
        className={embedClassName}
        src={url}
        width='100%'
        height='300'
        frameBorder='0'
      />
    )
    return (
      <div className={classes}>
        <div className='ola-answer-card-wrapper'>
          <Header title={title} subtitle={subtitle} url={url} />
          <div className='ola-answer-body'>
            <Overlay active={!isVisible} isAbsolute />
            {embedIframe}

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
