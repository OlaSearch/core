import React from 'react'

const AnswerWordMap = ({ data, fontSizeMin, fontSizeMax }) => {
  let { record_data } = data
  /* Return null if nothing */
  if (!record_data.length) return null

  let counts = record_data.map(({ value, count }) => count)
  let max = Math.max.apply(this, counts)
  let min = Math.min.apply(this, counts)
  return (
    <div className='ola-answer-wordmap'>
      {record_data.map(({ value, count }, idx) => {
        let size = (count === min) ? fontSizeMin : ((count / max) * (fontSizeMax - fontSizeMin)) + fontSizeMin
        return (
          <span
            key={idx}
            style={{ fontSize: size + 'px' }}
          >
            {value}
          </span>
        )
      })}
    </div>
  )
}

AnswerWordMap.defaultProps = {
  fontSizeMin: 14,
  fontSizeMax: 28
}

module.exports = AnswerWordMap
