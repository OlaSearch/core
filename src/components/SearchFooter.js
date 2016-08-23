import React from 'react'
import Pagination from './Pagination'
import LoadMore from './InfiniteScroll/LoadMore'
import { changePage, executeSearch, loadMore } from './../actions/Search'
import { bindActionCreators } from 'redux'

const SearchFooter = (props, context) => {
  let { infiniteScroll } = context.config
  let { isPhone, dispatch, totalResults, infiniteScroll: infiniteScrollOverride } = props

  if (!totalResults) {
    return null
  }

  let boundActionCreators = bindActionCreators({ changePage, executeSearch, loadMore }, dispatch)

  if (infiniteScrollOverride || infiniteScroll || isPhone) {
    return (
      <LoadMore {...props} actions={boundActionCreators} />
    )
  }

  return (
    <Pagination {...props} actions={boundActionCreators} />
  )
}

SearchFooter.contextTypes = {
  config: React.PropTypes.object
}

module.exports = SearchFooter
