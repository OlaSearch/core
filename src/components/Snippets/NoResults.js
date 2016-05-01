import React from 'react'

class NoResults extends React.Component {
  static propTypes = {
    results: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
    q: React.PropTypes.string
  };

  render () {
    var { results, isLoading, q, isBookmark } = this.props

    if (results.length || isLoading) return null

    let message = `No results found matching ${q}. Please try again.`
    if (isBookmark) {
      message = `You do not have any bookmarks. Click on the heart icon to add one.`
    }

    return (
      <div className='ola-snippet ola-snippet-noresults'>
        {message}
      </div>
    )
  }
}

module.exports = NoResults
