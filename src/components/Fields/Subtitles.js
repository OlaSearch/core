import React from 'react'
import { createHTMLMarkup, sanitizeAnchor } from './../../utilities'
import FieldLabel from './FieldLabel'

function Subtitles ({
  subtitles,
  baseUrl,
  iconLeft = null,
  iconRight = null,
  fieldLabel
}) {
  if (!subtitles) return null
  return (
    <div className='ola-field ola-field-subtitles'>
      <FieldLabel label={fieldLabel} />
      <ul>
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
    </div>
  )
}

module.exports = Subtitles
