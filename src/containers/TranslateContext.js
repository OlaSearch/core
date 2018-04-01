import React from 'react'

const TranslateContext = React.createContext(null)
const TranslateProvider = TranslateContext.Provider
const TranslateConsumer = TranslateContext.Consumer

export { TranslateProvider, TranslateConsumer }
export default TranslateContext
