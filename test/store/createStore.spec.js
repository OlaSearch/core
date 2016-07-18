import expect from 'expect'
import createStore from './../../src/store/createStore'
import { MOCK_SEARCH_ADAPTER } from './../common'
import storage from './../../src/services/storage'
import { BOOKMARKS_STORAGE_KEY } from './../../src/constants/Settings'

describe('createStore', () => {
  it('returns a function', () => {
    expect(typeof createStore).toEqual('function')
  })

  it('throws error if config is not found', () => {
    expect(() => createStore()).toThrow(/Invalid/)
  })

  it('throws error if search adapter is not found', () => {
    expect(() => createStore({})).toThrow(/Invalid/)
  })

  it('throws error if search adapter format is wrong', () => {
    expect(() => createStore({}, {})).toThrow(/Invalid/)
  })

  it('creates store', () => {
    let store = createStore({}, MOCK_SEARCH_ADAPTER)
    expect(store).toExist()
  })

  it('store has default keys', () => {
    let store = createStore({}, MOCK_SEARCH_ADAPTER)
    console.log(store.getState())
    let keys = Object.keys(store.getState())
    expect(keys.length).toEqual(7)
  })

  it('Rehydrates the store', () => {
    storage.set(`ola_${BOOKMARKS_STORAGE_KEY}`, ['hey'])
    let store = createStore({ namespace: 'ola'}, MOCK_SEARCH_ADAPTER)
    expect(store.getState().AppState.bookmarks.length).toEqual(1)
  })
})