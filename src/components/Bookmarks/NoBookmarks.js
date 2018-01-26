import React from 'react'
import withTranslate from './../../decorators/withTranslate'

function NoBookmarks ({ translate, bookmarks }) {
  if (bookmarks.length) return null
  return (
    <div className='ola-snippet ola-snippet-noresults'>
      {translate('bookmarks_empty_label')}
    </div>
  )
}

export default withTranslate(NoBookmarks)
