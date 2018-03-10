import React from 'react'
import createReactContext from 'create-react-context'

const ThemeContext = createReactContext({})
const ThemeProvider = ThemeContext.Provider
const ThemeConsumer = ThemeContext.Consumer

export { ThemeProvider, ThemeConsumer }
export default ThemeContext
