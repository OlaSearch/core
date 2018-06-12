import React from 'react'
import { TranslateConsumer } from './../containers/TranslateContext'

/**
 * Access translate function
 * @param  {Object} WrappedComponent
 * @return {Object}
 */
function withTranslate (WrappedComponent) {
  return (props) => (
    <TranslateConsumer>
      {(translate) => <WrappedComponent {...props} translate={translate} />}
    </TranslateConsumer>
  )
}

export default withTranslate
