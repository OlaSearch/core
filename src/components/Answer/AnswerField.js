import React from 'react'

function AnswerField ({ label, field, value, url, className }) {
  return (
    <div className={className}>
      <div className='ola-answer-value'>
        {url ? <a href={url}>{value}</a> : value}
      </div>
    </div>
  )
}

module.exports = AnswerField
