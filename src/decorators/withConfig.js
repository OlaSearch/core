import React from 'react'
import PropTypes from 'prop-types'
import { ConfigConsumer } from './../containers/ConfigContext'

/**
 * Access project configuration object
 * @example withConfig.md
 */
function withConfig (WrappedComponent) {
  return (props) => (
    <ConfigConsumer>
      {(config) => <WrappedComponent {...props} config={config} />}
    </ConfigConsumer>
  )
}

export default withConfig
