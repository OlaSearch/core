import React from 'react'

export default function Source ({ source }) {
  if (!source) return null
  const { name, url } = source
  if (!name) return null
  return (
    <div className='ola-answer-source'>
      <span className='ola-answer-source-label'>Source: </span>
      {url ? (
        <a href={url} className='ola-answer-source-link'>
          {name}
        </a>
      ) : (
        <span className='ola-answer-source-link'>{name}</span>
      )}
    </div>
  )
}
