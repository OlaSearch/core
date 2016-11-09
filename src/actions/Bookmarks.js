import types from './../constants/ActionTypes'
import omit from 'ramda/src/omit'

export function addBookmark (snippet) {
  return {
    type: types.ADD_BOOKMARK,
    snippet: omit(['highlighting'], snippet) /* Remove highlighting in snippet */
  }
}

export function removeBookmark (snippet) {
  return {
    type: types.REMOVE_BOOKMARK,
    snippet
  }
}
