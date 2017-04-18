import React from 'react'
import PropTypes from 'prop-types'
import injectTranslate from './../../decorators/OlaTranslate'

const NoResults = ({ results, isLoading, q, isBookmark, translate }) => {
  if (results.length || isLoading) return null
  if (!isBookmark && !q) return null
  let message = translate('no_results_found', { q }, true)
  if (isBookmark) {
    message = translate('bookmarks_empty_label')
  }

  return (
    <div className='ola-snippet ola-snippet-noresults'>
      {message}
    </div>
  )
}

NoResults.propTypes = {
  results: PropTypes.array,
  isLoading: PropTypes.bool,
  q: PropTypes.string
}

module.exports = injectTranslate(NoResults)
