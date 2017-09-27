import React from 'react'
import { createHTMLMarkup } from './../../utilities'
import withLogger from './../../decorators/OlaLogger'

const Title = ({ result, isLink, field, url, children, baseUrl, target, isBookmark, isAutosuggest, iconLeft, iconRight, log, snippetId, onClick, fieldLabel, openInNewWindow, eventLabel, eventCategory }) => {
  function logClick (event) {
    /* Send Log */
    let _eventCategory = eventCategory || (isBookmark ? 'Bookmarks' : isAutosuggest ? 'autosuggest' : 'serp')
    log({
      eventType: 'C',
      result,
      eventCategory: _eventCategory,
      eventAction: 'click',
      eventLabel: eventLabel || 'Title',
      snippetId
    })

    if (onClick) onClick(event)
  }

  var { highlighting } = result
  var title = result[field || 'title']

  if (!url) url = result.url || url
  if (baseUrl) url = baseUrl + url

  /* Check for highlighting */
  if (highlighting) {
    var { title: highlightedTitle } = highlighting
    if (typeof highlightedTitle === 'object') title = highlightedTitle[0]
  }
  /* Check if it should be opened in new page */
  if (openInNewWindow) {
    target = '_blank'
  }

  return (
    <h3 className='ola-field ola-field-title'>
      {iconLeft}
      {isLink
        ? <a href={url} target={target} onClick={logClick} dangerouslySetInnerHTML={createHTMLMarkup(title)} />
        : <span dangerouslySetInnerHTML={createHTMLMarkup(title)} />
      }
      {children}
      {iconRight}
    </h3>
  )
}

Title.defaultProps = {
  isLink: true,
  iconLeft: null,
  iconRight: null,
  isBookmark: false,
  field: null,
  target: null,
  openInNewWindow: false
}

module.exports = withLogger(Title)
