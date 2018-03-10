import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../decorators/withTranslate'
import withConfig from './../decorators/withConfig'

function PopularKeywords ({ onClick, translate, config }) {
  let { popularKeywords } = config
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

module.exports = withConfig(withTranslate(PopularKeywords))
