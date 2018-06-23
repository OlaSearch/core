import React from 'react'
import PropTypes from 'prop-types'
import TextField from './../TextField'
import classNames from 'classnames'
import withTranslate from './../../../decorators/withTranslate'
import withToggle from './../../../decorators/withToggle'
import withLogger from './../../../decorators/withLogger'
import FieldLabel from './../FieldLabel'

/**
 * Displays a list of inner docs for nested documents
 */
function DocumentPages ({
  onClick,
  result,
  snippetId,
  log,
  pages,
  contentField,
  translate,
  fieldLabel,
  showIfEmpty,
  isCollapsed,
  toggle,
  logPayload
}) {
  function onSelect (page) {
    onClick && onClick(page, result)
    log({
      eventType: 'C',
      result,
      eventCategory: 'Page number',
      eventValue: page.pageNumber,
      eventLabel: 'Pages',
      eventAction: 'click',
      snippetId,
      payload: logPayload
    })
  }

  function handleClick (event) {
    toggle()
    log({
      eventType: 'C',
      result,
      eventCategory: event.target.innerText,
      eventLabel: 'Pages',
      eventAction: 'click',
      snippetId
    })
  }

  if (!pages.length && !showIfEmpty) return null
  const label = <FieldLabel label={fieldLabel} />
  const klass = classNames('ola-link-view-pages', {
    'ola-link-view-pages-hide': isCollapsed
  })
  return (
    <div className='ola-field ola-field-pages'>
      {label}
      <a className={klass} onClick={handleClick}>
        {isCollapsed
          ? translate('doc_hide_pages')
          : translate('doc_view_pages')}
      </a>
      {isCollapsed
        ? pages.map((page, idx) => (
          <PageDetail
            onSelectPage={onSelect}
            page={page}
            contentField={contentField}
            key={idx}
          />
        ))
        : null}
    </div>
  )
}

/**
 * Default props
 */
DocumentPages.defaultProps = {
  contentField: 'pageContent',
  pages: [],
  showIfEmpty: false,
  isCollapsed: true
}

DocumentPages.propTypes = {
  /**
   * Field where content of the page is located
   */
  contentField: PropTypes.string,
  /**
   * List of pages
   */
  pages: PropTypes.array,
  /**
   * Show this field if pages are empty
   */
  showIfEmpty: PropTypes.bool,
  /**
   * Search result
   */
  result: PropTypes.object,
  /**
   * Is this paegs hidden by default
   */
  isCollapsed: PropTypes.bool
}

/**
 * Page detail
 */
function PageDetail ({ page, contentField, onSelectPage }) {
  function handleSelect () {
    onSelectPage(page)
  }
  const { pageNumber } = page
  return (
    <div className='ola-snippet-page'>
      <a onClick={handleSelect} className='ola-page-number'>
        <span>p. {pageNumber}</span>
      </a>
      <TextField field={contentField} result={page} />
    </div>
  )
}

export default withTranslate(withLogger(withToggle(DocumentPages)))
