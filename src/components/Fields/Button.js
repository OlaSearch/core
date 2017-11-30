import React from 'react'
import classNames from 'classnames'
import withLogger from './../../decorators/OlaLogger'

function Button ({ title, label, className, url, fullWidth, onClick, result, snippetId, log, target, openInNewWindow, eventLabel, eventCategory }) {
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
    window.location.href = url
  }

  /* Check if it should be opened in new page */
  if (openInNewWindow) {
    target = '_blank'
  }

  let klass = classNames('ola-cta-button', className, {
    'ola-btn-fullwidth': fullWidth
  })
  if (!label) return null
  return (
    <div className='ola-field ola-field-button'>
      <a
        className={klass}
        onClick={handleClick}
        href={url}
        target={target}
      >
        {label}
      </a>
    </div>
  )
}

Button.defaultProps = {
  fullWidth: false,
  target: null
}

module.exports = withLogger(Button)
