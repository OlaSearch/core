import React from 'react'
import DateParser from './../../utilities/dateParser'
import FieldLabel from './FieldLabel'

const DateField = ({ date, format, fieldLabel }) => {
  if (!date) return null
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

module.exports = DateField
