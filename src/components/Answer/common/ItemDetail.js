import React from 'react'

export default function ItemDetail ({ data: { description, title } }) {
  return (
    <div className='ola-answer-itemdetails'>
      <div className='ola-answer-title'>{title}</div>
      <div className='ola-answer-description'>{description}</div>
    </div>
  )
}
