import React from 'react'
import withLogger from './../../decorators/OlaLogger'

const Url = ({ result, onClick, log, snippetId, anchorLink, label, className }) => {
  let { url } = result
  if (!url) return null
  if (anchorLink) url = `${url}#${anchorLink}`
  if (!label) label = url
  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: 'Title',
      eventAction: 'click',
      snippetId
    })
    onClick && onClick(event)
  }
  let klassName = 'ola-field ola-field-url'

  if (className) {
    klassName = `${klassName} ${className}`
  }

  return (
    <a
      className={klassName}
      href={url}
      title={url}
      onClick={handleClick}
      >
      {label}
    </a>
  )
}

module.exports = withLogger(Url)
