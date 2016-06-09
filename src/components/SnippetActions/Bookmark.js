import React from 'react'
import { addBookmark, removeBookmark } from './../../actions/Bookmarks'

class BookmarkActions extends React.Component {
  addBookmark = () => {
    let { dispatch, result } = this.props
    dispatch(addBookmark(result))
  };

  removeBookmark = () => {
    let { dispatch, result } = this.props
    dispatch(removeBookmark(result))
  };

  static propTypes = {
    bookmarks: React.PropTypes.array,
    result: React.PropTypes.object,
    dispatch: React.PropTypes.func
  };
  shouldComponentUpdate (nextProps) {
    return (
      this.props.bookmarks !== nextProps.bookmarks ||
      this.props.result.id !== nextProps.result.id
    )
  }
  render () {
    let { bookmarks, result } = this.props
    let isBookmarked = bookmarks.filter((bookmark) => bookmark.id === result.id).length

    if (isBookmarked) {
      return (
        <button
          type='button'
          className='ola-link-bookmark-action action-remove'
          title='Remove from bookmarks'
          onClick={this.removeBookmark}>
          <span>Remove Bookmark</span>
        </button>
      )
    } else {
      return (
        <button
          type='button'
          className='ola-link-bookmark-action'
          title='Add to bookmarks'
          onClick={this.addBookmark}>
          <span>Add Bookmark</span>
        </button>
      )
    }
  }
}

module.exports = BookmarkActions

