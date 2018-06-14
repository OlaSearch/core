import React from 'react'
import PropTypes from 'prop-types'
import Title from './../Fields/Title'
import Thumbnail from './../Fields/Thumbnail'
import TextField from './../Fields/TextField'
import Bookmark from './../SnippetActions/Bookmark'

/**
 * Default search result snippet, displayed only if no snippet is selected in admin console
 * @example ./src/components/Snippets/Default.md
 */
function DefaultSnippet ({ result, bookmarks, dispatch, ...rest }) {
  return (
    <div className='ola-snippet'>
      <div className='ola-snippet-inner'>
        <div className='ola-snippet-image'>
          <Thumbnail thumbnail={result.thumbnail} {...rest} />
        </div>
        <div className='ola-snippet-content'>
          <Bookmark
            result={result}
            bookmarks={bookmarks}
            dispatch={dispatch}
            {...rest}
          />
          <Title result={result} {...rest} />
          <TextField result={result} field='summary' {...rest} />
        </div>
      </div>
    </div>
  )
}

DefaultSnippet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  result: PropTypes.object,
  bookmarks: PropTypes.array
}

export default DefaultSnippet
