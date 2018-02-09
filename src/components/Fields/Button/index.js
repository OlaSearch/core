import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withLogger from './../../../decorators/withLogger'

function Button ({
  title,
  label,
  className,
  url,
  fullWidth,
  onClick,
  result,
  snippetId,
  log,
  target,
  openInNewWindow,
  eventLabel,
  eventCategory
}) {
  if (title) label = title
  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: eventCategory || 'button',
      eventAction: 'click',
      eventLabel: eventLabel || label,
      snippetId
    })

    if (onClick) return onClick(event, result)

    if (target) return
    event.preventDefault()
    if (url) window.location.href = url
  }

  /* Check if it should be opened in new page */
  if (openInNewWindow) {
    target = '_blank'
  }

  let klass = classNames('ola-btn', 'ola-cta-button', className, {
    'ola-btn-fullwidth': fullWidth
  })
  if (!label) return null
  return (
    <div className='ola-field ola-field-button'>
      <button
        type='button'
        className={klass}
        onClick={handleClick}
        target={target}
      >
        {label}
      </button>
    </div>
  )
}

Button.propTypes = {
  /* Button label */
  label: PropTypes.string,
  /* Class name of the button */
  className: PropTypes.string,
  url: PropTypes.string,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  result: PropTypes.object,
  target: PropTypes.string,
  log: PropTypes.func,
  snippetId: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  /* Used for logging */
  eventLabel: PropTypes.string,
  /* Used for logging */
  eventCategory: PropTypes.string
}

Button.defaultProps = {
  fullWidth: false,
  target: null
}

module.exports = withLogger(Button)
