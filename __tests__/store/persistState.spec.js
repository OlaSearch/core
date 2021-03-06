import expect from 'expect'
import * as storage from './../../src/services/storage'
import { STATE_TYPE_KEYS, debouncePersistState } from './../../src/store/persistState'
import { LOCALE_STORAGE_KEY, CONTEXT_STORAGE_KEY, OLA_STORAGE_KEY } from './../../src/constants/Settings'
import types from './../../src/constants/ActionTypes'

describe('persistState', () => {
  it('should export STATE_TYPE_KEYS', () => {
    expect(STATE_TYPE_KEYS).not.toBe(null)
    expect(Array.isArray(STATE_TYPE_KEYS)).toBe(true)
  })

  it('should export debouncePersistState', () => {
    expect(debouncePersistState).toBeDefined()
  })

  describe('Bookmarks and history', () => {
    var getState
    var namespace = 'ola_test'
    beforeEach(() => {
      getState = () => {
        return {
          AppState: {
            bookmarks: ['hello'],
            history: ['world']
          }
        }
      }
    })
    it('should add bookmarks', (done) => {
      debouncePersistState({type: types.ADD_BOOKMARK }, getState, namespace)
      debouncePersistState({type: types.ADD_BOOKMARK }, getState, namespace)
      setTimeout(() => {
        expect(storage.get(OLA_STORAGE_KEY, namespace).bookmarks).toEqual(['hello'])
        done()
      }, 510)
    })

    it('should remove bookmarks', (done) => {
      debouncePersistState({type: types.REMOVE_BOOKMARK }, getState, namespace)
      debouncePersistState({type: types.REMOVE_BOOKMARK }, getState, namespace)
      setTimeout(() => {
        expect(storage.get(OLA_STORAGE_KEY, namespace).bookmarks).toEqual(['hello'])
        done()
      }, 510)
    })

    it('should add history', (done) => {
      debouncePersistState({type: types.ADD_HISTORY }, getState, namespace)
      setTimeout(() => {
        expect(storage.get(OLA_STORAGE_KEY, namespace).history).toEqual(['world'])
        done()
      }, 510)
    })

    it('should clear history', (done) => {
      debouncePersistState({type: types.CLEAR_HISTORY }, getState, namespace)
      setTimeout(() => {
        expect(storage.get(OLA_STORAGE_KEY, namespace).history).toEqual(['world'])
        done()
      }, 510)
    })
  })

  describe('Locale', () => {
    var locale = 'en'
    var getState
    beforeEach(() => {
      getState = () => {
        return {
          Intl: {
            locale: 'en'
          }
        }
      }
    })
    it('should set locale in cookie', (done) => {
      debouncePersistState({type: types.SET_LOCALE, locale }, getState)
      setTimeout(() => {
        expect(storage.cookies.get(LOCALE_STORAGE_KEY)).toEqual('en')
        done()
      }, 510)
    })
  })


  describe('Context', () => {
    var getState
    beforeEach(() => {
      getState = () => {
        return {
          Context: {
            location: null,
            fields: [],
            isRequestingLocation: false,
            hasRequestedLocation: false
          }
        }
      }
    })
    it('should save Geo Location status', (done) => {
      debouncePersistState({ type: types.REQUEST_GEO_LOCATION_SUCCESS }, getState)
      setTimeout(() => {
        expect(decodeURIComponent(storage.cookies.get(CONTEXT_STORAGE_KEY))).toEqual('{"location":null,"fields":[],"isRequestingLocation":false,"hasRequestedLocation":false}')
        done()
      }, 510)
    })
  })
})