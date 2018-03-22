import React from 'react'
import PropTypes from 'prop-types'

/**
 * Display a word cloud
 */
function AnswerWordMap ({
  card,
  maxLen,
  shuffle,
  onSelect,
  fontSizeMin,
  fontSizeMax
}) {
  let { elements = [] } = card
  /* Return null if nothing */
  if (!elements.length) return null

  if (shuffle) {
    elements.sort(function (a, b) {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
  }

  let counts = elements.map(({ title, count }) => count)
  let max = Math.max.apply(this, counts)
  let min = Math.min.apply(this, counts)
  return (
    <div className='ola-answer-wordmap'>
      {elements.slice(0, maxLen).map(({ title, count }, idx) => {
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
      className='ola-btn ola-button-wordmap'
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

AnswerWordMap.propTypes = {
  /**
   * answer card object
   */
  card: PropTypes.object,
  /**
   * Shuffle the words
   */
  shuffle: PropTypes.bool
}

module.exports = AnswerWordMap
