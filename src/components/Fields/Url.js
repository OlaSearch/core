import React from 'react'
import withLogger from './../../decorators/OlaLogger'

const Url = ({ result, onClick, log, snippetId }) => {
  let { url } = result
  if (!url) return null

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

  return (
    <a
      className='ola-field ola-field-url'
      href={url}
      onClick={handleClick}
      >
      {url}
    </a>
  )
}

module.exports = withLogger(Url)
