import React from 'react'
import { createHTMLMarkup, truncate } from './../../utilities'

const TextField = ({ field, result, staticText, length, prefix = '', suffix = '', ellipsis }) => {
  let fieldContent = result[field] || staticText
  let { highlighting } = result
  if (!fieldContent) return null

  /* Check for highlighting */
  if (highlighting && field in highlighting) {
    let highlightedContent = highlighting[field]
    if (typeof highlightedContent === 'object') {
      let temp = []
      for (let i = 0; i < highlightedContent.length; i++) {
        temp.push(`<span class='ola-hi-token'>${highlightedContent[i]}</span>`)
      }
      fieldContent = temp
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = prefix + truncate(fieldContent, length) + suffix
  }
  let klass = `ola-field ola-field-highlighted-field ola-field-${field}`
  return (
    <div className={klass} dangerouslySetInnerHTML={createHTMLMarkup(fieldContent)} />
  )
}

TextField.defaultProps = {
  length: 200,
  ellipsis: '...'
}

TextField.propTypes = {
  length: React.PropTypes.number
}

module.exports = TextField
