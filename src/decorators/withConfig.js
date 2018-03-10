import React from 'react'
import { ConfigConsumer } from './../containers/ConfigContext'

function withConfig (WrappedComponent) {
  return (props) => (
    <ConfigConsumer>
      {(config) => <WrappedComponent config={config} {...props} />}
    </ConfigConsumer>
  )
}

export default withConfig
