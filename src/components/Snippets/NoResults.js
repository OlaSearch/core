import React from 'react'

const NoResults = (props) => {
  var { results, isLoading, q, isBookmark } = props

  if (results.length || isLoading) return null

  let message = `No results found matching ${q}. Please try again.`
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
