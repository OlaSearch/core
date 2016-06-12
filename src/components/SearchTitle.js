import React from 'react'
import withTranslate from './../decorators/OlaTranslate'

const SearchTitle = ({ totalResults, page, perPage, isPhone, translate }, context) => {
  let currentIdx = Math.min(((page - 1) * perPage) + 1, totalResults)
  let lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1)

  if (context.config.infiniteScroll || isPhone) currentIdx = 1

  let values = {
    current: currentIdx.toString(),
    next: lastIdx.toString(),
    total: totalResults.toString()
  }

  return (
    <h3 className='ola-search-heading'>
      <span className='ola-search-heading-title'>{translate('title')}</span>
      <small className='ola-search-heading-number'>{translate('showing', values)}</small>
    </h3>
  )
}

SearchTitle.contextTypes = {
  config: React.PropTypes.object
}

module.exports = withTranslate(SearchTitle)
