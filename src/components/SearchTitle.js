import React from 'react'
import { FormattedMessage } from 'react-intl'

const SearchTitle = ({ totalResults, page, perPage, isPhone }, context) => {
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
      <span className='ola-search-heading-title'><FormattedMessage id='title' /></span>
      <small className='ola-search-heading-number'>
        <FormattedMessage id='showing' values={values} />
      </small>
    </h3>
  )
}

SearchTitle.contextTypes = {
  config: React.PropTypes.object
}

module.exports = SearchTitle
