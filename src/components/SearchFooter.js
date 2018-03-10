import React from 'react'
import PropTypes from 'prop-types'
import Pagination from './Pagination'
import LoadMore from './InfiniteScroll/LoadMore'
import { changePage, executeSearch, loadMore } from './../actions/Search'
import { bindActionCreators } from 'redux'
import withConfig from './../decorators/withConfig'

function SearchFooter (props) {
  const { config } = props
  let { infiniteScroll } = config
  let {
    isPhone,
    dispatch,
    totalResults,
    infiniteScroll: infiniteScrollOverride,
    beforeChangePage
  } = props

  if (!totalResults) {
    return null
  }

  let boundActionCreators = bindActionCreators(
    { changePage, executeSearch, loadMore },
    dispatch
  )

  return React.createElement(
    infiniteScrollOverride || infiniteScroll || isPhone ? LoadMore : Pagination,
    {
      ...props,
      actions: boundActionCreators,
      beforeChangePage
    }
  )
}
module.exports = withConfig(SearchFooter)
