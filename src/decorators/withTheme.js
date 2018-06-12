import React from 'react'
import { ThemeConsumer } from './../containers/ThemeContext'

/**
 * Access theme variables
 * @param  {Object} WrappedComponent
 * @return {Object}
 */
function withTheme (WrappedComponent) {
  return (props) => (
    <ThemeConsumer>
      {(theme) => <WrappedComponent {...props} theme={theme} />}
    </ThemeConsumer>
  )
}

export default withTheme
