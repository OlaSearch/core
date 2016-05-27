import React from 'react'
import { connect } from 'react-redux'
import { removeBookmark } from './../../actions/Bookmarks'
import listensToClickOutside from 'react-onclickoutside'
import classNames from 'classnames'
import SearchResults from './../SearchResults'

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
    })
  };

  onRemove = (bookmark) => {
    this.props.dispatch(removeBookmark(bookmark))
  };
  render () {
    var {
      bookmarks,
      dispatch
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
          onMouseDown={this.toggleVisibility}
          aria-label='Show bookmarks'
        ></button>
        <div className={klass}>
          <div className='ola-module-title'>Bookmarks</div>
          <div className='ola-module-body'>
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

module.exports = connect(mapStateToProps)(listensToClickOutside(Bookmarks))
