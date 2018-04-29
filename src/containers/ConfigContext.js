import React from 'react'

const ConfigContext = React.createContext({})
const { Provider: ConfigProvider, Consumer: ConfigConsumer } = ConfigContext

export { ConfigProvider, ConfigConsumer }
export default ConfigContext
