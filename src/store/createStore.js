import { compose, combineReducers, applyMiddleware, createStore } from 'redux'
import olaReducer from './../reducers'
import createOlaMiddleware from './../middleware/createOlaMiddleware'
import thunk from 'redux-thunk'
import types from './../constants/ActionTypes'
import utilities from './../utilities'
import storage from './../services/storage'
import { INTENT_SESSION_KEY, INTENT_SESSION_EXPIRY_DAYS } from './../constants/Settings'

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
  if (config.logger && config.logger.enabled) {
    var userId = storage.cookies.get(utilities.getKey(INTENT_SESSION_KEY, config.namespace))
    if (!userId) {
      storage.cookies.set(
        utilities.getKey(INTENT_SESSION_KEY, config.namespace),
        utilities.uuid(),
        INTENT_SESSION_EXPIRY_DAYS
      )
    }
    store.dispatch({
      type: types.SET_INTENT_SESSION_ID,
      userId
    })
  }

  /**
   * Rehydrate store
   */
  store.dispatch({
    type: types.OLA_REHYDRATE,
    namespace: config.namespace
  })

  return store
}
