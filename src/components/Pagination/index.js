import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectTranslate from './../../decorators/injectTranslate'

class Pagination extends React.Component {
  static defaultProps = {
    ellipsis: '...',
    edges: 2,
    limit: 10,
    perPage: 10,
    currentPage: 1,
    totalResults: 0,
    onChangePage: null
  }

  static propTypes = {
    totalResults: PropTypes.number.isRequired,
    currentPage: PropTypes.any,
    perPage: PropTypes.any.isRequired,
    onChangePage: PropTypes.func,
    actions: PropTypes.shape({
      changePage: PropTypes.func.isRequired,
      executeSearch: PropTypes.func.isRequired
    })
  }

  prevPage = () => {
    let { currentPage } = this.props

    --currentPage

    if (currentPage < 1) currentPage = 1

    this.selectPage(currentPage)
  }

  nextPage = () => {
    let { currentPage, totalResults, perPage } = this.props
    let totalPages = Math.ceil(totalResults / perPage)

    ++currentPage

    if (currentPage > totalPages) currentPage = totalPages

    this.selectPage(currentPage)
  }

  selectPage = (page) => {
    let { actions, onChangePage } = this.props

    if (onChangePage) {
      return onChangePage(page)
    }

    this.pagination.parentNode.scrollIntoView()

    actions.changePage(page)

    actions.executeSearch()
  }

  createPageList (start, end, limit, left, right, ellipsis) {
    let list = []
    for (let i = start; i <= end; i++) {
      if (i === 1 || i === parseInt(end) || end < limit) {
        list.push(i)
      } else {
        if (i === right + 1 || i === left - 1) list.push(ellipsis)

        if (i <= right && i >= left) list.push(i)
      }
    }

    return list
  }
  shouldComponentUpdate (nextProps) {
    return (
      this.props.totalResults !== nextProps.totalResults ||
      this.props.currentPage !== nextProps.currentPage ||
      this.props.perPage !== nextProps.perPage
    )
  }
  registerRef = (input) => {
    this.pagination = input
  }
  render () {
    let {
      totalResults,
      perPage,
      currentPage,
      edges,
      limit,
      ellipsis,
      translate
    } = this.props

    let currentPageInt = parseInt(currentPage)
    let totalPages = Math.ceil(totalResults / perPage)
    let start = 1
    let left = Math.max(currentPageInt - edges, 0)
    let right = Math.min(currentPageInt + edges, totalPages)
    let pages = this.createPageList(
      start,
      totalPages,
      limit,
      left,
      right,
      ellipsis
    )

    let isPrevPageDisabled = currentPageInt === 1
    let prevPageClass = classNames('ola-page ola-page-previous', {
      'ola-page-disabled': isPrevPageDisabled
    })
    let isNextPageDisabled = currentPageInt === totalPages || !totalPages
    let nextPageClass = classNames({
      'ola-page ola-page-next': true,
      'ola-page-disabled': isNextPageDisabled
    })

    return (
      <nav className='ola-pagination' ref={this.registerRef}>
        <button
          className={prevPageClass}
          onClick={this.prevPage}
          disabled={isPrevPageDisabled}
        >
          {translate('pagination_prev_label')}
        </button>
        {pages.map((page, idx) => {
          return (
            <PageNumber
              selectPage={this.selectPage}
              page={page}
              key={idx}
              isActive={currentPageInt === page}
            />
          )
        })}
        <button
          className={nextPageClass}
          onClick={this.nextPage}
          disabled={isNextPageDisabled}
        >
          {translate('pagination_next_label')}
        </button>
      </nav>
    )
  }
}

/**
 * Page Number
 */
function PageNumber ({ page, isActive, selectPage }) {
  function handleClick () {
    if (!isNaN(page)) selectPage(page)
  }

  let klass = classNames({
    'ola-page': true,
    'ola-page-current': isActive,
    'ola-page-ellipsis': isNaN(page)
  })
  let isDisabled = isNaN(page) || isActive
  return (
    <button className={klass} onClick={handleClick} disabled={isDisabled}>
      {page}
    </button>
  )
}

module.exports = injectTranslate(Pagination)
