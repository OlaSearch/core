import React from 'react'
import HighlightedField from './HighlightedField'

const DocumentPages = ({ pages, q, onSelectPage }) => {
  return (
    <div>
      {pages.map((page, idx) => <PageDetail onSelectPage={onSelectPage} page={page} key={idx} />)}
    </div>
  )
}

class PageDetail extends React.Component {
  onSelectPage = () => {
    this.props.onSelectPage(this.props.page)
  };
  render () {
    let { page } = this.props
    let { pageNumber } = page

    return (
      <div className='ola-snippet-page'>
        <a
          onClick={this.onSelectPage}
          className='ola-page-number'
        >
          <span>p. {pageNumber}</span>
        </a>
        <HighlightedField field='pageContent' result={page} />
      </div>
    )
  }
}

module.exports = DocumentPages
