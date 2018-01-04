import React from 'react'
import ReactDOM from 'react-dom'
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'
import config from 'olasearchconfig'
import { createLoggerMiddleware } from '@olasearch/logger'
import { AutoComplete, OlaProvider, createStore } from '@olasearch/core'

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })
/* Store */
let store = createStore(config, { Parser, QueryBuilder, Http }, {}, [loggerMiddleware])

export default class Wrapper extends React.Component {
  render() {
    return <OlaProvider config={config} store={store}>{this.props.children}</OlaProvider>
  }
}