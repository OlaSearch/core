import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const LoadMore = ({ totalResults, currentPage, perPage, actions, onLoadMore, isLoading, beforeChangePage }) => {
  if (currentPage * perPage >= totalResults) return null
  let klass = classNames('ola-link-load-more', {
    'ola-link-load-more-active': isLoading
  })
  function handleClick () {
    if (beforeChangePage) beforeChangePage()
    onLoadMore
      ? onLoadMore()
      : actions.loadMore()
  }
  return (
    <button
      type='button'
      className={klass}
      disabled={isLoading}
      onClick={handleClick}
    >
      Load more
    </button>
  )
}

LoadMore.propTypes = {
  actions: PropTypes.shape({
    loadMore: PropTypes.func.isRequired
  }),
  totalResults: PropTypes.any.isRequired,
  currentPage: PropTypes.any.isRequired,
  perPage: PropTypes.any.isRequired,
  isLoading: PropTypes.boolean
}

LoadMore.defaultProps = {
  isLoading: false
}

module.exports = LoadMore
