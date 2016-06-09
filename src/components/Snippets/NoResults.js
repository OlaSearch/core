import React from 'react'

const NoResults = ({results, isLoading, q, isBookmark}) => {
  if (results.length || isLoading) return null
  let message = <span>No results found matching <strong>{q}</strong>. Please try again.</span>
  if (isBookmark) {
    message = 'You do not have any bookmarks. Click on the heart icon to add one.'
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

module.exports = NoResults
