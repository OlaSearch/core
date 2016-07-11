import React from 'react'
import DateParser from './../../utilities/dateParser'

const DateField = ({ date, format }) => {
  let formattedDate = DateParser.format(date, format)
  return (
    <div className='ola-field ola-field-date'>
      {formattedDate}
    </div>
  )
}

module.exports = DateField
