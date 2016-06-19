import React from 'react'
import { createHTMLMarkup, sanitizeAnchor } from './../utilities'

const Subtitles = ({subtitles, baseUrl}) => {
  if (!subtitles) return null
  return (
    <ul className='ola-field ola-field-subtitles'>
    {subtitles.map((subtitle, idx) => {
      let url = `${baseUrl}#${sanitizeAnchor(subtitle)}`
      return (
        <li key={idx}>
          <a href={url}><em className='ion ion-ios-arrow-thin-right' /><span dangerouslySetInnerHTML={createHTMLMarkup(subtitle)} /></a>
        </li>
      )
    })}
    </ul>
  )
}

module.exports = Subtitles
