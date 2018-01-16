import React from 'react'
import PropTypes from 'prop-types'
import injectTranslate from './../decorators/injectTranslate'
import GeoNotify from './Geo/GeoNotify'

function SearchTitle (
  { totalResults, page, perPage, isPhone, translate },
  context
) {
  let title = translate('title')
  let showTitle = title || totalResults > 0
  if (!showTitle) return null
  let currentIdx = Math.min((page - 1) * perPage + 1, totalResults)
  let lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1)

  if (context.config.infiniteScroll || isPhone) currentIdx = 1

  let values = {
    current: currentIdx,
    next: lastIdx,
    total: totalResults
  }
  let titleDesc = totalResults
    ? translate('showing', values)
    : translate('showing_no_results', values)
  return (
    <div className='ola-search-heading-container'>
      <h3 className='ola-search-heading'>
        {title && <span className='ola-search-heading-title'>{title}</span>}
        {totalResults ? (
          <small className='ola-search-heading-number'>{titleDesc}</small>
        ) : null}
      </h3>
      <GeoNotify />
    </div>
  )
}

SearchTitle.contextTypes = {
  config: PropTypes.object
}

module.exports = injectTranslate(SearchTitle)
