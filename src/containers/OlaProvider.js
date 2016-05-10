import React from 'react'
import { Provider } from 'react-redux'
import OlaIntlProvider from './OlaIntlProvider'

class OlaProvider extends React.Component {
  static childContextTypes = {
    config: React.PropTypes.any.isRequired
  };

  constructor (props) {
    super(props)

    var { config, store } = props

    if (!config || !store) {
      var namePart = this.constructor.displayName ? ' of ' + this.constructor.displayName : ''
      throw new Error('Could not find config or store on this.props ' + namePart)
    }
  }

  getChildContext () {
    let { config, store } = this.props
    return {
      config: typeof config === 'function' ? config()(store.getState) : config
    }
  }

  render () {
    var { translations, children, lang, store } = this.props

    return (
      <div className='ola-search'>
        <Provider store={store}>
          <OlaIntlProvider translations={translations} lang={lang}>
            {children}
          </OlaIntlProvider>
        </Provider>
      </div>
    )
  }
}

module.exports = OlaProvider
