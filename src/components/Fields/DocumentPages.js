import React from 'react'
import HighlightedField from './HighlightedField'
import injectTranslate from './../../decorators/OlaTranslate'
import withLogger from './../../decorators/OlaLogger'

class DocumentPages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false
    }
  }
  toggle = () => {
    this.setState({
      isVisible: !this.state.isVisible
    }, () => {
      if (this.state.isVisible) {
        this.props.log({
          eventType: 'C',
          result: this.props.result,
          eventCategory: 'View pages',
          eventLabel: this.props.translate('doc_view_pages'),
          eventAction: 'click',
          snippetId: this.props.snippetId,
          collectionId: this.props.collectionId
        })
      }
    })
  };
  onSelect = (page) => {
    this.props.onClick && this.props.onClick(page, this.props.result)
    this.props.log({
      eventType: 'C',
      result: this.props.result,
      eventCategory: 'View page',
      eventLabel: page.pageNumber,
      eventAction: 'click',
      snippetId: this.props.snippetId,
      collectionId: this.props.collectionId
    })
  };
  render () {
    let { pages, q, contentField, translate } = this.props
    let { isVisible } = this.state

    if (!pages.length) return null

    if (!isVisible) {
      return (
        <div className='ola-field-pages'>
          <a className='ola-link-view-pages' onClick={this.toggle}>{translate('doc_view_pages')}</a>
        </div>
      )
    }
    return (
      <div className='ola-field-pages'>
        <a className='ola-link-view-pages ola-link-view-pages-hide' onClick={this.toggle}>{translate('doc_hide_pages')}</a>
        {pages.map((page, idx) =>
          <PageDetail
            onSelectPage={this.onSelect}
            page={page}
            contentField={contentField}
            key={idx}
            q={q}
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

module.exports = injectTranslate(withLogger(DocumentPages))
