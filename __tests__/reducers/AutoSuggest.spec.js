import types from './../../src/constants/ActionTypes'
import { default as reducer, initialState } from './../../src/reducers/AutoSuggest'
import expect from 'expect'
import { MAKE_ACTION, INIT_TYPE, FACET_ITEM_AUTOSUGGEST } from './../common'

describe('Reducer: AutoSuggest', () => {
  it('should exist', () => {
    expect(reducer).toBeDefined()
  })

  it('throws an error if action type is not provided', () => {
    expect(() => reducer()).toThrow(/undefined/)
    expect(() => reducer(initialState)).toThrow(/undefined/)
  })

  it('should return initial state with no action', () => {
    let state = reducer(initialState, MAKE_ACTION(INIT_TYPE))
    expect(state).toEqual(initialState)
  })

  it('updates query term', () => {
    let state = reducer(initialState, MAKE_ACTION(types.UPDATE_QUERY_TERM_AUTOSUGGEST, { term: 'Foo'}))
    expect(state.q).toEqual('Foo')
  })

  it('returns initial state on clear', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CLEAR_QUERY_TERM_AUTOSUGGEST))
    expect(state).toEqual(initialState)
  })

  it('loading flag is set to true before search', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_AUTOSUGGEST))
    expect(state.isLoading).toEqual(true)
  })

  it('loading flag is set to false after search', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_AUTOSUGGEST_SUCCESS, {
      results: [],
      spellSuggestions: []
    }))
    expect(state.isLoading).toEqual(false)
  })

  it('closes autosuggest if no results', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_AUTOSUGGEST_SUCCESS, {
      results: [],
      spellSuggestions: []
    }))
    expect(state.isOpen).toEqual(false)
  })

  it('closes autosuggest if query is empty', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_AUTOSUGGEST_SUCCESS, {
      results: ['hey'],
      spellSuggestions: []
    }))
    expect(state.isOpen).toEqual(false)
  })

  it('opens autosuggest if query and results is present', () => {
    let state
    state = reducer(initialState, MAKE_ACTION(types.UPDATE_QUERY_TERM_AUTOSUGGEST, { term: 'hey' }))
    state = reducer(state, MAKE_ACTION(types.REQUEST_AUTOSUGGEST_SUCCESS, {
      results: ['hey'],
      spellSuggestions: []
    }))
    expect(state.isOpen).toEqual(true)
  })

  /* More testing here for results */

  it('opens auto suggest', () => {
    let state = reducer(initialState, MAKE_ACTION(types.OPEN_AUTOSUGGEST))
    expect(state.isOpen).toEqual(true)
  })
  it('closes auto suggest', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CLOSE_AUTOSUGGEST))
    expect(state.isOpen).toEqual(false)
  })


  /* Add facet */
  it('adds facet to autosuggest', () => {
    let state = reducer(initialState, MAKE_ACTION(types.ADD_FACET_AUTOSUGGEST, FACET_ITEM_AUTOSUGGEST))
    expect(state.facet_query.length).toEqual(1)
  })

  /* Removes facet */
  it('removes facet to autosuggest', () => {
    let state
    state = reducer(initialState, MAKE_ACTION(types.ADD_FACET_AUTOSUGGEST, FACET_ITEM_AUTOSUGGEST))
    state = reducer(state, MAKE_ACTION(types.REMOVE_FACET_AUTOSUGGEST, FACET_ITEM_AUTOSUGGEST))
    expect(state.facet_query.length).toEqual(0)
  })
})