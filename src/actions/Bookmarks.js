import types from './../constants/ActionTypes'
import omit from 'ramda/src/omit'

/**
 * Add a new bookmark
 * @param {Object} snippet
 * @param {(string|number)} snippet.id
 */
export function addBookmark (snippet) {
  return {
    type: types.ADD_BOOKMARK,
    snippet: omit(
      ['highlighting'],
      snippet
    ) /* Remove highlighting in snippet */
  }
}

/**
 * Remove a bookmark
 * @param  {Object} snippet
 * @param {(string|number)} snippet.id
 * @return {Object}
 */
export function removeBookmark (snippet) {
  return {
    type: types.REMOVE_BOOKMARK,
    snippet
  }
}
