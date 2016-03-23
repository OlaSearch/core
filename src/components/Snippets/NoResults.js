import React from 'react'

class NoResults extends React.Component {
  static propTypes = {
    results: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
    q: React.PropTypes.string
  }

  render () {
    var { results, isLoading, q } = this.props

    if (results.length || isLoading) return null

    return (
      <div className='ola-snippet ola-snippet-noresults'>
        No results found matching <strong>{q}</strong>
      </div>
    )
  }
}

module.exports = NoResults
