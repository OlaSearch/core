import React from 'react'
import cx from 'classnames'

function AnswerField ({ label, value, url }) {
  if (!value) return null
  const classes = cx('ola-answer-field', `ola-answer-field-${label}`)
  return (
    <div className={classes}>
      <div className='ola-answer-field-label'>{label}</div>
      <div className='ola-answer-field-value'>
        {url ? <a href={url}>{value}</a> : value}
      </div>
    </div>
  )
}

module.exports = AnswerField
