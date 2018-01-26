import React from 'react'
import TextField from './../TextField'
import classNames from 'classnames'
import withTranslate from './../../../decorators/withTranslate'
import withToggle from './../../../decorators/withToggle'
import withLogger from './../../../decorators/withLogger'
import FieldLabel from './../FieldLabel'

function DocumentPages ({
  onClick,
  result,
  snippetId,
  log,
  pages,
  q,
  contentField,
  translate,
  fieldLabel,
  showIfEmpty,
  isCollapsed,
  toggleDisplay
}) {
  function onSelect (page) {
    console.log(page, result)
    onClick && onClick(page, result)
    log({
      eventType: 'C',
      result,
      eventCategory: 'Page number',
      eventValue: page.pageNumber,
      eventLabel: 'Pages',
      eventAction: 'click',
      snippetId
    })
  }

  function toggle (event) {
    toggleDisplay()
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
  let label = <FieldLabel label={fieldLabel} />
  let klass = classNames('ola-link-view-pages', {
    'ola-link-view-pages-hide': isCollapsed
  })
  return (
    <div className='ola-field ola-field-pages'>
      {label}
      <a className={klass} onClick={toggle}>
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
              q={q}
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

module.exports = withTranslate(withLogger(withToggle(DocumentPages)))
