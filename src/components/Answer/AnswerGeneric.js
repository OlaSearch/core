import React from 'react'

const AnswerGeneric = ({ title, subtitle, buttons }) => {
  return (
    <div className='ola-answer-item'>
      <div className='ola-answer-content'>
        <h3 className='ola-answer-title'>
          {title}
        </h3>
        <div className='ola-answer-subtitle'>{subtitle}</div>
      </div>
    </div>
  )
}

module.exports = AnswerGeneric
