import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import OlaIntlProvider from './OlaIntlProvider'
import { ThemeProvider } from './ThemeContext'
import { ConfigProvider } from './ConfigContext'
import { DEFAULT_THEME } from './../constants/Settings'

export default function OlaProvider ({ config, translations, children }) {
  if (!config) {
    throw new Error('Could not find config on `props` OlaProvider')
  }
  let theme = { ...DEFAULT_THEME, ...config.theme }
  return (
    <div className='ola-search'>
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
            padding-bottom: ;
          }
          .ola-search
            :global(.ola-field-date, .ola-field-person, .ola-field-distance, .ola-btn-directions, .ola-answer-slots, .ola-location-notify, .ola-field-component-label, .ola-field-phone, .ola-field-sms, .ola-field-subtitles, .ola-field-pages) {
            font-size: ${theme.mediumFontSize};
          }
          .ola-search :global(.ola-page, .ola-page:hover) {
            color: ${theme.secondaryButtonColor};
            background: ${theme.secondaryButtonBackground};
            border: 1px ${theme.borderColor} solid;
          }
          .ola-search :global(.ola-page-current, .ola-page-current:hover) {
            background-color: #eee;
          }
          .ola-search
            :global(.ola-spell-links, .ola-spell-links:hover, .ola-link-show-more, .ola-link-show-more:hover, .ola-link-change-layout, .ola-link-change-layout:hover, .ola-link-open-filter, .ola-link-open-filter:hover, .ola-suggestions-clear, .ola-suggestions-clear:hover, .ola-btn-close
              /* Help close button */, .ola-btn-directions, .ola-btn-person, .ola-btn-phone, .ola-drop-link, .ola-btn-sms, .ola-btn-subtitle, .ola-link-view-pages) {
            color: ${theme.primaryColor};
          }
          .ola-search :global(.ola-link-show-more, .ola-link-show-more:hover) {
            background: none;
          }
          .ola-search
            :global(.ola-link-change-layout, .ola-link-change-layout:hover) {
            border: 1px ${theme.primaryColor} solid;
          }
          .ola-search
            :global(.ola-link-open-filter, .ola-link-open-filter:hover) {
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
          .ola-search :global(.ola-field-title a) {
            color: ${theme.searchLinkColor};
          }
          .ola-search
            :global(.ola-field-title a:hover, .ola-field-title a:focus) {
            color: ${theme.searchLinkHoverColor};
          }
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
          .ola-search :global(.ola-field-img) {
            max-height: ${theme.snippetImageMaxHeight};
          }

          /* Rating */
          .ola-search :global(.ola-rating-active) {
            fill: ${theme.primaryColor};
            color: ${theme.primaryColor};
          }
        `}
      </style>
    </div>
  )
}
