import React from 'react'
import { createHTMLMarkup } from './../../utilities'
import Bookmark from './../SnippetActions/Bookmark'

function DefaultAnswerSnippet ({ result, bookmarks, dispatch, ...rest }) {
  let { ola_answer: answer } = result
  return (
    <div className='ola-snippet ola-snippet-static-answer'>
      <div className='ola-snippet-answer-result' dangerouslySetInnerHTML={createHTMLMarkup(answer)} />
      <Bookmark result={result} bookmarks={bookmarks} dispatch={dispatch} {...rest} />
    </div>
  )
}

module.exports = DefaultAnswerSnippet
