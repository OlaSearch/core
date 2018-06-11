import React from 'react'
import withTranslate from './../decorators/withTranslate'

function SearchHeader ({ children, totalResults, translate }) {
  const title = translate('title')
  const showheader = title || totalResults > 0
  if (!showheader) return null
  return <div className='ola-search-header'>{children}</div>
}

module.exports = withTranslate(SearchHeader)
