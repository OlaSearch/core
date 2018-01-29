import { compose, combineReducers, applyMiddleware, createStore } from 'redux'
import olaReducer from './../reducers'
import createOlaMiddleware from './../middleware/createOlaMiddleware'
import createPersistMiddleware from './../middleware/createPersistMiddleware'
import thunk from 'redux-thunk'
import types from './../constants/ActionTypes'
import { prepareStoreState } from './prepareStore'
import { addFilter } from './../actions/Search'
import onlineStatusEnhancer from './../enhancer/onlineStatusEnhancer'

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

export default function (
  config,
  searchProvider,
  reducers = {},
  middlewares = [],
  enhancers = []
) {
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
  const { namespace, env, projectId, filters } = config
  const olaMiddleWare = createOlaMiddleware(options)
  const persistMiddleware = createPersistMiddleware({ namespace })

  /* Reducer */
  const olaReducers = combineReducers({ ...olaReducer, ...reducers })

  /* Connection status enhancer */
  const connectionWatcher = onlineStatusEnhancer()

  /* Store */
  var store

  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      olaReducers,
      compose(
        connectionWatcher,
        ...enhancers,
        applyMiddleware(thunk, olaMiddleWare, persistMiddleware, ...middlewares)
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
        connectionWatcher,
        ...enhancers,
        applyMiddleware(
          thunk,
          olaMiddleWare,
          persistMiddleware,
          logger,
          ...middlewares
        )
      )
    )
  }

  const { userSession, searchSession, isNewUser, ...rest } = prepareStoreState({
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

  /**
   * Do we need to add any filters
   */
  if (filters && filters.length) {
    for (let i = 0, len = filters.length; i < len; i++) {
      let { selected } = filters[i]
      store.dispatch(addFilter({ filter: filters[i], selected }))
    }
  }

  return store
}
