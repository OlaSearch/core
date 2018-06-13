import React from 'react'
import PropTypes from 'prop-types'
import { addBookmark, removeBookmark } from './../../actions/Bookmarks'
import withTranslate from './../../decorators/withTranslate'
import classnames from 'classnames'
import { log } from './../../actions/Logger'
import BookMark from '@olasearch/icons/lib/bookmark'
import withConfig from './../../decorators/withConfig'
import { connect } from 'react-redux'

class BookmarkAction extends React.Component {
  addBookmark = () => {
    const { result } = this.props
    this.props.addBookmark(result)
    this.props.log({
      eventType: 'C',
      eventCategory: 'Add bookmark',
      eventAction: 'click',
      debounce: true,
      result,
      payload: this.props.logPayload,
      snippetId: this.props.snippetId
    })
  }

  removeBookmark = () => {
    const { dispatch, result } = this.props
    this.props.removeBookmark(result)
    this.props.log({
      eventType: 'C',
      eventCategory: 'Remove bookmark',
      eventAction: 'click',
      debounce: true,
      result,
      payload: this.props.logPayload,
      snippetId: this.props.snippetId
    })
  }

  static propTypes = {
    bookmarks: PropTypes.array,
    result: PropTypes.object
  }
  shouldComponentUpdate (nextProps) {
    return (
      this.props.bookmarks !== nextProps.bookmarks ||
      this.props.result.id !== nextProps.result.id
    )
  }
  static defaultProps = {
    buttonClassName: 'ola-link-bookmark-action',
    buttonSize: 20
  }
  render () {
    const {
      bookmarks,
      result,
      translate,
      isBookmark,
      buttonClassName,
      buttonSize
    } = this.props
    const isBookmarked = bookmarks.filter((bookmark) => bookmark.id === result.id)
      .length
    const removeLabel = translate('remove_bookmark_label')
    const addLabel = translate('add_bookmark_label')
    const classes = classnames(buttonClassName, {
      'ola-bookmark-action-remove': !isBookmark,
      'ola-module-clear ola-module-bookmark-remove': isBookmark
    })
    if (isBookmarked || isBookmark) {
      return (
        <button
          type='button'
          className={classes}
          title={removeLabel}
          onClick={this.removeBookmark}
        >
          <BookMark fill='currentColor' size={buttonSize} />
        </button>
      )
    } else {
      return (
        <button
          type='button'
          className={classes}
          title={addLabel}
          onClick={this.addBookmark}
        >
          <BookMark size={buttonSize} />
        </button>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    bookmarks: state.AppState.bookmarks
  }
}

const BookmarkButton = connect(mapStateToProps, {
  addBookmark,
  removeBookmark,
  log
})(withConfig(withTranslate(BookmarkAction)))
const BookmarkWrapper = ({ config, ...rest }) => {
  if (!config.bookmarking) return null
  return <BookmarkButton {...rest} />
}
/**
 * Export the button without checking config file
 */
export { BookmarkButton }
export default withConfig(BookmarkWrapper)
