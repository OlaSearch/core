import React from 'react'
import withLogger from './../../../decorators/withLogger'
import User from '@olasearch/icons/lib/user'

function Person ({ result, iconSize, personName, log, displayIcon, snippetId }) {
  if (!personName) return null
  let classes = 'ola-field ola-field-person'
  const { url } = result
  return (
    <div className={classes}>
      <a className='ola-flex ola-btn-person' href={url} title={personName}>
        {displayIcon && (
          <span className='ola-flex-icon'>
            <User size={iconSize} />
          </span>
        )}
        <span className='ola-flex-content'>{personName}</span>
      </a>
    </div>
  )
}

Person.defaultProps = {
  personName: '',
  displayIcon: false,
  iconSize: 20
}

module.exports = withLogger(Person)
