import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../decorators/withTranslate'

function SearchHeader ({ children, totalResults, translate }) {
  const title = translate('title')
  const showheader = title || totalResults > 0
  if (!showheader) return null
  return <div className='ola-search-header'>{children}</div>
}

SearchHeader.propTypes = {
  totalResults: PropTypes.number.isRequired
}

module.exports = withTranslate(SearchHeader)
