import React from 'react'
import { Provider } from 'react-redux'
import OlaIntlProvider from './OlaIntlProvider'
import types from './../constants/ActionTypes'

class OlaProvider extends React.Component {
  static childContextTypes = {
    config: React.PropTypes.any.isRequired
  };
  constructor (props) {
    super(props)
    let { config, store } = props
    let { namespace } = config
    if (!config || !store) {
      let namePart = this.constructor.displayName ? ' of ' + this.constructor.displayName : ''
      throw new Error('Could not find config or store on this.props ' + namePart)
    }
    /**
     * Rehydrate store from storage if namespace is present
     * @param  {[type]} namespace
     */
    if (namespace) {
      store.dispatch({
        type: types.OLA_REHYDRATE,
        namespace
      })
    }
  }
  getChildContext () {
    return {
      config: this.props.config
    }
  }
  render () {
    return (
      <div className='ola-search'>
        <Provider store={this.props.store}>
          <OlaIntlProvider translations={this.props.translations}>
            {this.props.children}
          </OlaIntlProvider>
        </Provider>
      </div>
    )
  }
}

module.exports = OlaProvider
