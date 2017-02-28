import React from 'react'

const AnswerList = ({ data }, ...rest) => {
  let { lists } = data
  return (
    <div className='ola-answer-lists'>
      {lists.map(({ title, items }, idx) => {
        return (
          <div className='ola-answer-listitem' key={idx}>
            {title}
            <ul>
              {items.map((item, i) => {
                return <li key={i}>{item}</li>
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

module.exports = AnswerList
