import React from 'react'
import { addBookmark, removeBookmark } from './../../actions/Bookmarks'
import injectTranslate from './../../decorators/olaTranslate'

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
    let { bookmarks, result, translate } = this.props
    let isBookmarked = bookmarks.filter((bookmark) => bookmark.id === result.id).length
    let removeLabel = translate('remove_bookmark_label')
    let addLabel = translate('add_bookmark_label')
    if (isBookmarked) {
      return (
        <button
          type='button'
          className='ola-link-bookmark-action action-remove'
          title={removeLabel}
          onClick={this.removeBookmark}>
          <span>{removeLabel}</span>
        </button>
      )
    } else {
      return (
        <button
          type='button'
          className='ola-link-bookmark-action'
          title={addLabel}
          onClick={this.addBookmark}>
          <span>{addLabel}</span>
        </button>
      )
    }
  }
}

module.exports = injectTranslate(BookmarkActions)

