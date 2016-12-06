import React from 'react'
import Title from './../Fields/Title'
import Thumbnail from './../Fields/Thumbnail'
import Summary from './../Fields/Summary'
import Bookmark from './../SnippetActions/Bookmark'

const DefaultSnippet = ({ result, bookmarks, dispatch, ...rest }) => {
  return (
    <div className='ola-snippet'>
      <div className='ola-snippet-image'>
        <Thumbnail
          thumbnail={result.thumbnail}
          thumbnail_mobile={result.thumbnail_mobile}
        />
      </div>
      <div className='ola-snippet-content'>
        <Bookmark result={result} bookmarks={bookmarks} dispatch={dispatch} {...rest} />
        <Title result={result} />
        <Summary result={result} />
      </div>
    </div>
  )
}

DefaultSnippet.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  result: React.PropTypes.object,
  bookmarks: React.PropTypes.array
}

module.exports = DefaultSnippet
