import React from 'react'
import withLogger from './../../../decorators/withLogger'
import User from '@olasearch/icons/lib/user'

function Pill ({ result, iconSize, pillName, log, displayIcon, snippetId }) {
  if (!pillName) return null
  if (typeof pillName === 'string') pillName = [pillName]
  let classes = 'ola-field ola-field-pill'
  return (
    <div className={classes}>
      {pillName.map((item, index) => {
        return (
          <span className='ola-flex ola-btn-pill' key={index}>
            {displayIcon && (
              <span className='ola-flex-icon'>
                <User size={iconSize} />
              </span>
            )}
            <span className='ola-flex-content'>{item}</span>
          </span>
        )
      })}
    </div>
  )
}

Pill.defaultProps = {
  pillName: [],
  displayIcon: false,
  iconSize: 20
}

module.exports = withLogger(Pill)
