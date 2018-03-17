import React from 'react'

function AnswerField ({ label, value, url }) {
  return (
    <div className='ola-answer-field'>
      <div className='ola-answer-field-label'>{label}</div>
      <div className='ola-answer-field-value'>
        {url ? <a href={url}>{value}</a> : value}
      </div>
    </div>
  )
}

module.exports = AnswerField
