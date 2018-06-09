import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import withLogger from './../../../decorators/withLogger'
import { LINK_TARGETS } from './../../../constants/Settings'
import { getFileExtension } from './../../../utilities'

function Button ({
  title,
  label,
  children,
  className,
  url,
  baseUrl,
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
  openInNewWindow,
  isPhone,
  isTablet,
  isDesktop
}) {
  const linkUrl = baseUrl ? `${baseUrl}${url}` : url
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
    if (linkUrl) window.location.href = linkUrl
  }

  /* Return null if no content */
  if (!label && !children && !dangerouslySetInnerHTML) return null

  const target = openInNewWindow ? LINK_TARGETS.BLANK : undefined
  const isLink = !!linkUrl
  const fileExtenion = getFileExtension(linkUrl)
  const buttonClass = cx(
    {
      'ola-btn': !replaceClassName,
      'ola-btn-fullwidth': fullWidth,
      'ola-btn-primary': !textLink && !replaceClassName,
      'ola-btn-link': textLink,
      'ola-link': isLink,
      'ola-link-external': openInNewWindow,
      [`ola-link-${fileExtenion}`]: fileExtenion
    },
    className
  )
  const tagName = isLink ? 'a' : 'button'
  const buttonElement = React.createElement(
    tagName,
    {
      type: isLink ? undefined : 'button',
      className: buttonClass,
      href: isLink ? linkUrl : undefined,
      onClick: handleClick,
      target
    },
    label || children
  )

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
   * Makes the button full width in mobile
   */
  fullWidthMobile: PropTypes.bool,
  /**
   * Makes the button full width in tablet
   */
  fullWidthTablet: PropTypes.bool,
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
   * Base url
   */
  baseUrl: PropTypes.oneOfType([null, PropTypes.string])
}

Button.defaultProps = {
  fullWidth: false,
  fullWidthTablet: true,
  fullWidthMobile: true,
  label: null,
  textLink: false,
  replaceClassName: false,
  baseUrl: null
}

module.exports = withLogger(Button)
