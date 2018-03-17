import React from 'react'

export default function Button ({ url, title, type }) {
  const href = type === 'email' ? `mailto:${url}` : url
  return (
    <a className='ola-answer-button ola-answer-email' href={href}>
      {title}
    </a>
  )
}
