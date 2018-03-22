import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Field from './common/Field'
import classNames from 'classnames'

/**
 * Create an answer card
 */
function AnswerCard ({ card, onSelect, placeholderImage }) {
  function handleSelect () {
    onSelect && onSelect(result)
  }
  let { image, subtitle, title, url, buttons = [], source, fields = [] } = card
  image = image || placeholderImage
  return (
    <div className='ola-answer-card' onClick={handleSelect}>
      <div className='ola-answer-card-wrapper'>
        <div className='ola-answer-content'>
          <div className='ola-answer-header'>
            <div className='ola-answer-title'>
              {url ? <a href={url}>{title}</a> : title}
            </div>
            {subtitle && <div className='ola-answer-subtitle'>{subtitle}</div>}
          </div>
          {image ? <img src={image} className='ola-img ola-img-card' /> : null}
          {fields.length ? (
            <div className='ola-answer-fields'>
              {fields.map((field, idx) => {
                return <Field {...field} key={idx} />
              })}
            </div>
          ) : null}
          {buttons.length ? (
            <div className='ola-answer-buttons'>
              {buttons.map((button, idx) => {
                return <Button {...button} key={idx} />
              })}
            </div>
          ) : null}
        </div>
      </div>
      {source ? (
        <div className='ola-answer-source'>
          <span className='ola-answer-source-label'>Source: </span>
          <a href={source.url} className='ola-answer-source-link'>
            {source.name}
          </a>
        </div>
      ) : null}
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
  onSelect: PropTypes.func,
  /**
   * Placeholder image
   */
  placeholderImage: PropTypes.string
}

export default AnswerCard
