import React from 'react'
import PropTypes from 'prop-types'
import { createHTMLMarkup, getLinkType } from './../../../utilities'
import {
  LINK_TYPES,
  EVENT_CATEGORIES,
  EVENT_LABELS
} from './../../../constants/Settings'
import Button from './../Button'

/**
 * Display search result title
 */
function Title ({
  result,
  isLink,
  field,
  url,
  children,
  isBookmark,
  isAutosuggest,
  iconLeft,
  iconRight,
  snippetId,
  onClick,
  fieldLabel,
  openInNewWindow,
  eventLabel,
  eventCategory,
  logPayload,
  type
}) {
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
  /* Title class */
  const classes = 'ola-field ola-field-title'
  /* Event category to log click events */
  const logEventCategory =
    eventCategory ||
    (isBookmark
      ? EVENT_CATEGORIES.bookmarks
      : isAutosuggest ? EVENT_CATEGORIES.autosuggest : EVENT_CATEGORIES.serp)
  /* Event label to log click events */
  const logEventLabel = eventLabel || EVENT_LABELS.title
  return (
    <h3 className={classes}>
      {iconLeft}
      {isLink ? (
        <Button
          url={url}
          type={type}
          eventCategory={logEventCategory}
          eventLabel={logEventLabel}
          textLink={true}
          onClick={onClick}
          dangerouslySetInnerHTML={createHTMLMarkup(title)}
          result={result}
          openInNewWindow={openInNewWindow}
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
  openInNewWindow: false,
  onClick: null,
  type: null
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
  isAutosuggest: PropTypes.bool,
  /**
   * Is an external link
   */
  type: PropTypes.oneOf(LINK_TYPES.values())
}

module.exports = Title
