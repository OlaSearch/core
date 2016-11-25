import { compose, combineReducers, applyMiddleware, createStore } from 'redux'
import olaReducer from './../reducers'
import createOlaMiddleware from './../middleware/createOlaMiddleware'
import thunk from 'redux-thunk'
import types from './../constants/ActionTypes'
import { getKey, uuid } from './../utilities'
import storage from './../services/storage'
import { USER_SESSION_KEY, USER_SESSION_EXPIRY_DAYS } from './../constants/Settings'

/**
 * Signature
 * createStore(
 *   config,
 *   searchProvider,
 *   reducers,
 *   middlewares,
 *   Store enhancers
 * )
 */

module.exports = (config, searchProvider, reducers = {}, middlewares = [], enhancers = []) => {
  if (!config) {
    throw new Error('Invalid: Could not find config while creating store in `createStore`')
  }
  if (!searchProvider) {
    throw new Error('Invalid: Could not find searchProvider while creating store in `createStore`')
  }
  /* Options that should be passed to OlaProvider */
  const { Parser, QueryBuilder, Http } = searchProvider

  if (!Parser || !QueryBuilder || !Http) {
    throw new Error('Invalid: Search adapters must contain Parser, QueryBuilder and Http functions')
  }
  const options = {
    config,
    parser: new Parser(config), /* For olaMiddleware */
    queryBuilder: new QueryBuilder(config), /* For olaMiddleware */
    searchService: new Http(config) /* For olaMiddleware */
  }
  const olaMiddleWare = createOlaMiddleware(options)

  /* Reducer */
  const olaReducers = combineReducers(Object.assign({}, olaReducer, reducers))

  /* Store */
  var store

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      olaReducers,
      compose(
        applyMiddleware(thunk, olaMiddleWare, ...middlewares),
        ...enhancers
      )
    )
  } else {
    const createLogger = require('redux-logger')
    const logger = createLogger({
      collapsed: true,
      duration: true
    })
    store = createStore(
      olaReducers,
      compose(
        applyMiddleware(thunk, olaMiddleWare, logger, ...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f,
        ...enhancers
      )
    )
  }

  /* Create user cookie */
  var userSession = storage.cookies.get(getKey(USER_SESSION_KEY, config.namespace))
  var isNewUser = false
  if (!userSession) {
    isNewUser = true
    userSession = uuid()
    storage.cookies.set(
      getKey(USER_SESSION_KEY, config.namespace),
      userSession,
      USER_SESSION_EXPIRY_DAYS
    )
  }
  /* Set user session */
  store.dispatch({
    type: types.SET_USER_SESSION,
    userSession,
    isNewUser
  })

  /**
   * Rehydrate store
   */
  store.dispatch({
    type: types.OLA_REHYDRATE,
    namespace: config.namespace
  })

  return store
}
