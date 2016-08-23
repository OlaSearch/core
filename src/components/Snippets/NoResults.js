import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'

const NoResults = ({results, isLoading, q, isBookmark, translate}) => {
  if (results.length || isLoading || !q) return null
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
  results: React.PropTypes.array,
  isLoading: React.PropTypes.bool,
  q: React.PropTypes.string
}

module.exports = injectTranslate(NoResults)
