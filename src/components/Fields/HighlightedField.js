import React from 'react'
import { createHTMLMarkup } from './../../utilities'

const HighlightedField = ({ field, result, length }) => {
  if (!field) return null

  let { highlighting } = result
  let fieldContent = result[field]

  /* Check for highlighting */

  if (highlighting && field in highlighting) {
    let highlightedContent = highlighting[field]
    if (typeof highlightedContent === 'object') {
      let temp = []
      for (let i = 0; i < highlightedContent.length; i++){
        temp.push(`<span class='ola-hi-token'>${highlightedContent[i]}</span>`)
      }
      fieldContent = temp
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = fieldContent.substr(0, length).split(' ').slice(0, -1).join(' ') + '...'
  }
  let klass = `ola-field ola-field-highlighted-field ola-field-${field}`

  if (!fieldContent) return null

  return (
    <div className={klass} dangerouslySetInnerHTML={createHTMLMarkup(fieldContent)} />
  )
}

HighlightedField.defaultProps = {
  length: 200
}

HighlightedField.propTypes = {
  length: React.PropTypes.number
}

module.exports = HighlightedField
