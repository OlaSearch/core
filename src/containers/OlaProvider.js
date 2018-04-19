import React from 'react'
import PropTypes from 'prop-types'
import OlaIntlProvider from './OlaIntlProvider'
import { ThemeProvider } from './ThemeContext'
import { ConfigProvider } from './ConfigContext'
import { DEFAULT_THEME } from './../constants/Settings'

/**
 * Ola Provider wrapper for all Ola Components
 */
export default function OlaProvider ({ config, translations, children }) {
  if (!config) {
    throw new Error('Could not find config on OlaProvider `props`')
  }
  const theme = { ...DEFAULT_THEME, ...config.theme }
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
          }
          .ola-search :global(.ola-field-date),
          .ola-search :global(.ola-field-person),
          .ola-search :global(.ola-field-distance),
          .ola-search :global(.ola-btn-directions),
          .ola-search :global(.ola-answer-slots),
          .ola-search :global(.ola-location-notify),
          .ola-search :global(.ola-field-component-label),
          .ola-search :global(.ola-field-phone),
          .ola-search :global(.ola-field-sms),
          .ola-search :global(.ola-field-subtitles),
          .ola-search :global(.ola-link-geo),
          .ola-search :global(.ola-autosuggest-all),
          .ola-search :global(.ola-link-clear-filters),
          .ola-search :global(.ola-field-pages) {
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
          .ola-search :global(.ola-spell-links:hover),
          .ola-search :global(.ola-link-show-more),
          .ola-search :global(.ola-link-show-more:hover),
          .ola-search :global(.ola-link-change-layout),
          .ola-search :global(.ola-link-change-layout:hover),
          .ola-search :global(.ola-link-open-filter),
          .ola-search :global(.ola-link-open-filter:hover),
          .ola-search :global(.ola-suggestions-clear),
          .ola-search :global(.ola-suggestions-clear:hover),
          .ola-search :global(.ola-btn-close),
          .ola-search :global(.ola-btn-directions),
          .ola-search :global(.ola-btn-person),
          .ola-search :global(.ola-btn-phone),
          .ola-search :global(.ola-drop-link),
          .ola-search :global(.ola-btn-sms),
          .ola-search :global(.ola-btn-subtitle),
          .ola-search :global(.ola-link-clear-filters),
          .ola-search :global(.ola-link-view-pages) {
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
          .ola-search :global(.ola-link-open-filter),
          .ola-search :global(.ola-link-open-filter:hover) {
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
          /* Progress bar */
          .ola-search :global(.react-progress-bar-percent) {
            background: ${theme.progressBarBackground};
          }
          .ola-search :global(.ola-field-title a) {
            color: ${theme.searchLinkColor};
          }
          .ola-search :global(.ola-field-title a:hover),
          .ola-search :global(.ola-field-title a:focus) {
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
        `}
      </style>
      <style jsx>
        {`
          /**
           * Modal can be inserted from an iframe.  (for chatbot only projects)
           */
          :global(.ola-modal-close) {
            border: none;
            padding: 0;
            margin: 0;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
            top: 16px;
            right: 16px;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            cursor: pointer;
            box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
            background: white;
            color: black;
          }
          /* Overlay */
          :global(.ola-modal-overlay) {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            transition: all 0.1s ease-in;
            animation: fadeIn 0.2s linear;
            visibility: visible;
            opacity: 1;
          }
          :global(.ola-modal-overlay img) {
            max-width: 100%;
            vertical-align: top;
            max-height: calc(100vh - 152px);
            min-width: auto;
          }
          /* Body */
          :global(.ola-modal-body) {
            padding: 76px 0;
          }
          /* Image */
          :global(.ola-modal-content-image) {
            text-align: center;
            display: inline-block;
            margin: 76px 0;
            box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3); /* Sharp box shadow */
          }

          /* Inline content */
          :global(.ola-modal-inline) {
            text-align: center;
          }
          :global(.ola-modal-inline .ola-modal-content) {
            display: inline;
          }
        `}
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
