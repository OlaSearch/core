import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const TermSuggestion = ({ term, translate }) => {
  if (!term) return null
  return (
    <div className='ola-term-suggestion'>
      {translate('suggestions.showing_results_for')} <strong>{term}</strong>
    </div>
  )
}

module.exports = injectTranslate(TermSuggestion)
