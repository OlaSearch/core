import React from 'react'

function AnswerWordMap ({
  data,
  maxLen,
  shuffle,
  onSelect,
  fontSizeMin,
  fontSizeMax
}) {
  /* Return null if nothing */
  if (!data.length) return null

  if (shuffle) {
    data.sort(function (a, b) {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
  }

  let counts = data.map(({ title, count }) => count)
  let max = Math.max.apply(this, counts)
  let min = Math.min.apply(this, counts)
  return (
    <div className='ola-answer-wordmap'>
      {data.slice(0, maxLen).map(({ title, count }, idx) => {
        let size =
          count === min
            ? fontSizeMin
            : count / max * (fontSizeMax - fontSizeMin) + fontSizeMin
        return (
          <WordMapItem
            key={idx}
            title={title}
            count={count}
            onSelect={onSelect}
            size={size}
          />
        )
      })}
    </div>
  )
}

function WordMapItem ({ title, count, size, onSelect }) {
  function handleClick (title) {
    onSelect && onSelect(title)
  }
  return (
    <button
      style={{ fontSize: size + 'px' }}
      onClick={handleClick}
      className='ola-answer-wordmap-item'
    >
      {title}
    </button>
  )
}

AnswerWordMap.defaultProps = {
  fontSizeMin: 14,
  fontSizeMax: 28,
  maxLen: 10,
  shuffle: false
}

module.exports = AnswerWordMap
