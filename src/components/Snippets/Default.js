import React from 'react'
import Bookmark from './../SnippetActions/Bookmark'
import Title from './../Fields/Title'
import Thumbnail from './../Fields/Thumbnail'
import Rating from './../Fields/Rating'
import Summary from './../Fields/Summary'
import ArrayField from './../Fields/ArrayField'

const DefaultSnippet = (props) => {
  let { result, showSummary } = props
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
          <Bookmark {...props} />
        </div>
        <Title result={result} />
        <Rating rating={result.star_rating} />
        {showSummary && <Summary result={result} />}
        <ArrayField field={result.directors} />
      </div>
    </div>
  )
}

DefaultSnippet.defaultProps = {
  showTrailer: true,
  showSummary: true,
  isAutosuggest: false
}

DefaultSnippet.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  result: React.PropTypes.object,
  bookmarks: React.PropTypes.array
}

module.exports = DefaultSnippet
