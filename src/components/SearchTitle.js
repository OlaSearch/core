import React from 'react'
import { FormattedMessage } from 'react-intl'

const SearchTitle = (props, context) => {
  let {
    totalResults,
    page,
    perPage
  } = props

  let currentIdx = Math.min(((page - 1) * perPage) + 1, totalResults)
  let lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1)

  if (context.config.infiniteScroll) currentIdx = 1

  return (
    <h3 className='ola-search-heading'>
      <span><FormattedMessage id='title' /></span>
      <small>
        <FormattedMessage
          id='showing'
          values={{
            current: currentIdx,
            next: lastIdx,
            total: totalResults
          }}
        />
      </small>
    </h3>
  )
}

SearchTitle.contextTypes = {
  config: React.PropTypes.object
}

module.exports = SearchTitle
