import React from 'react'
import PropTypes from 'prop-types'
import { createHTMLMarkup } from './../../../utilities'
import withLogger from './../../../decorators/withLogger'

/**
 * Display search result title
 */
function Title ({
  result,
  isLink,
  field,
  url,
  children,
  target,
  isBookmark,
  isAutosuggest,
  iconLeft,
  iconRight,
  log,
  snippetId,
  onClick,
  fieldLabel,
  openInNewWindow,
  eventLabel,
  eventCategory,
  logPayload
}) {
  function logClick (event) {
    /* Send Log */
    let _eventCategory =
      eventCategory ||
      (isBookmark ? 'Bookmarks' : isAutosuggest ? 'autosuggest' : 'serp')
    log({
      eventType: 'C',
      result,
      eventCategory: _eventCategory,
      eventAction: 'click',
      eventLabel: eventLabel || 'Title',
      snippetId,
      payload: logPayload
    })

    if (onClick) onClick(event)
  }

  var { highlighting } = result
  var title = result[field]

  if (!url) url = result.url || url
  if (!url && !onClick) isLink = false

  /* Check for highlighting */
  if (highlighting) {
    var { title: highlightedTitle } = highlighting
    if (typeof highlightedTitle === 'object') {
      title = highlightedTitle[0]
    } else if (highlightedTitle) {
      title = highlightedTitle
    }
  }
  /* Check if it should be opened in new page */
  if (openInNewWindow) {
    target = '_blank'
  }

  return (
    <h3 className='ola-field ola-field-title'>
      {iconLeft}
      {isLink ? (
        <a
          href={url}
          target={target}
          onClick={logClick}
          dangerouslySetInnerHTML={createHTMLMarkup(title)}
        />
      ) : (
        <span dangerouslySetInnerHTML={createHTMLMarkup(title)} />
      )}
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
  isAutosuggest: false,
  field: 'title',
  target: null,
  openInNewWindow: false,
  onClick: null
}

Title.propTypes = {
  /**
   * Search result
   */
  result: PropTypes.object.isRequired,
  /**
   * Add a link
   */
  isLink: PropTypes.bool,
  /**
   * Title field name
   */
  field: PropTypes.string,
  /**
   * Show child elements
   */
  children: PropTypes.any,
  /**
   * HTML target attribute for `a` link
   */
  target: PropTypes.oneOf(['_blank', 'self', null]),
  /**
   * Open the link in a new window
   */
  openInNewWindow: PropTypes.bool,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string,
  /**
   * Icon Component to be displayed on the left
   */
  iconLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * Icon Component to be displayed on the right
   */
  iconRight: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * Is the title displayed in Bookmark list
   */
  isBookmark: PropTypes.bool,
  /**
   * Is the title displayed in Autosuggest list
   */
  isAutosuggest: PropTypes.bool
}

module.exports = withLogger(Title)
