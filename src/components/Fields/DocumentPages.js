import React from 'react'
import HighlightedField from './HighlightedField'

const DocumentPages = ({ pages, q, onSelectPage, contentField }) => {
  return (
    <div>
      {pages.map((page, idx) =>
        <PageDetail
          onSelectPage={onSelectPage}
          page={page}
          contentField={contentField}
          feld
          key={idx}
        />
      )}
    </div>
  )
}

/**
 * Default props
 */
DocumentPages.defaultProps = {
  contentField: 'pageContent'
}

/**
 * Page detail
 */
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
        <HighlightedField field={this.props.contentField} result={page} />
      </div>
    )
  }
}

module.exports = DocumentPages
