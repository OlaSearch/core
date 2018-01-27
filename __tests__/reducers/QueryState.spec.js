import types from './../../src/constants/ActionTypes'
import { default as reducer, initialState } from './../../src/reducers/QueryState'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY, SEARCH_INPUTS } from './../../src/constants/Settings'
import expect from 'expect'
import { MAKE_ACTION, MAKE_FILTER_ITEM } from './../common'

const SELECTED_VALUE = 'doc'
describe('Reducer: QueryState', () => {
  it('should exist', () => {
    expect(reducer).toExist()
  })

  it('should return initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  it('should add, remove and clear filters', () => {
    let state = reducer(initialState, MAKE_ACTION(types.ADD_FILTER, { filter: MAKE_FILTER_ITEM('document'), selected: SELECTED_VALUE }))
    expect(state.filters.length).toEqual(1)
    expect(state.filters[0]['name']).toEqual('document')
    expect(state.filters[0]['selected']).toEqual(SELECTED_VALUE)

    /* Adding multiple filters */
    let multiState = reducer(state, MAKE_ACTION(types.ADD_FILTER, { filter: MAKE_FILTER_ITEM('document'), selected: SELECTED_VALUE }))
    expect(multiState.filters.length).toEqual(1)

    /* Adding new filter */
    let newState = reducer(state, MAKE_ACTION(types.ADD_FILTER, { filter: MAKE_FILTER_ITEM('document2'), selected: SELECTED_VALUE }))
    expect(newState.filters.length).toEqual(2)

    /* Adding additional filters */
    let anotherState = reducer(newState, MAKE_ACTION(types.ADD_FILTER, { filter: MAKE_FILTER_ITEM('document2'), selected: SELECTED_VALUE }))
    expect(anotherState.filters.length).toEqual(2)

    /* Remove filter */
    let removedState = reducer(anotherState, MAKE_ACTION(types.REMOVE_FILTER, {name:'document'}))
    expect(removedState.filters.length).toEqual(1)

    /* clear filters */
    let clearedState = reducer(anotherState, MAKE_ACTION(types.CLEAR_FILTERS))
    expect(clearedState.filters.length).toEqual(0)
  })

  it('should add, remove and clear facets', () => {
    let state = reducer(initialState, MAKE_ACTION(types.ADD_FACET, { facet: MAKE_FILTER_ITEM('document'), value: SELECTED_VALUE }))
    expect(state.facet_query.length).toEqual(1)
    expect(state.facet_query[0]['name']).toEqual('document')
    expect(state.facet_query[0]['selected']).toEqual(SELECTED_VALUE)

    /* Adding multiple filters */
    let multiState = reducer(state, MAKE_ACTION(types.ADD_FACET, { facet: MAKE_FILTER_ITEM('document'), value: SELECTED_VALUE }))
    expect(multiState.facet_query.length).toEqual(1)

    /* Adding new filter */
    let newState = reducer(state, MAKE_ACTION(types.ADD_FACET, { facet: MAKE_FILTER_ITEM('document2'), value: SELECTED_VALUE }))
    expect(newState.facet_query.length).toEqual(2)

    /* Adding additional filters */
    let anotherState = reducer(newState, MAKE_ACTION(types.ADD_FACET, { facet: MAKE_FILTER_ITEM('document2'), value: SELECTED_VALUE }))
    expect(anotherState.facet_query.length).toEqual(2)

    /* Remove filter */
    let removedState = reducer(anotherState, MAKE_ACTION(types.REMOVE_FACET, {
      facet: {
        name:'document'
      },
      value: 'doc'
    }))
    expect(removedState.facet_query.length).toEqual(1)

    /* Replace facet (exists) */

    let replacedState = reducer(anotherState, MAKE_ACTION(types.REPLACE_FACET, {
      facet: {
        name: 'document2'
      },
      value: 'random'
    }))
    expect(replacedState.facet_query.length).toEqual(2)
    expect(replacedState.facet_query[1].selected).toEqual(['random'])

    /* Replace facet (do not exists) */

    let replacedStateExists = reducer(removedState, MAKE_ACTION(types.REPLACE_FACET, {
      facet: {
        name: 'document3'
      },
      value: 'random3'
    }))
    expect(replacedStateExists.facet_query.length).toEqual(2)
    expect(replacedStateExists.facet_query[1].selected).toEqual(['random3'])

    /* clear filters */
    let clearedState = reducer(anotherState, MAKE_ACTION(types.REMOVE_ALL_FACETS))
    expect(clearedState.facet_query.length).toEqual(0)
  })

  it('can update state from url query paramaters', () => {
    let state = reducer(initialState, MAKE_ACTION(types.UPDATE_STATE_FROM_QUERY, {
      stateFromUrl: {
        q: 'hello',
        facets: [MAKE_FILTER_ITEM('document')]
      }
    }))
    expect(state.q).toEqual('hello')
    expect(state.facets.length).toBe(1)
    expect(state.facets[0].selected).toEqual(['doc'])
    expect(state.searchInput).toBe(SEARCH_INPUTS.URL)
  })

  it('can update query term', () => {
    let state = reducer(initialState, MAKE_ACTION(types.UPDATE_QUERY_TERM, { term: 'hello'}))
    expect(state.q).toEqual('hello')
    expect(state.searchInput).toBe(SEARCH_INPUTS.KEYBOARD)

    state = reducer(state, MAKE_ACTION(types.UPDATE_QUERY_TERM, { term: 'hello2', searchInput: 'voice'}))
    expect(state.q).toEqual('hello2')
    expect(state.searchInput).toBe(SEARCH_INPUTS.VOICE)
  })

  it('can clear query term', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CLEAR_QUERY_TERM))
    expect(state.q).toEqual('')
  })

  it('can change sort option', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CHANGE_SORT, { sort: 'title asc'}))
    expect(state.sort).toEqual('title asc')

    state = reducer(state, MAKE_ACTION(types.CHANGE_SORT, { sort: ''}))
    expect(state.sort).toEqual('')
  })

  it('can change page number', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CHANGE_PAGE, { page: 2 }))
    expect(state.page).toEqual(2)
  })

  it('can change per page', () => {
    let state = reducer(initialState, MAKE_ACTION(types.CHANGE_PER_PAGE, { perPage: 20}))
    expect(state.per_page).toEqual(20)
  })

  it('can change search status', () => {
    let state = reducer(initialState, MAKE_ACTION(types.SET_SEARCH_STATUS, { status: false }))
    expect(state.isSearchActive).toEqual(false)
  })

})