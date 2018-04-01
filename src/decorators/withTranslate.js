import React from 'react'
import { TranslateConsumer } from './../containers/TranslateContext'

/**
 * Access theme variables
 */
function withTranslate (WrappedComponent) {
  return (props) => (
    <TranslateConsumer>
      {(translate) => <WrappedComponent {...props} translate={translate} />}
    </TranslateConsumer>
  )
}

export default withTranslate
