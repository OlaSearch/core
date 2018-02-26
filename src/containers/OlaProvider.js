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
        <style jsx>
          {`
            .ola-search {
              font-size: ${theme.defaultFontSize};
            }
            .ola-search :global(.ola-field-title) {
              font-size: ${theme.titleFontSize};
              padding-bottom: ;
            }
            .ola-search
              :global(.ola-field-date, .ola-field-person, .ola-field-distance, .ola-btn-directions, .ola-answer-slots, .ola-location-notify, .ola-field-component-label) {
              font-size: ${theme.mediumFontSize};
            }
            .ola-search :global(.ola-page),
            .ola-search :global(.ola-page:hover) {
              color: ${theme.secondaryButtonColor};
              background: ${theme.secondaryButtonBackground};
              border: 1px ${theme.borderColor} solid;
            }
            .ola-search :global(.ola-page-current),
            .ola-search :global(.ola-page-current:hover) {
              background-color: #eee;
            }
            .ola-search :global(.ola-spell-links),
            .ola-search :global(.ola-spell-links:hover) {
              color: ${theme.primaryColor};
            }
            .ola-search :global(.ola-link-show-more),
            .ola-search :global(.ola-link-show-more:hover) {
              color: ${theme.primaryColor};
              background: none;
            }
            .ola-search :global(.ola-link-change-layout),
            .ola-search :global(.ola-link-change-layout:hover) {
              color: ${theme.primaryColor};
              border: 1px ${theme.primaryColor} solid;
            }
            .ola-search :global(.ola-link-open-filter),
            .ola-search :global(.ola-link-open-filter:hover) {
              color: ${theme.primaryColor};
              border: 1px ${theme.primaryColor} solid;
            }
            .ola-search :global(.ola-suggestions-clear),
            .ola-search :global(.ola-suggestions-clear:hover) {
              color: ${theme.primaryColor};
            }

            /* Pill */
            .ola-search :global(.ola-btn-pill) {
              font-size: ${theme.smallFontSize};
            }

            /* Slider */
            .ola-search :global(.noUi-connect) {
              background: ${theme.primaryColor};
            }
            /* Help close button */
            .ola-search :global(.ola-btn-close) {
              color: ${theme.primaryColor};
            }
            /* Load more */
            .ola-search :global(.ola-link-load-more) {
              background: ${theme.primaryButtonBackground};
              color: ${theme.primaryButtonColor};
              font-size: ${theme.mediumFontSize};
            }
            /* Progress bar */
            .ola-search :global(.react-progress-bar-percent) {
              background: ${theme.progressBarBackground};
            }
          `}
        </style>
      </div>
    )
  }
}
