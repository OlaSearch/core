import React from 'react'

export default function Header ({ title, url, subtitle }) {
  if (!title && !subtitle) return null
  return (
    <div className='ola-answer-header'>
      {title ? (
        <div className='ola-answer-title'>
          {url ? <a href={url}>{title}</a> : title}
        </div>
      ) : null}
      {subtitle && <div className='ola-answer-subtitle'>{subtitle}</div>}
    </div>
  )
}
