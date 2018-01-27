import expect from 'expect'
import createStore from './../../src/store/createStore'
import { MOCK_SEARCH_ADAPTER } from './../common'
import storage from './../../src/services/storage'
import { OLA_STORAGE_KEY } from './../../src/constants/Settings'

const NAMESPACE = 'ola'
describe('createStore', () => {
  it('returns a function', () => {
    expect(typeof createStore).toEqual('function')
  })

  it('throws error if config is not found', () => {
    expect(() => createStore()).toThrow(/Invalid/)
  })

  it('throws error if search adapter is not found', () => {
    expect(() => createStore({ namespace: NAMESPACE })).toThrow(/Invalid/)
  })

  it('throws error if search adapter format is wrong', () => {
    expect(() => createStore({ namespace: NAMESPACE }, {})).toThrow(/Invalid/)
  })

  it('creates store', () => {
    let store = createStore({ namespace: NAMESPACE }, MOCK_SEARCH_ADAPTER)
    expect(store).toBeDefined()
  })

  it('store has default keys', () => {
    let store = createStore({ namespace: NAMESPACE }, MOCK_SEARCH_ADAPTER)
    console.log(store.getState())
    let keys = Object.keys(store.getState())
    expect(keys.length).toEqual(7)
  })

  it('Rehydrates the store', () => {
    /* Key_Namespace */
    storage.set(`${OLA_STORAGE_KEY}`, { bookmarks: ['hey'], history: [] }, NAMESPACE)
    let store = createStore({ namespace: NAMESPACE }, MOCK_SEARCH_ADAPTER)
    expect(store.getState().AppState.bookmarks.length).toEqual(1)
    expect(store.getState().AppState.history.length).toEqual(0)
  })
})