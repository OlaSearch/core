import React from 'react'
import PropTypes from 'prop-types'
import { createHTMLMarkup } from './../../utilities'
import Bookmark from './../SnippetActions/Bookmark'

/**
 * Shows a simple answer snippet
 * @example ./src/components/Snippets/Answer.md
 */
function AnswerSnippet ({ result, bookmarks, dispatch, ...rest }) {
  const { ola_answer: answer } = result
  return (
    <div className='ola-snippet ola-snippet-static-answer'>
      <div className='ola-snippet-inner'>
        <div
          className='ola-snippet-answer-result'
          dangerouslySetInnerHTML={createHTMLMarkup(answer)}
        />
        <Bookmark
          result={result}
          bookmarks={bookmarks}
          dispatch={dispatch}
          {...rest}
        />
      </div>
    </div>
  )
}

AnswerSnippet.propTypes = {
  /**
   * The search result object
   */
  result: PropTypes.object,
  /**
   * List of bookmarked results
   */
  bookmarks: PropTypes.array,
  /**
   * Redux dispatch func
   */
  dispatch: PropTypes.func.isRequired
}

export default AnswerSnippet
