import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a label for a field
 */
function FieldLabel ({ label }) {
  if (!label) return null
  return <div className='ola-field-component-label'>{label}</div>
}

FieldLabel.propTypes = {
  /**
   * Label of the field
   */
  label: PropTypes.string
}

export default FieldLabel
