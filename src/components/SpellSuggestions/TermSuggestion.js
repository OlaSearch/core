import React from 'react'
import injectTranslate from './../../decorators/olaTranslate'

const TermSuggestion = ({ term, translate, ...rest }) => {
  if (!term) return null
  return (
    <div className='ola-term-suggestion' {...rest}>
      {translate('suggestions_showing_results_for', { term }, true)}
    </div>
  )
}

module.exports = injectTranslate(TermSuggestion)
