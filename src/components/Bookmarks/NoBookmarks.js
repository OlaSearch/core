import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'

function NoBookmarks ({ translate, bookmarks }) {
  if (bookmarks.length) return null
  return (
    <div className='ola-snippet ola-snippet-noresults'>
      {translate('bookmarks_empty_label')}
    </div>
  )
}

export default injectTranslate(NoBookmarks)
