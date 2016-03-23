import React from 'react'

const Error = ({ error, title }) => {
  if (!error) return <noscript />

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
