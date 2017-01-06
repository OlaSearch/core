import React from 'react'
import classNames from 'classnames'
import withLogger from './../../decorators/OlaLogger'

const Button = ({ label, className, url, fullWidth, onClick, result, snippetId, log }) => {
  function handleClick (event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: label,
      eventAction: 'click',
      snippetId: snippetId
    })

    if (onClick) return onClick(event, result)

    event.preventDefault()
    window.location.href = url
  }

  let klass = classNames('ola-cta-button', className, {
    'ola-btn-fullwidth': fullWidth
  })
  if (!label) return null
  return (
    <a
      className={klass}
      onClick={handleClick}
      href={url}
    >
      {label}
    </a>
  )
}

Button.defaultProps = {
  fullWidth: false
}

module.exports = withLogger(Button)
