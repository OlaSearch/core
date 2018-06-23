import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../decorators/withTranslate'
import withConfig from './../decorators/withConfig'
import GeoNotify from './Geo/GeoNotify'
import FilterButton from './FilterButton'

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
  /* Container is flex */
  return (
    <div className='ola-search-heading-container'>
      <div className='ola-search-heading'>
        {title && <span className='ola-search-heading-title'>{title}</span>}
        {totalResults ? (
          <span className='ola-search-heading-number'>{titleDesc}</span>
        ) : null}
        <GeoNotify showLabel />
      </div>
      <FilterButton />
    </div>
  )
}

SearchTitle.propTypes = {
  totalResults: PropTypes.number,
  page: PropTypes.number,
  perPage: PropTypes.number,
  isPhone: PropTypes.bool
}

export default withConfig(withTranslate(SearchTitle))
