import React from 'react'

const ArrayField = ({ field, suffix = '', separator = ', ' }) => {
  if (!field) return null
  if (!Array.isArray(field)) return field
  return (
    <div className='ola-field ola-field-array'>
      {suffix + field.join(separator)}
    </div>
  )
}

module.exports = ArrayField
