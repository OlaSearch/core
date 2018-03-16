import React from 'react'
import PropTypes from 'prop-types'
import withLogger from './../../../decorators/withLogger'
import User from '@olasearch/icons/lib/user'
import FieldLabel from './../FieldLabel'
import { getDisplayName } from './../../../utilities'
import classNames from 'classnames'

function Pill ({
  fieldLabel,
  iconSize,
  pillName,
  log,
  displayIcon,
  snippetId,
  inlineLabel
}) {
  /* If there are no pills */
  if (!pillName || !pillName.length) return null
  if (typeof pillName === 'string') pillName = [pillName]
  let classes = classNames('ola-field ola-field-pill', {
    'ola-field-label-inline': inlineLabel
  })
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
  iconSize: 20,
  inlineLabel: false
}

Pill.propTypes = {
  /**
   * Pill name
   */
  pillName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
   * Label will be inline
   */
  inlineLabel: PropTypes.bool,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string
}

module.exports = withLogger(Pill)
