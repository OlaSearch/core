import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Year = ({ year }) => {
  if (!year) return NO_SCRIPT_TAG

  return <span>({year})</span>
}

module.exports = Year
