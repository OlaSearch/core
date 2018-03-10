import React from 'react'
import createReactContext from 'create-react-context'

const ConfigContext = createReactContext({})
const ConfigProvider = ConfigContext.Provider
const ConfigConsumer = ConfigContext.Consumer

export { ConfigProvider, ConfigConsumer }
export default ConfigContext
