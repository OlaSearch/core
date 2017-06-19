import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'

const NoBookmarks = ({ translate, bookmarks }) => {
  if (bookmarks.length) return null
  return (
    <div className='ola-snippet ola-snippet-noresults'>
      {translate('bookmarks_empty_label')}
    </div>
  )
}

module.exports = injectTranslate(NoBookmarks)
