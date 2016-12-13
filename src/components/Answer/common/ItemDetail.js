import React from 'react'

const ItemDetail = ({ data: { description, title } }) => {
  return (
    <div className='ola-answer-itemdetail'>
      <div className='ola-answer-title'>{title}</div>
      <div className='ola-answer-description'>{description}</div>
    </div>
  )
}

module.exports = ItemDetail
