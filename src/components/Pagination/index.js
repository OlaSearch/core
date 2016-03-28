import React from 'react'
import classNames from 'classnames'

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
    var { currentPage } = this.props

    --currentPage

    if (currentPage < 1) currentPage = 1

    this.selectPage(currentPage)
  };

  nextPage = () => {
    var { currentPage, totalResults, perPage } = this.props
    var totalPages = Math.ceil(totalResults / perPage)

    ++currentPage

    if (currentPage > totalPages) currentPage = totalPages

    this.selectPage(currentPage)
  };

  selectPage (page) {
    var { actions, onChangePage } = this.props

    onChangePage
      ? onChangePage.call(this)
      : this.refs.pagination.parentNode.scrollIntoView()

    actions.changePage(page)

    actions.executeSearch()
  }

  createPageList (start, end, limit, left, right, ellipsis) {
    var list = []
    for (var i = start; i <= end; i++) {
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

  render () {
    var {
      totalResults,
      perPage,
      currentPage,
      edges,
      limit,
      ellipsis
    } = this.props

    let currentPageInt = parseInt(currentPage)
    var totalPages = Math.ceil(totalResults / perPage)

    var start = 1
    var left = Math.max(currentPageInt - edges, 0)
    var right = Math.min(currentPageInt + edges, totalPages)

    var pages = this.createPageList(start, totalPages, limit, left, right, ellipsis)

    var prevPageClass = classNames('ola-page ola-page-previous', {
      'ola-page-disabled': currentPageInt === 1
    })

    var nextPageClass = classNames({
      'ola-page ola-page-next': true,
      'ola-page-disabled': currentPageInt === totalPages
    })

    return (
      <nav className='ola-pagination' ref='pagination'>
        <button className={prevPageClass} onClick={this.prevPage}>Previous</button>
        {pages.map((page, idx) => {
          var klass = classNames({
            'ola-page': true,
            'ola-page-current': currentPageInt === page,
            'ola-page-ellipsis': page === ellipsis
          })

          return (
            <button
              className={klass}
              key={idx}
              onClick={() => {
                if (page !== ellipsis) this.selectPage(page)
              }}
            >{page}</button>
          )
        })}
        <button className={nextPageClass} onClick={this.nextPage}>Next</button>
      </nav>
    )
  }
}

module.exports = Pagination
