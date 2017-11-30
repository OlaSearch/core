import React from 'react'
import PropTypes from 'prop-types'
import injectTranslate from './../decorators/OlaTranslate'

function PopularKeywords ({ onClick, translate }, context) {
  let { popularKeywords } = context.config
  return (
    <div className='ola-popular-keywords'>
      <span className='ola-popular-label'>
        {translate('popular_keywords')}:{' '}
      </span>
      {popularKeywords.map((keyword, idx) => {
        return (
          <PopularKeywordItem keyword={keyword} onClick={onClick} key={idx} />
        )
      })}
    </div>
  )
}

PopularKeywords.contextTypes = {
  config: PropTypes.object
}

/**
 * Item
 */
function PopularKeywordItem ({ keyword, onClick }) {
  function handleClick () {
    onClick(keyword)
  }
  return (
    <div className='ola-popular-keyword'>
      <a onClick={handleClick}>{keyword}</a>
    </div>
  )
}

module.exports = injectTranslate(PopularKeywords)
