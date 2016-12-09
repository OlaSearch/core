import React from 'react'
import { createHTMLMarkup } from './../../utilities'

const DefaultAnswerSnippet = ({ result: { ola_answer } }) => {
  return (
    <div className='ola-snippet-answer'>
      <div dangerouslySetInnerHTML={createHTMLMarkup(ola_answer)} />
    </div>
  )
}

module.exports = DefaultAnswerSnippet
