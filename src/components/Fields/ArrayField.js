import React from 'react'

const ArrayField = ({ field, suffix = '', separator = ', ' }) => {
  if (!field) return null
  if (!Array.isArray(field)) return field
  return <span>{suffix + field.join(separator)}</span>
}

module.exports = ArrayField
