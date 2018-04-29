import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../decorators/withTranslate'
import withConfig from './../decorators/withConfig'
import GeoNotify from './Geo/GeoNotify'

function SearchTitle ({
  totalResults,
  page,
  perPage,
  isPhone,
  translate,
  config
}) {
  const title = translate('title')
  const showTitle = title || totalResults > 0
  if (!showTitle) return null
  const currentIdx =
    config.infiniteScroll || isPhone
      ? 1
      : Math.min((page - 1) * perPage + 1, totalResults)
  const lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1)

  const values = {
    current: currentIdx,
    next: lastIdx,
    total: totalResults
  }
  const titleDesc = totalResults
    ? translate('showing', values)
    : translate('showing_no_results', values)
  return (
    <div className='ola-search-heading-container'>
      <div className='ola-search-heading'>
        {title && <span className='ola-search-heading-title'>{title}</span>}
        {totalResults ? (
          <small className='ola-search-heading-number'>{titleDesc}</small>
        ) : null}
      </div>
      <GeoNotify showLabel />
    </div>
  )
}

module.exports = withConfig(withTranslate(SearchTitle))
