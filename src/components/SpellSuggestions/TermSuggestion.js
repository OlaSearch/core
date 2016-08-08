import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'

const TermSuggestion = ({ term, translate, className }) => {
  if (!term) return null
  return (
    <div className='ola-term-suggestion' {...className}>
      {translate('suggestions_showing_results_for', { term }, true)}
    </div>
  )
}

module.exports = injectTranslate(TermSuggestion)
