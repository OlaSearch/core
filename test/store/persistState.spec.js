import expect from 'expect'
import storage from './../../src/services/storage'
import { STATE_TYPE_KEYS, debouncePersistState } from './../../src/store/persistState'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY, LOCALE_STORAGE_KEY, CONTEXT_STORAGE_KEY } from './../../src/constants/Settings'
import types from './../../src/constants/ActionTypes'

describe('persistState', () => {
  it('should export STATE_TYPE_KEYS', () => {
    expect(STATE_TYPE_KEYS).toNotBe(null)
    expect(Array.isArray(STATE_TYPE_KEYS)).toBe(true)
  })

  it('should export debouncePersistState', () => {
    expect(debouncePersistState).toExist()
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
        expect(storage.get(BOOKMARKS_STORAGE_KEY, namespace)).toEqual(['hello'])
        done()
      }, 510)
    })

    it('should remove bookmarks', (done) => {
      debouncePersistState({type: types.REMOVE_BOOKMARK }, getState, namespace)
      debouncePersistState({type: types.REMOVE_BOOKMARK }, getState, namespace)
      setTimeout(() => {
        expect(storage.get(BOOKMARKS_STORAGE_KEY, namespace)).toEqual(['hello'])
        done()
      }, 510)
    })

    it('should add history', (done) => {
      debouncePersistState({type: types.ADD_HISTORY }, getState, namespace)
      setTimeout(() => {
        expect(storage.get(HISTORY_STORAGE_KEY, namespace)).toEqual(['world'])
        done()
      }, 510)
    })

    it('should clear history', (done) => {
      debouncePersistState({type: types.CLEAR_HISTORY }, getState, namespace)
      setTimeout(() => {
        expect(storage.get(HISTORY_STORAGE_KEY, namespace)).toEqual(['world'])
        done()
      }, 510)
    })
  })

  describe('Locale', () => {
    var locale = 'en'
    it('should set locale in cookie', (done) => {
      debouncePersistState({type: types.SET_LOCALE, locale }, () => {})
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