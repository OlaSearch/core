import React from 'react'
import classNames from 'classnames'

const LoadMore = ({ totalResults, currentPage, perPage, actions, isLoading }) => {
  if (currentPage * perPage >= totalResults) return null
  let klass = classNames('ola-link-load-more', {
    'ola-link-load-more-active': isLoading
  })
  return (
    <button
      type='button'
      className={klass}
      disabled={isLoading}
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
  perPage: React.PropTypes.any.isRequired,
  isLoading: React.PropTypes.boolean
}

LoadMore.defaultProps = {
  isLoading: false
}

module.exports = LoadMore
