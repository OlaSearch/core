import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Field from './common/Field'
import Header from './common/Header'
import Source from './common/Source'
import classNames from 'classnames'
import { BUTTON_TYPE } from './../../constants/Settings'

/**
 * Create an answer card
 */
function AnswerCard ({ card, onSelect }) {
  function handleClick ({ type, label, title, payload, url }) {
    /**
     * Label will be displayed in the bot
     */
    if (type === BUTTON_TYPE.POSTBACK) {
      return (
        onSelect &&
        onSelect({
          ...payload,
          label,
          query: label || title
        })
      )
    }
    if (type === BUTTON_TYPE.WEB) {
      return (window.location.href = url)
    }
    if (type === BUTTON_TYPE.EMAIL) {
      return (window.location.href = `mailto:${url}`)
    }
    onSelect && onSelect({ card })
  }
  let { image, subtitle, title, url, buttons = [], source, fields = [] } = card
  return (
    <div className='ola-answer-card'>
      <div className='ola-answer-card-wrapper'>
        <div className='ola-answer-content'>
          <Header title={title} subtitle={subtitle} url={url} />
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
                return <Button {...button} onClick={handleClick} key={idx} />
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
