import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import withLogger from './../../../decorators/withLogger'
import { LINK_TYPES, LINK_TARGETS } from './../../../constants/Settings'

function Button ({
  title,
  label,
  children,
  className,
  url,
  fullWidth,
  onClick,
  result,
  snippetId,
  log,
  eventLabel,
  eventCategory,
  logPayload,
  textLink,
  replaceClassName,
  singleChild,
  type,
  openInNewWindow,
  ...rest
}) {
  if (title) label = title
  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: eventCategory || 'button',
      eventAction: 'click',
      eventLabel: eventLabel || label,
      snippetId,
      payload: logPayload
    })

    if (onClick) return onClick(event, result)
    if (openInNewWindow) return

    /* Prevent default */
    event.preventDefault()
    /* Trigger a state change so we have time to submit the log */
    if (url) window.location.href = url
  }

  const target = openInNewWindow ? LINK_TARGETS.BLANK : undefined
  const isLink = !!url
  const buttonClass =
    className && replaceClassName
      ? className
      : cx(
        'ola-btn',
        {
          'ola-btn-fullwidth': fullWidth,
          'ola-btn-primary': !textLink,
          'ola-btn-link': textLink,
          'ola-link': isLink,
          [`ola-link-${type}`]: type
        },
        className
      )

  const tagName = isLink ? 'a' : 'button'
  const buttonElement = React.createElement(
    tagName,
    {
      type: isLink ? undefined : 'button',
      className: buttonClass,
      href: isLink ? url : undefined,
      onClick: handleClick,
      target,
      ...rest
    },
    label || children
  )

  /* Return null if no content */
  if (!label && !children && !rest.dangerouslySetInnerHTML) return null

  return <div className='ola-field ola-field-button'>{buttonElement}</div>
}

Button.propTypes = {
  /**
   * Button label
   */
  label: PropTypes.string,
  /**
   * Class name of the button
   */
  className: PropTypes.string,
  /**
   * URL of the page
   */
  url: PropTypes.string,
  /**
   * Makes the button full width
   */
  fullWidth: PropTypes.bool,
  /**
   * Call a JS function using onClick
   */
  onClick: PropTypes.func,
  /**
   * The search result object
   */
  result: PropTypes.object,
  /**
   * Log function
   */
  log: PropTypes.func,
  /**
   * Current active snippet id
   */
  snippetId: PropTypes.string,
  /**
   * The name of the link clicked. Used for logging
   */
  eventLabel: PropTypes.string,
  /**
   * The category of the link clicked. Used for logging
   */
  eventCategory: PropTypes.string,
  /**
   * Children
   */
  children: PropTypes.any,
  /**
   * Show a text link
   */
  textLink: PropTypes.bool,
  /**
   * appendClassName
   */
  replaceClassName: PropTypes.bool,
  /**
   * Is an external link
   */
  type: PropTypes.oneOf(LINK_TYPES.values())
}

Button.defaultProps = {
  fullWidth: false,
  label: null,
  textLink: false,
  replaceClassName: false
}

module.exports = withLogger(Button)
