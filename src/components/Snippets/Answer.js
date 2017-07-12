import React from 'react'
import { createHTMLMarkup } from './../../utilities'

const DefaultAnswerSnippet = ({ result: { ola_answer } }) => {
  return (
    <div className='ola-snippet-answer'>
      <div className='ola-snippet-answer-result' dangerouslySetInnerHTML={createHTMLMarkup(ola_answer)} />
    </div>
  )
}

module.exports = DefaultAnswerSnippet
