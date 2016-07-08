import React from 'react'
import Pagination from './Pagination'
import LoadMore from './InfiniteScroll/LoadMore'
import { changePage, executeSearch, loadMore } from './../actions/Search'
import { bindActionCreators } from 'redux'

const SearchFooter = (props, context) => {
  let { infiniteScroll } = context.config
  let { isPhone, dispatch, totalResults } = props
  let boundActionCreators = bindActionCreators({ changePage, executeSearch, loadMore }, dispatch)

  if (infiniteScroll || isPhone) {
    return (
      <LoadMore {...props} actions={boundActionCreators} />
    )
  }

  if (!totalResults) return null

  return (
    <Pagination {...props} actions={boundActionCreators} />
  )
}

SearchFooter.contextTypes = {
  config: React.PropTypes.object
}

module.exports = SearchFooter
