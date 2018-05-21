import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import cx from 'classnames'

/**
 * Create an answer card
 */
function AnswerVideo ({ card, onSelect }) {
  const { url, title, width, height, classname } = card
  const classes = cx('ola-answer-video', classname)
  return (
    <div className={classes}>
      <div className='ola-answer-card-wrapper'>
        <iframe
          width={width}
          height={height}
          src={url}
          frameBorder='0'
          allowFullScreen
        />
      </div>
    </div>
  )
}

AnswerVideo.defaultProps = {
  width: 420,
  height: 315
}

AnswerVideo.propTypes = {
  /**
   * answer card object
   */
  card: PropTypes.object,
  /**
   * Callback when a card is clicked
   */
  onSelect: PropTypes.func
}

export default AnswerVideo
