import React from 'react'

const AnswerInfo = ({ answer, onClose }) => {
  let { additional_data } = answer
  if (!additional_data) return null
  return (
    <div className='ola-answer-additional-data'>
      {additional_data.map((item, i) => {
        return (
          <div className='ola-answer-additional-row' key={i}>
            <div className='ola-answer-additional-label'>
              {item.label}
            </div>
            <div className='ola-answer-additional-value'>
              {item.value}
            </div>
          </div>
        )
      })}
      <button className='ola-answer-additional-close' onClick={onClose}><span>Close</span></button>
    </div>
  )
}

module.exports = AnswerInfo
