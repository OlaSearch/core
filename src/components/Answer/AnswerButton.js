import React from 'react'

export default function AnswerButton ({ url, title }) {
  return (
    <a className='ola-answer-button ola-answer-email' href={url}>
      {title}
    </a>
  )
}
