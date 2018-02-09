import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import OlaIntlProvider from './OlaIntlProvider'
import { ThemeProvider } from './OlaThemeContext'
import { DEFAULT_THEME } from './../constants/Settings'

export default class OlaProvider extends React.Component {
  static childContextTypes = {
    config: PropTypes.any.isRequired
  }
  constructor (props) {
    super(props)
    let { config, store } = props
    if (!config || !store) {
      throw new Error(
        'Could not find config or store on this.props ' +
          (this.constructor.displayName || '')
      )
    }
  }
  getChildContext () {
    return {
      config: this.props.config
    }
  }
  render () {
    let theme = { ...DEFAULT_THEME, ...this.props.config.theme }
    return (
      <div className='ola-search'>
        <Provider store={this.props.store}>
          <OlaIntlProvider translations={this.props.translations}>
            <ThemeProvider value={theme}>{this.props.children}</ThemeProvider>
          </OlaIntlProvider>
        </Provider>
      </div>
    )
  }
}
