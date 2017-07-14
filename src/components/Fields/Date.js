import React from 'react'
import DateParser from './../../utilities/dateParser'
import FieldLabel from './FieldLabel'

const DateField = ({ date, format, fieldLabel, dependentField, result, showIfEmpty }) => {
  if (!date) return null
  if (dependentField) {
    if (dependentField === date) {
      if (showIfEmpty) {
        return (
          <div className='ola-field ola-field-date'>
            <FieldLabel label={fieldLabel} />
            -
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

DateField.defaultProps = {
  dependentField: null,
  showIfEmpty: false
}

module.exports = DateField
