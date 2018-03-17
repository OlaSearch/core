import React from 'react'
import ReactDOM from 'react-dom'
import store from './styleguide.store'
import config from 'olasearchconfig'
import { Provider } from 'react-redux'
import { OlaProvider } from '@olasearch/core'

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