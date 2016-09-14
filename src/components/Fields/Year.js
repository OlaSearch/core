import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Year = ({ year }) => {
  if (!year) return NO_SCRIPT_TAG

  return <span className='ola-field ola-field-year'>({year})</span>
}

module.exports = Year
