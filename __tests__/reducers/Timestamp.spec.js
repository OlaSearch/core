import types from './../../src/constants/ActionTypes'
import { default as reducer, initialState } from './../../src/reducers/Timestamp'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY } from './../../src/constants/Settings'
import expect from 'expect'
import { MAKE_ACTION, INIT_TYPE } from './../common'

describe('Reducer: Timestamp', () => {
  it('should exist', () => {
    expect(reducer).toBeDefined()
  })

  it('should return empty timestamp', () => {
    let state = reducer(initialState, {})
    expect(state.timestamp).toEqual({})
  })

  it('should update timestamp', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_SEARCH, { api: 'search'}))
    expect(state.timestamp['search']).toBeLessThanOrEqual(new Date().getTime())
  })

  it('should clear timestamp when autosuggest is closed', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CLOSE_AUTOSUGGEST))
    expect(state.timestamp).toEqual({})
  })

})