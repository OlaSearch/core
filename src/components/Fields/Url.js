import React from 'react'
import withLogger from './../../decorators/OlaLogger'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Url = ({ result, onClick, log, snippetId }) => {
  let { url } = result
  if (!url) return NO_SCRIPT_TAG

  return (
    <a
      className='ola-field ola-field-url'
      href={url}
      onClick={(event) => {
        log({
          eventType: 'C',
          result,
          eventCategory: 'Title',
          eventAction: 'click',
          snippetId
        })
        onClick && onClick(event)
      }}
      >
      {url}
    </a>
  )
}

module.exports = withLogger(Url)
