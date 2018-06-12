import React from 'react'
import PropTypes from 'prop-types'
import { ConfigConsumer } from './../containers/ConfigContext'

/**
 * Access config variables using the HOC
 * @param  {Object} WrappedComponent
 * @return {Object}
 */
function withConfig (WrappedComponent) {
  return (props) => (
    <ConfigConsumer>
      {(config) => <WrappedComponent {...props} config={config} />}
    </ConfigConsumer>
  )
}

export default withConfig
