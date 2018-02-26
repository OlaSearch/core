import React from 'react'
import withLogger from './../../../decorators/withLogger'

function Url ({
  result,
  field,
  onClick,
  log,
  snippetId,
  anchorLink,
  label,
  className,
  logPayload
}) {
  let { url } = result
  if (field) {
    url = result[field]
  }
  if (!url) return null
  if (anchorLink) url = `${url}#${anchorLink}`
  if (!label) label = url
  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: 'Title',
      eventAction: 'click',
      snippetId,
      payload: logPayload
    })
    onClick && onClick(event)
  }
  let klassName = 'ola-field ola-field-url'

  if (className) {
    klassName = `${klassName} ${className}`
  }

  return (
    <a className={klassName} href={url} title={url} onClick={handleClick}>
      {label}
    </a>
  )
}

Url.defaultProps = {
  field: 'url'
}

module.exports = withLogger(Url)
