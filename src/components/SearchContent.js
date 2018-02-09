import React from 'react'
import { ThemeConsumer } from './../containers/OlaThemeContext'

function SearchContent ({ children }) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <div className='ola-results-container'>
          {children}
          <style jsx>
            {`
              .ola-results-container :global(.ola-link-load-more) {
                background: ${theme.primaryButtonBackground};
                color: ${theme.primaryButtonColor};
              }
            `}
          </style>
        </div>
      )}
    </ThemeConsumer>
  )
}

module.exports = SearchContent
