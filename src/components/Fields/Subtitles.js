import React from 'react'
import { createHTMLMarkup, sanitizeAnchor } from './../../utilities'

const Subtitles = ({subtitles, baseUrl, iconLeft = null, iconRight = null }) => {
  if (!subtitles) return null
  return (
    <ul className='ola-field ola-field-subtitles'>
    {subtitles.map((subtitle, idx) => {
      let url = `${baseUrl}#${sanitizeAnchor(subtitle)}`
      return (
        <li key={idx}>
          <a href={url}>
            {iconLeft}
            <span dangerouslySetInnerHTML={createHTMLMarkup(subtitle)} />
            {iconRight}
          </a>
        </li>
      )
    })}
    </ul>
  )
}

module.exports = Subtitles
