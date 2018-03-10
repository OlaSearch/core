import React from 'react'
import withLogger from './../../../decorators/withLogger'
import User from '@olasearch/icons/lib/user'
import FieldLabel from './../FieldLabel'
import { getDisplayName } from './../../../utilities'

function Pill ({ fieldLabel, iconSize, pillName, log, displayIcon, snippetId }) {
  /* If there are no pills */
  if (!pillName || !pillName.length) return null
  if (typeof pillName === 'string') pillName = [pillName]
  let classes = 'ola-field ola-field-pill'
  return (
    <div className={classes}>
      <FieldLabel label={fieldLabel} />
      {pillName.map((name, idx) => (
        <span className='ola-flex ola-btn-pill' key={idx}>
          <span className='ola-flex-content'>{getDisplayName(name)}</span>
        </span>
      ))}
    </div>
  )
}

Pill.defaultProps = {
  pillName: [],
  displayIcon: false,
  iconSize: 20
}

module.exports = withLogger(Pill)
