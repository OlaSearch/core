import React from 'react'
import PropTypes from 'prop-types'
import { addBookmark, removeBookmark } from './../../actions/Bookmarks'
import withTranslate from './../../decorators/withTranslate'
import classnames from 'classnames'
import { log } from './../../actions/Logger'
import BookMark from '@olasearch/icons/lib/bookmark'
import withConfig from './../../decorators/withConfig'

class BookmarkActions extends React.Component {
  addBookmark = () => {
    const { dispatch, result } = this.props
    dispatch(addBookmark(result))
    dispatch(
      log({
        eventType: 'C',
        eventCategory: 'Add bookmark',
        eventAction: 'click',
        debounce: true,
        result,
        payload: this.props.logPayload,
        snippetId: this.props.snippetId
      })
    )
  }

  removeBookmark = () => {
    const { dispatch, result } = this.props
    dispatch(removeBookmark(result))
    dispatch(
      log({
        eventType: 'C',
        eventCategory: 'Remove bookmark',
        eventAction: 'click',
        debounce: true,
        result,
        payload: this.props.logPayload,
        snippetId: this.props.snippetId
      })
    )
  }

  static propTypes = {
    bookmarks: PropTypes.array,
    result: PropTypes.object,
    dispatch: PropTypes.func
  }
  shouldComponentUpdate (nextProps) {
    return (
      this.props.bookmarks !== nextProps.bookmarks ||
      this.props.result.id !== nextProps.result.id
    )
  }
  render () {
    const { bookmarks, result, translate, isBookmark } = this.props
    const isBookmarked = bookmarks.filter((bookmark) => bookmark.id === result.id)
      .length
    const removeLabel = translate('remove_bookmark_label')
    const addLabel = translate('add_bookmark_label')
    const removeClassName = classnames({
      'ola-link-bookmark-action action-remove': !isBookmark,
      'ola-module-clear ola-module-bookmark-remove': isBookmark
    })
    if (isBookmarked || isBookmark) {
      return (
        <button
          type='button'
          className={removeClassName}
          title={removeLabel}
          onClick={this.removeBookmark}
        >
          <BookMark fill='currentColor' />
        </button>
      )
    } else {
      return (
        <button
          type='button'
          className='ola-link-bookmark-action'
          title={addLabel}
          onClick={this.addBookmark}
        >
          <BookMark />
        </button>
      )
    }
  }
}

const BookmarkWrapper = ({ config, ...rest }) => {
  if (!config.bookmarking) return null
  return <BookmarkActions {...rest} />
}

module.exports = withConfig(withTranslate(BookmarkWrapper))
