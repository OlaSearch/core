import types from './../../src/constants/ActionTypes'
import { default as reducer, initialState } from './../../src/reducers/AppState'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY } from './../../src/constants/Settings'
import expect from 'expect'
import { MAKE_ACTION, INIT_TYPE } from './../common'

describe('Reducer: AppState', () => {
  it('should exist', () => {
    expect(reducer).toExist()
  })

  it('throws an error if action type is not provided', () => {
    expect(() => reducer()).toThrow(/undefined/)
    expect(() => reducer(initialState)).toThrow(/undefined/)
  })

  it('initial state will be always be returned', () => {
    expect(reducer(initialState, INIT_TYPE)).toEqual(initialState)
  })

  it('loading flag is true when searching', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_SEARCH))
    expect(state.isLoading).toEqual(true)
  })

  it('adds results after search', () => {
    let action = MAKE_ACTION(types.REQUEST_SEARCH_SUCCESS, {
      results: ['hey'],
      payload: {}
    })
    let state = reducer(initialState, action)
    expect(state.results).toEqual(['hey'])
  })

  it('appends results after search is appendResult flag is true', () => {
    let action = MAKE_ACTION(types.REQUEST_SEARCH_SUCCESS, {
      results: ['hey'],
      payload: {
        appendResult: true
      }
    })
    let state_1 = reducer(initialState, action)
    let state = reducer(state_1, action)

    expect(state.results).toEqual(['hey', 'hey'])
  })

  it('removes loading flag when search is successfull', () => {
    let action = MAKE_ACTION(types.REQUEST_SEARCH_SUCCESS, { payload: {} })
    let state = reducer(initialState, action)
    expect(state.isLoading).toEqual(false)
  })

  it('shows error during search failure', () => {
    let action = MAKE_ACTION(types.REQUEST_SEARCH_FAILURE, {
      error: {
        status: 'Something went wrong',
        statusText: 404
      }
    })
    let state = reducer(initialState, action)
    expect(state.error.statusText).toEqual(404)
    expect(state.error.status).toEqual('Something went wrong')
  })

  it('adds bookmark', () => {
    let action = MAKE_ACTION(types.ADD_BOOKMARK, {
      snippet: {
        id: 1,
        title: 'Hey'
      }
    })
    let state = reducer(initialState, action)
    expect(state.bookmarks.length).toBe(1)
    expect(state.bookmarks[0].id).toBe(1)
  })

  it('removes bookmark', () => {
    let action_1 = MAKE_ACTION(types.ADD_BOOKMARK, {
      snippet: {
        id: 1,
        title: 'Hey'
      }
    })
    let action_2 = MAKE_ACTION(types.REMOVE_BOOKMARK, {
      snippet: {
        id: 1
      }
    })
    let state
    state = reducer(initialState, action_1)
    expect(state.bookmarks.length).toBe(1)
    state = reducer(state, action_2)
    expect(state.bookmarks.length).toBe(0)
  })

  it('adds history', () => {
    let action = MAKE_ACTION(types.ADD_HISTORY, {
      history: {
        q: 'Foo'
      }
    })

    let state = reducer(initialState, action)
    expect(state.history.length).toBe(1)
  })

  it('clears history', () => {
    let action = MAKE_ACTION(types.CLEAR_HISTORY)

    let state = reducer(initialState, action)
    expect(state.history.length).toBe(0)
  })

  it('terminating search will return initial state', () => {
    let action = MAKE_ACTION(types.TERMINATE_SEARCH)
    let state = reducer(initialState, action)
    expect(state).toEqual(initialState)
  })

  it('can change view', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CHANGE_VIEW, { view: 'grid'}))
    expect(state.view).toEqual('grid')
  })

  /**
   * Add more tests
   */
  it('can rehydrate itself from a namespace', () => {
    let namespace = 'ola'
    let action = MAKE_ACTION(types.OLA_REHYDRATE, { namespace })
    let state = reducer(initialState, action)
    expect(state.bookmarks.length).toBe(0)
  })
})