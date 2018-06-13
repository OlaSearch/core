import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeBookmark } from './../../actions/Bookmarks'
import listensToClickOutside from '@olasearch/react-onclickoutside'
import classNames from 'classnames'
import SearchResults from './../SearchResults'
import withTranslate from './../../decorators/withTranslate'
import withConfig from './../../decorators/withConfig'
import { log } from './../../actions/Logger'
import NoBookmarks from './NoBookmarks'

class Bookmarks extends React.Component {
  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    showLabel: PropTypes.bool
  }

  static defaultProps = {
    showLabel: false
  }

  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleClickOutside = (event) => {
    this.setState({
      isOpen: false
    })
  }

  toggleVisibility = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      () => {
        if (this.state.isOpen) {
          this.props.onOpen && this.props.onOpen()

          this.props.log({
            eventType: 'C',
            eventCategory: 'Bookmark button',
            eventAction: 'open',
            eventLabel: 'Bookmarks',
            debounce: true
          })
        }
      }
    )
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.bookmarks !== nextProps.bookmarks ||
      this.state.isOpen !== nextState.isOpen
    )
  }
  onRemove = (bookmark) => {
    this.props.removeBookmark(bookmark)
  }
  render () {
    const {
      bookmarks,
      removeBookmark,
      translate,
      showLabel,
      render,
      ...rest
    } = this.props
    const { isOpen } = this.state
    const hasBookmarks = bookmarks.length > 0
    const klass = classNames({
      'ola-module': true,
      'ola-js-hide': !isOpen
    })
    const bookmarkKlass = classNames('ola-bookmarks-container', {
      'ola-bookmarks-hasLabel': showLabel,
      'ola-bookmarks-hasBookmarks': hasBookmarks
    })
    const badgeClass = classNames('ola-badge', {
      'ola-badge-active': hasBookmarks
    })
    /**
     * Render prop
     */
    if (render) return render({ bookmarks, removeBookmark, ...rest })
    return (
      <div className={bookmarkKlass}>
        <button
          type='button'
          className='ola-link-bookmark'
          onClick={this.toggleVisibility}
          tabIndex='-1'
        >
          {showLabel && (
            <span className='ola-bookmarks-label'>
              {translate('bookmarks_label')}
            </span>
          )}
          {showLabel && <span className={badgeClass}>{bookmarks.length}</span>}
          <span
            className='ola-btn-hint'
            aria-label={translate('bookmarks_label')}
          />
        </button>
        <div className={klass}>
          <div className='ola-module-title'>{translate('bookmarks_label')}</div>
          <div className='ola-module-body'>
            <NoBookmarks bookmarks={bookmarks} />
            <SearchResults
              bookmarks={bookmarks}
              results={bookmarks}
              isBookmark
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    bookmarks: state.AppState.bookmarks
  }
}

const BookmarksContainer = connect(mapStateToProps, { removeBookmark, log })(
  withTranslate(listensToClickOutside(Bookmarks))
)
const BookMarksWrapper = (props) => {
  if (props.config.bookmarking) return <BookmarksContainer {...props} />
  return null
}

/**
 * Export the container without checking config file
 */
export { BookmarksContainer }
export default withConfig(BookMarksWrapper)
