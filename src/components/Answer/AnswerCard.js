import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Field from './common/Field'
import Header from './common/Header'
import Source from './common/Source'
import cx from 'classnames'

/**
 * Create an answer card
 */
function AnswerCard ({ card, onSelect }) {
  const {
    image,
    subtitle,
    title,
    url,
    image_position: imagePosition = 'bottom',
    buttons = [],
    source,
    fields = [],
    classname
  } = card
  const classes = cx('ola-answer-card', classname)
  return (
    <div className={classes}>
      <div className='ola-answer-card-wrapper'>
        <div className='ola-answer-content'>
          {imagePosition === 'bottom' ? (
            <Header title={title} subtitle={subtitle} url={url} />
          ) : null}
          <div className='ola-answer-body'>
            {image ? (
              <img src={image} className='ola-img ola-img-card' />
            ) : null}
            {fields.length ? (
              <div className='ola-answer-fields'>
                {fields.map((field, idx) => {
                  return <Field {...field} key={idx} />
                })}
              </div>
            ) : null}
          </div>
          {imagePosition === 'top' ? (
            <Header title={title} subtitle={subtitle} url={url} />
          ) : null}
          {buttons.length ? (
            <div className='ola-answer-buttons'>
              {buttons.map((button, idx) => {
                return <Button {...button} onClick={onSelect} key={idx} />
              })}
            </div>
          ) : null}
        </div>
      </div>
      <Source source={source} />
    </div>
  )
}

AnswerCard.propTypes = {
  /**
   * answer card object
   */
  card: PropTypes.object,
  /**
   * Callback when a card is clicked
   */
  onSelect: PropTypes.func
}

export default AnswerCard
