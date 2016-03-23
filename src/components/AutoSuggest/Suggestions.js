import React from 'react'
import SearchResults from './../SearchResults'

const Suggestions = (props) => {
  return (
    <SearchResults isAutosuggest { ...props } />
  )
}

Suggestions.propTypes = {
  results: React.PropTypes.array,
  dispatch: React.PropTypes.func.isRequired,
  bookmarks: React.PropTypes.array
}

module.exports = Suggestions
