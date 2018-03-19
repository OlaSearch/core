import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'
import config from './styleguide.olaconfig'
import { createLoggerMiddleware } from '@olasearch/logger'
import { Provider } from 'react-redux'
import { AutoComplete, OlaProvider, createStore, Actions } from '@olasearch/core'

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })
/* Store */
let store = createStore(config, { Parser, QueryBuilder, Http }, {}, [loggerMiddleware])

/* Initialize search */
store.dispatch(Actions.Search.initSearch({ config, urlSync: false }))

module.exports = store