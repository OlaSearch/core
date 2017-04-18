import React from 'react'
import PropTypes from 'prop-types'
import injectTranslate from './../decorators/OlaTranslate'

const SearchTitle = ({ totalResults, page, perPage, isPhone, translate }, context) => {
  let currentIdx = Math.min(((page - 1) * perPage) + 1, totalResults)
  let lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1)

  if (context.config.infiniteScroll || isPhone) currentIdx = 1

  let values = {
    current: currentIdx,
    next: lastIdx,
    total: totalResults
  }
  let titleDesc = totalResults ? translate('showing', values) : translate('showing_no_results', values)
  let title = translate('title')
  return (
    <h3 className='ola-search-heading'>
      {title && <span className='ola-search-heading-title'>{title}</span>}
      <small className='ola-search-heading-number'>{titleDesc}</small>
    </h3>
  )
}

SearchTitle.contextTypes = {
  config: PropTypes.object
}

module.exports = injectTranslate(SearchTitle)
