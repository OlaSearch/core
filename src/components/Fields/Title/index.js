import React from 'react'
import PropTypes from 'prop-types'
import { createHTMLMarkup } from './../../../utilities'
import {
  LOG_EVENT_CATEGORIES,
  LOG_EVENT_LABELS
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
  baseUrl,
  children,
  isBookmark,
  isAutosuggest,
  iconLeft,
  iconRight,
  snippetId,
  onClick,
  openInNewWindow,
  eventLabel,
  eventCategory,
  logPayload,
  linkClassName,
  textClassName
}) {
  const { highlighting } = result
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
      ? LOG_EVENT_CATEGORIES.bookmarks
      : isAutosuggest
        ? LOG_EVENT_CATEGORIES.autosuggest
        : LOG_EVENT_CATEGORIES.serp)
  /* Event label to log click events */
  const logEventLabel = eventLabel || LOG_EVENT_LABELS.title
  return (
    <div className={classes}>
      {iconLeft}
      {isLink ? (
        <Button
          url={url}
          baseUrl={baseUrl}
          eventCategory={logEventCategory}
          eventLabel={logEventLabel}
          textLink={true}
          className={linkClassName}
          onClick={onClick}
          result={result}
          openInNewWindow={openInNewWindow}
          snippetId={snippetId}
          logPayload={logPayload}
        >
          <span
            className={textClassName}
            dangerouslySetInnerHTML={createHTMLMarkup(title)}
          />
        </Button>
      ) : (
        <span
          className={textClassName}
          dangerouslySetInnerHTML={createHTMLMarkup(title)}
        />
      )}
      {children}
      {iconRight}
    </div>
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
  textClassName: null,
  onClick: null,
  type: null,
  baseUrl: null
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
   * Base url
   */
  baseUrl: PropTypes.oneOfType([null, PropTypes.string])
}

export default Title
