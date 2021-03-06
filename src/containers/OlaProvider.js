import React from 'react'
import PropTypes from 'prop-types'
import OlaIntlProvider from './OlaIntlProvider'
import { ThemeProvider } from './ThemeContext'
import { ConfigProvider } from './ConfigContext'
import { DEFAULT_THEME } from './../constants/Settings'
import styles from './../styles'
import { connect } from 'react-redux'
import cx from 'classnames'

/**
 * Ola Provider to wrap any Ola Search Components
 * @param {Object} options.config
 * @param {Object} options.translations
 * @param {Object} options.children
 * @param {Boolean} options.isPhone
 * @param {Boolean} options.isTablet
 * @param {Boolean} options.isDesktop
 * @param {string} options.style
 */
function OlaProvider ({
  config,
  translations,
  children,
  isPhone,
  isTablet,
  isDesktop,
  style
}) {
  if (!config) {
    throw new Error('Could not find config on OlaProvider `props`')
  }
  const theme = { ...DEFAULT_THEME, ...config.theme }
  const classes = cx('ola-search', {
    'ola-search-mobile': isPhone,
    'ola-search-tablet': isTablet,
    'ola-search-desktop': isDesktop
  })
  return (
    <div className={classes} style={style}>
      <ConfigProvider value={config}>
        <OlaIntlProvider translations={translations}>
          <ThemeProvider value={theme}>{children}</ThemeProvider>
        </OlaIntlProvider>
      </ConfigProvider>
      <style jsx>
        {`
          .ola-search {
            font-size: ${theme.defaultFontSize};
          }
          .ola-search :global(.ola-field-title) {
            font-size: ${theme.titleFontSize};
          }
          .ola-search-mobile :global(.ola-field-title) {
            font-size: ${theme.titleFontSizeMobile};
          }
          .ola-search-tablet :global(.ola-field-title) {
            font-size: ${theme.titleFontSizeTablet};
          }

          .ola-search :global(.ola-page),
          .ola-search :global(.ola-page:hover) {
            color: ${theme.secondaryButtonColor};
            background: ${theme.secondaryButtonBackground};
          }
          .ola-search :global(.ola-page-current),
          .ola-search :global(.ola-page-current:hover) {
            background-color: #eee;
          }
          .ola-search :global(.ola-spell-links),
          .ola-search :global(.ola-spell-links:hover),
          .ola-search :global(.ola-link-show-more),
          .ola-search :global(.ola-link-show-more:hover),
          .ola-search :global(.ola-link-change-layout),
          .ola-search :global(.ola-link-change-layout:hover),
          .ola-search :global(.ola-suggestions-clear),
          .ola-search :global(.ola-suggestions-clear:hover),
          .ola-search :global(.ola-btn-directions),
          .ola-search :global(.ola-btn-person),
          .ola-search :global(.ola-btn-phone),
          .ola-search :global(.ola-drop-link),
          .ola-search :global(.ola-btn-sms),
          .ola-search :global(.ola-btn-subtitle),
          .ola-search :global(.ola-link-clear-filters),
          .ola-search :global(.ola-link-view-pages),
          .ola-search :global(.ola-answer-source-link) {
            color: ${theme.primaryColor};
          }
          .ola-search :global(.ola-link-show-more),
          .ola-search :global(.ola-link-show-more:hover) {
            background: none;
          }
          .ola-search :global(.ola-link-change-layout),
          .ola-search :global(.ola-link-change-layout:hover) {
            border: 1px ${theme.primaryColor} solid;
          }
          :global(.ola-link-open-filter),
          :global(.ola-link-open-filter:hover) {
            color: ${theme.primaryColor};
            border: 1px ${theme.primaryColor} solid;
          }

          /* Pill */
          .ola-search :global(.ola-btn-pill) {
            font-size: ${theme.smallFontSize};
          }

          /* Slider */
          .ola-search :global(.noUi-connect) {
            background: ${theme.primaryColor};
          }
          /* Progress bar */
          .ola-search :global(.react-progress-bar-percent) {
            background: ${theme.progressBarBackground};
          }
          .ola-search :global(.ola-btn-link) {
            color: ${theme.searchLinkColor};
          }
          .ola-search :global(.ola-field-title .ola-link) {
            color: ${theme.searchLinkColor};
          }
          .ola-search :global(.ola-field-title .ola-link:hover),
          .ola-search :global(.ola-field-title .ola-link:focus) {
            color: ${theme.searchLinkHoverColor};
          }
          .ola-search :global(.ola-btn-primary),
          .ola-search :global(.ola-cta-button) {
            color: ${theme.primaryButtonColor};
            background: ${theme.primaryButtonBackground};
          }
          .ola-search :global(.ola-btn-share) {
            color: ${theme.shareButtonColor};
            background: ${theme.shareButtonBackground};
          }
          .ola-search :global(.ola-drop-link) {
            background: white;
          }
          .ola-search :global(.ola-drop-link:hover) {
            background: #eee;
          }

          /* Rating */
          .ola-search :global(.ola-rating-active) {
            fill: ${theme.primaryColor};
            color: ${theme.primaryColor};
          }
          /* View all */
          .ola-search :global(.ola-autosuggest-all) {
            background: ${theme.primaryButtonBackground};
            color: ${theme.primaryButtonColor};
          }
          /* Dynamic swipeable hover */
          :global(.ola-swipeable:hover .ola-swipeable-prev),
          :global(.ola-swipeable:hover .ola-swipeable-next) {
            opacity: 1;
            background: white;
            color: ${theme.primaryColor};
          }

          /* Search button */
          :global(.ola-search-button),
          :global(.ola-search-button:hover),
          :global(.ola-search-button:active),
          :global(.ola-search-button:focus) {
            background: ${theme.primaryColor};
            border-color: ${theme.primaryColor};
          }
        `}
      </style>
      <style jsx global>
        {styles}
      </style>
    </div>
  )
}

OlaProvider.propTypes = {
  /**
   * Configuration file
   */
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  /**
   * Language translations
   */
  translations: PropTypes.object,
  /**
   * Component to be rendered
   */
  children: PropTypes.any
}

function mapStateToProps (state) {
  return {
    isPhone: state.Device.isPhone,
    isTablet: state.Device.isTablet,
    isDesktop: state.Device.isDesktop
  }
}

export default connect(mapStateToProps)(OlaProvider)
