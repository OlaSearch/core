import React from 'react'
import TextField from './TextField'
import injectTranslate from './../../decorators/OlaTranslate'
import withLogger from './../../decorators/OlaLogger'
import FieldLabel from './FieldLabel'

class DocumentPages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false
    }
  }
  toggle = () => {
    this.setState(
      {
        isVisible: !this.state.isVisible
      },
      () => {
        if (this.state.isVisible) {
          this.props.log({
            eventType: 'C',
            result: this.props.result,
            eventCategory: this.props.translate('doc_view_pages'),
            eventLabel: 'Pages',
            eventAction: 'click',
            snippetId: this.props.snippetId
          })
        }
      }
    )
  }
  onSelect = (page) => {
    this.props.onClick && this.props.onClick(page, this.props.result)
    this.props.log({
      eventType: 'C',
      result: this.props.result,
      eventCategory: 'Page number',
      eventValue: page.pageNumber,
      eventLabel: 'Pages',
      eventAction: 'click',
      snippetId: this.props.snippetId
    })
  }
  render () {
    let {
      pages,
      q,
      contentField,
      translate,
      fieldLabel,
      showIfEmpty
    } = this.props
    let { isVisible } = this.state

    if (!pages.length && !showIfEmpty) return null

    let label = <FieldLabel label={fieldLabel} />

    if (!isVisible) {
      return (
        <div className='ola-field ola-field-pages'>
          {label}
          <a className='ola-link-view-pages' onClick={this.toggle}>
            {translate('doc_view_pages')}
          </a>
        </div>
      )
    }
    return (
      <div className='ola-field ola-field-pages'>
        {label}
        <a
          className='ola-link-view-pages ola-link-view-pages-hide'
          onClick={this.toggle}
        >
          {translate('doc_hide_pages')}
        </a>
        {pages.map((page, idx) => (
          <PageDetail
            onSelectPage={this.onSelect}
            page={page}
            contentField={contentField}
            key={idx}
            q={q}
          />
        ))}
      </div>
    )
  }
}

/**
 * Default props
 */
DocumentPages.defaultProps = {
  contentField: 'pageContent',
  pages: [],
  showIfEmpty: false
}

/**
 * Page detail
 */
function PageDetail ({ page, contentField, onSelectPage }) {
  function handleSelect (event) {
    onSelectPage(page)
  }
  let { pageNumber } = page
  return (
    <div className='ola-snippet-page'>
      <a onClick={handleSelect} className='ola-page-number'>
        <span>p. {pageNumber}</span>
      </a>
      <TextField field={contentField} result={page} />
    </div>
  )
}

module.exports = injectTranslate(withLogger(DocumentPages))
