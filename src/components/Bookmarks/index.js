import React from 'react'
import { connect } from 'react-redux'
import { removeBookmark } from './../../actions/Bookmarks'
import listensToClickOutside from 'react-onclickoutside'
import classNames from 'classnames'
import SearchResults from './../SearchResults'
import NoResults from './../Snippets/NoResults'
import injectTranslate from './../../decorators/OlaTranslate'
import { log } from './../../actions/Logger'

class Bookmarks extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    bookmarks: React.PropTypes.array.isRequired
  };

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
  };

  toggleVisibility = () => {
    this.setState({
      isOpen: !this.state.isOpen
    }, () => {
      if (this.state.isOpen) {
        this.props.onOpen && this.props.onOpen()

        this.props.dispatch(log({
          eventType: 'C',
          eventCategory: 'Bookmark button',
          eventAction: 'open',
          eventLabel: 'Bookmarks',
          debounce: true
        }))
      }
    })
  };
  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.bookmarks !== nextProps.bookmarks ||
      this.state.isOpen !== nextState.isOpen
    )
  }
  onRemove = (bookmark) => {
    this.props.dispatch(removeBookmark(bookmark))
  };
  render () {
    var {
      bookmarks,
      dispatch,
      translate
    } = this.props

    var {
      isOpen
    } = this.state

    var klass = classNames({
      'ola-module': true,
      'ola-js-hide': !isOpen
    })

    return (
      <div className='ola-bookmarks-container'>
        <button
          type='button'
          className='ola-link-bookmark'
          onClick={this.toggleVisibility}
        >
          <span className='ola-btn-hint hint--top' aria-label={translate('bookmarks_label')} />
        </button>
        <div className={klass}>
          <div className='ola-module-title'>{translate('bookmarks_label')}</div>
          <div className='ola-module-body'>
            <NoResults
              results={bookmarks}
              isBookmark
            />
            <SearchResults
              bookmarks={bookmarks}
              results={bookmarks}
              dispatch={dispatch}
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

const BookmarksContainer = connect(mapStateToProps)(injectTranslate(listensToClickOutside(Bookmarks)))
const BookMarksWrapper = (props, { config: { bookmarking } }) => {
  if (bookmarking) return <BookmarksContainer />
  return null
}
BookMarksWrapper.contextTypes = {
  config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
}

module.exports = BookMarksWrapper
