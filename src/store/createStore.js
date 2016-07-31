import { compose, combineReducers, applyMiddleware, createStore } from 'redux'
import olaReducer from './../reducers'
import createOlaMiddleware from './../middleware/createOlaMiddleware'
import thunk from 'redux-thunk'
import types from './../constants/ActionTypes'

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
  let { Parser, QueryBuilder, Http } = searchProvider

  if (!Parser || !QueryBuilder || !Http) {
    throw new Error('Invalid: Search adapters must contain Parser, QueryBuilder and Http prototypes')
  }
  let options = {
    config,
    parser: new Parser(config), /* For olaMiddleware */
    queryBuilder: new QueryBuilder(config), /* For olaMiddleware */
    searchService: new Http(config) /* For olaMiddleware */
  }
  let olaMiddleWare = createOlaMiddleware(options)

  /* Reducer */
  let olaReducers = combineReducers(Object.assign({}, olaReducer, reducers))
  let store

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      olaReducers,
      compose(
        applyMiddleware(thunk, olaMiddleWare, ...middlewares),
        ...enhancers
      )
    )
  } else {
    var createLogger = require('redux-logger')
    const logger = createLogger({
      collapsed: true,
      duration: true
    })
    store = createStore(
      olaReducers,
      compose(
        applyMiddleware(thunk, olaMiddleWare, logger, ...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
        ...enhancers
      )
    )
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
