import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../decorators/withTranslate'
import GeoNotify from './Geo/GeoNotify'
import { ThemeConsumer } from './../containers/OlaThemeContext'

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
    <ThemeConsumer>
      {(theme) => (
        <div className='ola-search-heading-container'>
          <div className='ola-search-heading'>
            {title && <span className='ola-search-heading-title'>{title}</span>}
            {totalResults ? (
              <small className='ola-search-heading-number'>{titleDesc}</small>
            ) : null}
          </div>
          <GeoNotify />
        </div>
      )}
    </ThemeConsumer>
  )
}

SearchTitle.contextTypes = {
  config: PropTypes.object
}

module.exports = withTranslate(SearchTitle)
