import React from 'react'
import PropTypes from 'prop-types'
import withTranslate from './../decorators/withTranslate'

/**
 * Displays an error message
 */
function ErrorSnippet ({ error, translate }) {
  if (!error) return null
  var message
  var title
  switch (error.status) {
    case 404:
      title = translate('error_404_title')
      message = translate('error_404_description')
      break

    default:
      title = translate('error_general_title')
      message = translate('error_general_description')
      break
  }

  return (
    <div className='ola-error'>
      <div className='ola-error-title'>{title}</div>
      <div className='ola-error-message'>{message}</div>
    </div>
  )
}

ErrorSnippet.propTypes = {
  error: PropTypes.object
}

module.exports = withTranslate(ErrorSnippet)
