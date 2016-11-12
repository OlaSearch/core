import React from 'react'
import HighlightedField from './HighlightedField'

class DocumentPages extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      isVisible: false
    }
  }
  toggle = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  };
  onSelect = (pageNumber) => {
    this.props.onClick && this.props.onClick(pageNumber, this.props.result)
  };
  render () {
    let { pages, q, contentField } = this.props
    let { isVisible } = this.state

    if (!pages.length) return null

    if (!isVisible) return (
      <div className='ola-field-pages'>
        <a className='ola-link-view-pages' onClick={this.toggle}>View more</a>
      </div>
    )
    return (
      <div className='ola-field-pages'>
        <a className='ola-link-view-pages ola-link-view-pages-hide' onClick={this.toggle}>Hide</a>
        {pages.map((page, idx) =>
          <PageDetail
            onSelectPage={this.onSelect}
            page={page}
            contentField={contentField}
            key={idx}
          />
        )}
      </div>
    )
  }
}

/**
 * Default props
 */
DocumentPages.defaultProps = {
  contentField: 'pageContent',
  pages: []
}

/**
 * Page detail
 */
class PageDetail extends React.Component {
  onSelectPage = () => {
    this.props.onSelectPage(this.props.page)
  };
  render () {
    let { page, contentField } = this.props
    let { pageNumber } = page

    return (
      <div className='ola-snippet-page'>
        <a
          onClick={this.onSelectPage}
          className='ola-page-number'
        >
          <span>p. {pageNumber}</span>
        </a>
        <HighlightedField field={contentField} result={page} />
      </div>
    )
  }
}

module.exports = DocumentPages
