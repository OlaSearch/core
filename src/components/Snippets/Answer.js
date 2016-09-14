import React from 'react'
import Thumbnail from './../Fields/Thumbnail'

const Answer = ({ answer }) => {
  if (!answer || !Object.keys(answer).length) return null
  let { title, description, image, source } = answer
  return (
    <div className='ola-answer'>
      <div className='ola-answer-image'>
        <Thumbnail
          thumbnail={image}
          width='120'
        />
      </div>
      <div className='ola-answer-content'>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <small>
            {source.name} - {source.url}
          </small>
        </p>
      </div>
    </div>
  )
}

module.exports = Answer