import React from 'react'

function HistoryItem ({ history, searchPageUrl }) {
  var url = searchPageUrl + history.url
  return (
    <div className='ola-module-item ola-module-item-history'>
      <a href={url}>{history.q}</a>
      {history.facets.map((facet, idx) => {
        let name = facet.split(':').pop()
        return (
          <span key={idx} className='ola-search-facet-count'>
            {name}
          </span>
        )
      })}
    </div>
  )
}

module.exports = HistoryItem
