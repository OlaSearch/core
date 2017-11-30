import React from 'react'

function FieldLabel ({ label }) {
  if (!label) return null
  return (
    <div className='ola-field-component-label'>{label}</div>
  )
}

module.exports = FieldLabel
