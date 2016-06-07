import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Error = ({ error, title }) => {
  if (!error) return NO_SCRIPT_TAG

  var message = ''

  switch (error.status) {
    case 404:
      message = '404 The page cannot be found'
      break

    default:
      message = 'Something went wrong. Please email support@olasearch.com.'
      break
  }

  return (
    <div className='ola-error'>
      <h2>{title}</h2>
      {message}
    </div>
  )
}

Error.defaultProps = {
  title: 'Something went wrong'
}

Error.propTypes = {
  title: React.PropTypes.string,
  error: React.PropTypes.object
}

module.exports = Error
