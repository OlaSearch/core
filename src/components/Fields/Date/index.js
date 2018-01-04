import React from 'react'
import PropTypes from 'prop-types'
import DateParser from './../../../utilities/dateParser'
import FieldLabel from './../FieldLabel'

/**
 * Displays a formatted Date field
 */
function DateField ({
  date,
  format,
  fieldLabel,
  dependentField,
  result,
  showIfEmpty
}) {
  if (!date) return null
  if (dependentField) {
    if (dependentField === date) {
      if (showIfEmpty) {
        return (
          <div className='ola-field ola-field-date'>
            <FieldLabel label={fieldLabel} />
            <em>Date {date}</em>
          </div>
        )
      }
      return null
    }
  }
  let formattedDate = ''
  try {
    formattedDate = DateParser.format(date, format)
  } catch (e) {
    return null
  }
  return (
    <div className='ola-field ola-field-date'>
      <FieldLabel label={fieldLabel} />
      {formattedDate}
    </div>
  )
}

DateField.propTypes = {
  date: PropTypes.string,
  format: PropTypes.string,
  fieldLabel: PropTypes.string,
  dependentField: PropTypes.string,
  result: PropTypes.object,
  showIfEmpty: PropTypes.bool
}

DateField.defaultProps = {
  dependentField: null,
  showIfEmpty: false
}

module.exports = DateField
