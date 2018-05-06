import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Field from './common/Field'
import Header from './common/Header'
import Source from './common/Source'
import cx from 'classnames'

/**
 * Create an answer form
 */
function AnswerForm ({ card, onSelect }) {
  const { formfields, buttons, classname } = card
  const classes = cx('ola-answer-card', classname)
  return (
    <div className={classes}>
      <div className='ola-answer-card-wrapper'>
        <div className='ola-answer-content'>
          {formfields.map((item, idx) => {
            return (
              <div className='ola-answer-form-item' key={idx}>
                <FormItem {...item} />
              </div>
            )
          })}

          {buttons.length ? (
            <div className='ola-answer-buttons'>
              {buttons.map((button, idx) => {
                return <Button {...button} onClick={onSelect} key={idx} />
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function FormItem ({ type, placeholder, label }) {
  return (
    <div className='ola-answer-field'>
      {label && <div className='ola-answer-field-label'>{label}</div>}
      <div className='ola-answer-field-value'>
        <input
          type={type}
          placeholder={placeholder}
          className='ola-answer-input'
        />
      </div>
    </div>
  )
}

export default AnswerForm
