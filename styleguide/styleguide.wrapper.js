import React from 'react'
import ReactDOM from 'react-dom'
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'
import config from 'olasearchconfig'
import { createLoggerMiddleware } from '@olasearch/logger'
import { Provider } from 'react-redux'
import { AutoComplete, OlaProvider, createStore } from '@olasearch/core'

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })
/* Store */
let store = createStore(config, { Parser, QueryBuilder, Http }, {}, [loggerMiddleware])

export default class Wrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <OlaProvider config={config}>
          {this.props.children}
        </OlaProvider>
      </Provider>
    )
  }
}