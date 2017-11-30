import React from 'react'
import PropTypes from 'prop-types'

/**
 * Display fields that are arrays in a snippet, separated by a separator
 *
 * @example ./../../../examples/Fields.ArrayField.md
 */
function ArrayField ({ field, suffix = '', separator = ', ' }) {
  if (!field) return null
  if (!Array.isArray(field)) return field
  return (
    <div className='ola-field ola-field-array'>
      {suffix + field.join(separator)}
    </div>
  )
}
ArrayField.propTypes = {
  /**
   * The value that should be rendered
   */
  field: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  /**
   * String that appears before the field
   */
  suffix: PropTypes.string,
  /**
   * What separates the array
   */
  separator: PropTypes.string
}

module.exports = ArrayField
