import React from 'react'

const Year = ({ year }) => {
  if (!year) return <noscript />

  return <span>({year})</span>
}

module.exports = Year
