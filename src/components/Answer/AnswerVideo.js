import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Button from './common/Button'

/**
 * Create an answer card
 */
function AnswerVideo ({ card, onSelect }) {
  const { url, width, height, classname, buttons = [] } = card
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
        {buttons.length ? (
          <div className='ola-answer-buttons'>
            {buttons.map((button, idx) => {
              return <Button {...button} onClick={onSelect} key={idx} />
            })}
          </div>
        ) : null}
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
