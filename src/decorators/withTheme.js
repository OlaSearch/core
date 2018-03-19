import React from 'react'
import { ThemeConsumer } from './../containers/ThemeContext'

function withTheme (WrappedComponent) {
  return (props) => (
    <ThemeConsumer>
      {(theme) => <WrappedComponent theme={theme} {...props} />}
    </ThemeConsumer>
  )
}

export default withTheme