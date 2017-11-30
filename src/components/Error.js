import React from 'react'
import PropTypes from 'prop-types'
import injectTranslate from './../decorators/OlaTranslate'

function Error ({ error, translate }) {
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
      <h2>{title}</h2>
      {message}
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.object
}

module.exports = injectTranslate(Error)
