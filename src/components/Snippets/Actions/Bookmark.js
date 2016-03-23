import React from 'react'
import { addBookmark, removeBookmark } from './../../../actions/Bookmarks'

const BookmarkActions = (props) => {
  var { bookmarks, result, dispatch } = props

  var isBookmarked = bookmarks.filter((bookmark) => bookmark.id === result.id).length

  if (isBookmarked) {
    return (
      <button
        type='button'
        className='ola-link-bookmark-action action-remove'
        onClick={() => dispatch(removeBookmark(result))}>
        <span>Remove Bookmark</span>
      </button>
    )
  } else {
    return (
      <button
        type='button'
        className='ola-link-bookmark-action'
        onClick={() => dispatch(addBookmark(result))}>
        <span>Add Bookmark</span>
      </button>
    )
  }
}

BookmarkActions.propTypes = {
  bookmarks: React.PropTypes.array,
  result: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

module.exports = BookmarkActions
