import types from './../constants/ActionTypes'
import { isBrowser } from './../constants/Settings'

export default function () {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    if (!isBrowser) return store
    /**
     * Observe online and offline events
     */
    window.addEventListener('online', (event) => {
      store.dispatch({ type: types.UPDATE_CONNECTION, status: event.type })
    })
    window.addEventListener('offline', (event) => {
      store.dispatch({ type: types.UPDATE_CONNECTION, status: event.type })
    })
    return store
  }
}
