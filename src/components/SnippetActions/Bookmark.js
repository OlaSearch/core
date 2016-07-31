import React from 'react'
import { addBookmark, removeBookmark } from './../../actions/Bookmarks'
import injectTranslate from './../../decorators/olaTranslate'
import classnames from 'classnames'
import { log } from './../../actions/Logger'

class BookmarkActions extends React.Component {
  addBookmark = () => {
    let { dispatch, result } = this.props
    dispatch(addBookmark(result))
    dispatch(log({
      eventType: 'C',
      eventCategory: 'Add bookmark',
      eventAction: 'click',
      debounce: true
    }))
  };

  removeBookmark = () => {
    let { dispatch, result } = this.props
    dispatch(removeBookmark(result))
    dispatch(log({
      eventType: 'C',
      eventCategory: 'Remove bookmark',
      eventAction: 'click',
      debounce: true
    }))
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
    let { bookmarks, result, translate, isBookmark } = this.props
    let isBookmarked = bookmarks.filter((bookmark) => bookmark.id === result.id).length
    let removeLabel = translate('remove_bookmark_label')
    let addLabel = translate('add_bookmark_label')
    let removeClassName = classnames({
      'ola-link-bookmark-action action-remove': !isBookmark,
      'ola-module-clear ola-module-bookmark-remove': isBookmark
    })
    if (isBookmarked || isBookmark) {
      return (
        <button
          type='button'
          className={removeClassName}
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
