import React from 'react'

const AnswerButton = ({ url, title }) => {
  return (
    <a className='ola-answer-button ola-answer-email' href={url}>{title}</a>
  )
}

module.exports = AnswerButton
