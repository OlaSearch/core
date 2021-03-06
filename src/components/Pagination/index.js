import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import ChevronRight from '@olasearch/icons/lib/chevron-right'
import ChevronLeft from '@olasearch/icons/lib/chevron-left'
import scrollIntoView from 'dom-scroll-into-view'

/**
 * Paginates search results
 */
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
    const { totalResults, perPage } = this.props
    let { currentPage } = this.props
    const totalPages = Math.ceil(totalResults / perPage)

    ++currentPage

    if (currentPage > totalPages) currentPage = totalPages

    this.selectPage(currentPage)
  }

  selectPage = (page) => {
    const { actions, onChangePage } = this.props

    if (onChangePage) {
      return onChangePage(page)
    }

    /**
     * Scroll to top
     */
    scrollIntoView(this.pagination.parentNode, document, {
      alignWithTop: true,
      onlyScrollIfNeeded: true,
      offsetTop: 20 /* Add a slight offset */
    })

    actions.changePage(page)

    actions.executeSearch()
  }

  createPageList (start, end, limit, left, right, ellipsis) {
    const list = []
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
    const {
      totalResults,
      perPage,
      currentPage,
      edges,
      limit,
      ellipsis,
      translate
    } = this.props

    const currentPageInt = parseInt(currentPage)
    const totalPages = Math.ceil(totalResults / perPage)
    const start = 1
    const left = Math.max(currentPageInt - edges, 0)
    const right = Math.min(currentPageInt + edges, totalPages)
    const pages = this.createPageList(
      start,
      totalPages,
      limit,
      left,
      right,
      ellipsis
    )

    const isPrevPageDisabled = currentPageInt === 1
    const prevPageClass = classNames('ola-page ola-page-previous', {
      'ola-page-disabled': isPrevPageDisabled
    })
    const isNextPageDisabled = currentPageInt === totalPages || !totalPages
    const nextPageClass = classNames({
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
          <ChevronLeft />
          <span className='ola-page-text'>
            {translate('pagination_prev_label')}
          </span>
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
          <span className='ola-page-text'>
            {translate('pagination_next_label')}
          </span>
          <ChevronRight />
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

  const klass = classNames({
    'ola-page': true,
    'ola-page-current': isActive,
    'ola-page-ellipsis': isNaN(page)
  })
  const isDisabled = isNaN(page) || isActive
  return (
    <button className={klass} onClick={handleClick} disabled={isDisabled}>
      {page}
    </button>
  )
}

export default withTranslate(Pagination)
