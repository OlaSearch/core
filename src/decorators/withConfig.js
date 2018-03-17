import React from 'react'
import { ConfigConsumer } from './../containers/ConfigContext'

function withConfig (WrappedComponent) {
  return (props) => (
    <ConfigConsumer>
      {(config) => <WrappedComponent {...props} config={config} />}
    </ConfigConsumer>
  )
}

export default withConfig
