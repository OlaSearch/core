import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withLogger from './../../../decorators/withLogger'

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
  textLink
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

    event.preventDefault()
    if (url) window.location.href = url
  }

  let klass = classNames('ola-btn', className, {
    'ola-btn-fullwidth': fullWidth,
    'ola-cta-button': !textLink,
    'ola-btn-link': textLink
  })
  if (!label && !children) return null
  return (
    <div className='ola-field ola-field-button'>
      <button type='button' className={klass} onClick={handleClick}>
        {label || children}
      </button>
    </div>
  )
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
  textLink: PropTypes.bool
}

Button.defaultProps = {
  fullWidth: false,
  label: null,
  textLink: false
}

module.exports = withLogger(Button)
