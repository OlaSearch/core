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
 * Create Ola Redux Store
 * @param  {Object} config Project configuration file
 * @param  {Object} searchProvider Solr or Elastic Search provider { Parser, QueryBuilder, Http }
 * @param  {Object} searchProvider.Parser
 * @param  {Object} searchProvider.QueryBuilder
 * @param  {Object} searchProvider.Http
 * @param  {Object} reducers Redux reducers
 * @param  {Array}  middlewares Redux store middlewares
 * @param  {Array}  enhancers Redux store enhancers
 * @return {object}
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
    config,
    device: store.getState().Device
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
   * The config file will contain filters that needs to be added to exclude or include certain documents.
   * There are the initial set of filters which will persist across all search activity
   */
  if (filters && filters.length) {
    for (let i = 0, len = filters.length; i < len; i++) {
      const { selected } = filters[i]
      store.dispatch(addFilter({ filter: filters[i], selected }))
    }
  }

  return store
}
