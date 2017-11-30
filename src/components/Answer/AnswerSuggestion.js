import React from 'react'
import AnswerDropdown from './AnswerDropdown'
import equals from 'ramda/src/equals'

const WILDCARD_MODULE_NAMES = ['spices.wildcard', 'spices.meeting']

function AnswerSuggestion ({ answer, onChange, onSkipIntent }) {
  if (!answer.suggestions || !Object.keys(answer.suggestions).length) return null
  let { suggestions, original, module } = answer
  let keys = Object.keys(suggestions)
  let text = original.split('')
  let newKeys = []

  keys.map((key) => {
    let { position, selection, suggestions: options } = suggestions[key]
    let [ start ] = position
    /* Add to new keys */
    newKeys.push(options[selection].name.toLowerCase())
    /* Generate dropdown */
    text[start] = <AnswerDropdown key={key} item={key} options={options} active={selection} onChange={onChange} />
  })

  keys.map((key) => {
    let [ start, end ] = suggestions[key].position
    text = text.map((item, idx) => {
      if (idx > start && idx < end) {
        return ''
      }
      return item
    })
  })

  /* Remove multiple empty spaces */
  text = text.filter((item, idx) => {
    if (!item && !item[idx - 1]) {
      return false
    }
    return true
  })

  let shouldShowSuggestion = WILDCARD_MODULE_NAMES.indexOf(module) !== -1 && !equals(keys, newKeys)

  return (
    <div className='ola-answer-suggestion'>
      <span>Showing results for {text}</span>
      {shouldShowSuggestion
        ? <span className='ola-answer-suggestion-instead'>Search for <a onClick={onSkipIntent}>{original}</a> instead</span>
        : null
      }
    </div>
  )
}

module.exports = AnswerSuggestion
