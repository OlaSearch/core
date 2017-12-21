import { compose, combineReducers, applyMiddleware, createStore } from 'redux'
import olaReducer from './../reducers'
import createOlaMiddleware from './../middleware/createOlaMiddleware'
import createPersistMiddleware from './../middleware/createPersistMiddleware'
import thunk from 'redux-thunk'
import types from './../constants/ActionTypes'
import { prepareUserState } from './prepareStore'

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

module.exports = (
  config,
  searchProvider,
  reducers = {},
  middlewares = [],
  enhancers = []
) => {
  if (!config) {
    throw new Error(
      'Invalid: Could not find config while creating store in `createStore`'
    )
  }
  if (!searchProvider) {
    throw new Error(
      'Invalid: Could not find searchProvider while creating store in `createStore`'
    )
  }
  /* Options that should be passed to OlaProvider */
  const { Parser, QueryBuilder, Http } = searchProvider

  if (!Parser || !QueryBuilder || !Http) {
    throw new Error(
      'Invalid: Search adapters must contain Parser, QueryBuilder and Http functions'
    )
  }
  const options = {
    config,
    parser: new Parser(config) /* For olaMiddleware */,
    queryBuilder: new QueryBuilder(config) /* For olaMiddleware */,
    searchService: new Http(config) /* For olaMiddleware */
  }
  const { namespace, env, projectId } = config
  const olaMiddleWare = createOlaMiddleware(options)
  const persistMiddleware = createPersistMiddleware({ namespace })

  /* Reducer */
  const olaReducers = combineReducers({ ...olaReducer, ...reducers })

  /* Store */
  var store

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      olaReducers,
      compose(
        applyMiddleware(
          thunk,
          olaMiddleWare,
          persistMiddleware,
          ...middlewares
        ),
        ...enhancers
      )
    )
  } else {
    const { createLogger } = require('redux-logger')
    const logger = createLogger({
      collapsed: true,
      duration: true
    })
    store = createStore(
      olaReducers,
      compose(
        applyMiddleware(
          thunk,
          olaMiddleWare,
          persistMiddleware,
          logger,
          ...middlewares
        ),
        ...enhancers
      )
    )
  }

  const { userSession, searchSession, isNewUser, ...rest } = prepareUserState({
    config
  })
  /**
   * Rehydrate store
   */
  store.dispatch({
    type: types.OLA_REHYDRATE,
    namespace,
    isNewUser,
    projectId,
    searchSession,
    userSession,
    env,
    ...rest
  })

  return store
}
