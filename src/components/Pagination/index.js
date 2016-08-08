import React from 'react'
import classNames from 'classnames'
import injectTranslate from './../../decorators/OlaTranslate'

class Pagination extends React.Component {
  static defaultProps = {
    ellipsis: '...',
    edges: 2,
    limit: 10,
    perPage: 10,
    currentPage: 1,
    totalResults: 0,
    onChangePage: null
  };

  static propTypes = {
    totalResults: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.any,
    perPage: React.PropTypes.any.isRequired,
    onChangePage: React.PropTypes.func,
    actions: React.PropTypes.shape({
      changePage: React.PropTypes.func.isRequired,
      executeSearch: React.PropTypes.func.isRequired
    })
  };

  prevPage = () => {
    let { currentPage } = this.props

    --currentPage

    if (currentPage < 1) currentPage = 1

    this.selectPage(currentPage)
  };

  nextPage = () => {
    let { currentPage, totalResults, perPage } = this.props
    let totalPages = Math.ceil(totalResults / perPage)

    ++currentPage

    if (currentPage > totalPages) currentPage = totalPages

    this.selectPage(currentPage)
  };

  selectPage = (page) => {
    let { actions, onChangePage } = this.props

    onChangePage
      ? onChangePage()
      : this.refs.pagination.parentNode.scrollIntoView()

    actions.changePage(page)

    actions.executeSearch()
  }

  createPageList (start, end, limit, left, right, ellipsis) {
    let list = []
    for (let i = start; i <= end; i++) {
      if (i === 1 ||
        i === parseInt(end) ||
        end < limit) {
        list.push(i)
      } else {
        if (i === (right + 1) || i === (left - 1)) list.push(ellipsis)

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
    let pages = this.createPageList(start, totalPages, limit, left, right, ellipsis)

    let prevPageClass = classNames('ola-page ola-page-previous', {
      'ola-page-disabled': currentPageInt === 1
    })

    let nextPageClass = classNames({
      'ola-page ola-page-next': true,
      'ola-page-disabled': currentPageInt === totalPages || !totalPages
    })

    return (
      <nav className='ola-pagination' ref='pagination'>
        <button className={prevPageClass} onClick={this.prevPage}>{translate('pagination_prev_label')}</button>
        {pages.map((page, idx) => {
          return (
            <PageNumber
              selectPage={this.selectPage}
              page={page}
              key={idx}
              currentPage={currentPageInt}
            />
          )
        })}
        <button className={nextPageClass} onClick={this.nextPage}>{translate('pagination_next_label')}</button>
      </nav>
    )
  }
}

/**
 * Page Number
 */
class PageNumber extends React.Component {
  handleClick = () => {
    let { page } = this.props

    if (!isNaN(page)) this.props.selectPage(page)
  };
  shouldComponentUpdate (nextProps) {
    return (
      this.props.page !== nextProps.page ||
      this.props.currentPage !== nextProps.currentPage
    )
  }
  render () {
    let { page, currentPage } = this.props
    let klass = classNames({
      'ola-page': true,
      'ola-page-current': currentPage === page,
      'ola-page-ellipsis': isNaN(page)
    })
    return (
      <button
        className={klass}
        onClick={this.handleClick}
      >{page}</button>
    )
  }
}

module.exports = injectTranslate(Pagination)
