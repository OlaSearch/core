import React from 'react'
import PropTypes from 'prop-types'
import { createHTMLMarkup, truncate } from './../../utilities'
import FieldLabel from './FieldLabel'

const TextField = ({ field, fallbackFields, result, staticText, length, prefix = '', suffix = '', ellipsis, dynamicClass, fieldLabel, className, showIfEmpty, placeholderText }) => {
  let fieldContent = result[field] || staticText
  if (!fieldContent && fallbackFields.length) {
    for (let i = 0; i < fallbackFields.length; i++) {
      let fieldName = fallbackFields[i]
      if (fieldName in result && result[fieldName]) {
        fieldContent = result[fieldName]
        break
      }
    }
  }
  /* Convert array to string */
  if (Array.isArray(fieldContent)) {
    fieldContent = fieldContent.join(', ')
  }
  let { highlighting } = result
  if (showIfEmpty && !fieldContent) fieldContent = `<em>${field}</em>`
  if (!fieldContent) {
    return null
  }

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
    fieldContent = truncate(fieldContent, length)
  }
  if (prefix) fieldContent = prefix + fieldContent
  if (suffix) fieldContent = fieldContent + suffix
  let userClass = dynamicClass && fieldContent ? ` ${field}-${fieldContent.toLowerCase()}` : ''
  let klass = `ola-field ola-field-text ola-field-${field}${userClass} ${className}`
  return (
    <div className={klass}>
      <FieldLabel label={fieldLabel} />
      <div dangerouslySetInnerHTML={createHTMLMarkup(fieldContent)} />
    </div>
  )
}

TextField.defaultProps = {
  length: 200,
  ellipsis: '...',
  dynamicClass: false,
  fallbackFields: [],
  showIfEmpty: false,
  placeholderText: null
}

TextField.propTypes = {
  length: PropTypes.number
}

module.exports = TextField
