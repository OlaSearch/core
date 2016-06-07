import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const LoadMore = ({ totalResults, currentPage, perPage, actions }) => {
  if (currentPage * perPage >= totalResults) return NO_SCRIPT_TAG

  return (
    <button
      type='button'
      className='ola-link-load-more'
      onClick={actions.loadMore}
    >
      Load more
    </button>
  )
}

LoadMore.propTypes = {
  actions: React.PropTypes.shape({
    loadMore: React.PropTypes.func.isRequired
  }),
  totalResults: React.PropTypes.any.isRequired,
  currentPage: React.PropTypes.any.isRequired,
  perPage: React.PropTypes.any.isRequired
}

module.exports = LoadMore
