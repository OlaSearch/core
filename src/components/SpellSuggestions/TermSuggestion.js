import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const TermSuggestion = ({ term }) => {
  if (!term) return NO_SCRIPT_TAG

  return (
    <div className='ola-term-suggestion'>
      Showing results for <strong>{term}</strong>
    </div>
  )
}

module.exports = TermSuggestion
