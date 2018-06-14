import React from 'react'
import PropTypes from 'prop-types'
import withLogger from './../../../decorators/withLogger'
import User from '@olasearch/icons/lib/user'
import FieldLabel from './../FieldLabel'
import { getDisplayName } from './../../../utilities'

/**
 * Displays a person
 */
function Person ({
  result,
  fieldLabel,
  iconSize,
  personName,
  log,
  displayIcon,
  snippetId
}) {
  if (!personName) return null
  let classes = 'ola-field ola-field-person'
  return (
    <div className={classes}>
      <FieldLabel label={fieldLabel} />
      <a className='ola-flex ola-btn-person' title={personName}>
        {displayIcon && (
          <span className='ola-flex-icon'>
            <User size={iconSize} />
          </span>
        )}
        <span className='ola-flex-content'>{getDisplayName(personName)}</span>
      </a>
    </div>
  )
}

Person.defaultProps = {
  personName: '',
  fieldLabel: '',
  displayIcon: false,
  iconSize: 20,
  result: null
}

Person.propTypes = {
  /**
   * Name of the person
   */
  personName: PropTypes.string,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string,
  /**
   * Displays a date icon
   */
  displayIcon: PropTypes.bool,
  /**
   * Icon size
   */
  iconSize: 20,
  /**
   * Search result
   */
  result: PropTypes.object
}

export default withLogger(Person)
