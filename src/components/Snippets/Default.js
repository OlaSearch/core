import React from 'react'
import { arrayJoin } from './../../utilities'
import Bookmark from './Actions/Bookmark'
import Title from './Fields/Title'
import Thumbnail from './Fields/Thumbnail'
import Rating from './Fields/Rating'
import Summary from './Fields/Summary'

class Default extends React.Component {
  static defaultProps = {
    showTrailer: true,
    showSummary: true,
    isAutosuggest: false
  };

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    result: React.PropTypes.object,
    bookmarks: React.PropTypes.array
  };

  render () {
    var {
      result,
      showSummary
    } = this.props

    return (
      <div className='ola-snippet'>
        <div className='ola-snippet-image'>
          <Thumbnail
            thumbnail={result.thumbnail}
            thumbnail_mobile={result.thumbnail_mobile}
          />
        </div>
        <div className='ola-snippet-content'>
          <div className='ola-snippet-actions'>
            <Bookmark {...this.props} />
          </div>
          <Title result={result} />
          <Rating
            rating={result.star_rating}
          />

          {showSummary
            ? <Summary result={result} />
            : null
          }

          {result.directors ? <p>{arrayJoin('By ', result.directors)}</p> : null}

        </div>
      </div>
    )
  }
}

module.exports = Default
