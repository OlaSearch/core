import React from 'react'

const Year = ({ year }) => {
  if (!year) return null

  return <span className='ola-field ola-field-year'>({year})</span>
}

module.exports = Year
