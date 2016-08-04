import React from 'react'
import DateParser from './../../utilities/dateParser'

const DateField = ({ date, format }) => {
  let formattedDate = ''
  try {
    formattedDate = DateParser.format(date, format)
  } catch (e) {
    return null
  }
  return (
    <div className='ola-field ola-field-date'>
      {formattedDate}
    </div>
  )
}

module.exports = DateField
