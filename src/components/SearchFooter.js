import React from 'react'
import Pagination from './Pagination'
import LoadMore from './InfiniteScroll/LoadMore'
import * as SearchActionCreators from './../actions/Search'
import { bindActionCreators } from 'redux'

const SearchFooter = (props, context) => {
  let { infiniteScroll } = context.config
  let { isPhone, dispatch } = props
  let boundActionCreators = bindActionCreators(SearchActionCreators, dispatch)

  if (infiniteScroll || isPhone) {
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
