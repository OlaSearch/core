import types from './../../src/constants/ActionTypes'
import { default as reducer, initialState } from './../../src/reducers/Intl'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY } from './../../src/constants/Settings'
import expect from 'expect'
import { MAKE_ACTION, INIT_TYPE } from './../common'

describe('Reducer: Intl', () => {
  it('should exist', () => {
    expect(reducer).toExist()
  })

  it('default locale should be en', () => {
    expect(reducer(initialState, {})).toEqual({ locale: 'en'})
  })

  it('change locale', () => {
    expect(reducer(initialState, MAKE_ACTION(types.SET_LOCALE, { locale: 'zh'}))).toEqual({ locale: 'zh'})
  })

})