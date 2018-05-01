import React from 'react'
import Title from './../../Fields/Title'
import { EVENT_CATEGORY_CARD } from './../../../constants/Settings'

export default function Header (card) {
  const { title, url, subtitle, ...rest } = card
  if (!title && !subtitle) return null
  return (
    <div className='ola-answer-header'>
      <Title
        result={card}
        field='title'
        openInNewWindow
        eventLabel={title}
        eventCategory={EVENT_CATEGORY_CARD}
        {...rest}
      />
      {subtitle && <div className='ola-answer-subtitle'>{subtitle}</div>}
    </div>
  )
}
