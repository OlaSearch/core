import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays fields that are arrays in a snippet
 */
function ArrayField ({ value, suffix, separator }) {
  if (!value) return null
  if (!Array.isArray(value)) return value
  return (
    <div className='ola-field ola-field-array'>
      {`${suffix} ${value.join(separator)}`}
    </div>
  )
}
ArrayField.propTypes = {
  /**
   * The value that should be rendered
   */
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  /**
   * String that appears before the field
   */
  suffix: PropTypes.string,
  /**
   * Separator
   */
  separator: PropTypes.string
}

ArrayField.defaultProps = {
  suffix: '',
  separator: ','
}

module.exports = ArrayField
