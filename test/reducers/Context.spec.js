import types from './../../src/constants/ActionTypes'
import { default as reducer, initialState } from './../../src/reducers/Context'
import { CONTEXT_STORAGE_KEY } from './../../src/constants/Settings'
import expect from 'expect'
import storage from './../../src/services/storage'
import { MAKE_ACTION, INIT_TYPE, decodeCookie } from './../common'

describe('Reducer: Context', () => {
  it('should exist', () => {
    expect(reducer).toExist()
    expect(() => reducer(initialState)).toThrow(/undefined/)
  })

  it('should get initial value from cookies', () => {
    var initialStateFromCookie
    storage.cookies.set(CONTEXT_STORAGE_KEY, {
      location: '1, 2'
    })
    var valueFromStorage = decodeCookie(storage.cookies.get(CONTEXT_STORAGE_KEY))
    initialStateFromCookie = {
      location: null,
      fields: [],
      isRequestingLocation: false,
      hasRequestedLocation: false,
      ...valueFromStorage ? valueFromStorage : {}
    }

    let state = reducer(initialStateFromCookie, {})
    expect(state.location).toEqual('1, 2')
  })

  it('sets flags when requestion geo location', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_GEO_LOCATION))
    expect(state.isRequestingLocation).toEqual(true)
  })

  it('resets flags after requestion geo location', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REQUEST_GEO_LOCATION_SUCCESS, {
      payload: {
        coords: {
          latitude: '2',
          longitude: '1'
        }
      }
    }))
    expect(state.isRequestingLocation).toEqual(false)
    expect(state.location).toEqual('2,1')

    state = reducer(state, MAKE_ACTION(types.REQUEST_GEO_LOCATION_FAILURE))
    expect(state.isRequestingLocation).toEqual(false)
    expect(state.location).toEqual(null)
  })

  it('can add context', () => {
    let state = reducer(initialState, MAKE_ACTION(types.ADD_CONTEXT_FIELD))
    expect(state).toEqual(initialState)

    state = reducer(initialState, MAKE_ACTION(types.ADD_CONTEXT_FIELD, {
      value: '1, 2',
      field: 'location'
    }))
    expect(state.location).toEqual('1, 2')
  })

  it('can remove context', () => {
    let state = reducer(initialState, MAKE_ACTION(types.REMOVE_CONTEXT_FIELD, {
      field: 'location'
    }))
    expect(state.location).toEqual(null)

    state = reducer(initialState, MAKE_ACTION(types.REMOVE_CONTEXT_FIELD))
    expect(state).toEqual(initialState)
  })

  /*
  Phased out field
  it('can add dynamic field', () => {
    let state = reducer(initialState, MAKE_ACTION(types.ADD_DYNAMIC_FIELD, {
      name: 'field_name',
      value: 'field_value',
      filename: 'script_filename'
    }))
    expect(state.fields.length).toEqual(1)
    expect(state.fields[0].name).toEqual('field_name')
    expect(state.fields[0].value).toEqual('field_value')
    expect(state.fields[0].filename).toEqual('script_filename')
  })
  */

  it('can remove dynamic field', () => {
    let state = reducer(initialState, MAKE_ACTION(types.ADD_DYNAMIC_FIELD, {
      name: 'field_name',
      value: 'field_value',
      filename: 'script_filename'
    }))
    state = reducer(state, MAKE_ACTION(types.REMOVE_DYNAMIC_FIELD, {
      name: 'field_name',
    }))
    expect(state.fields.length).toEqual(0)
  })

})