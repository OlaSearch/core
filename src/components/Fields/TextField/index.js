import React from 'react'
import PropTypes from 'prop-types'
import {
  createHTMLMarkup,
  truncate,
  getDisplayName
} from './../../../utilities'
import { SEARCH_COLLECTION_IDENTIFIER } from './../../../constants/Settings'
import FieldLabel from './../FieldLabel'

/**
 * Display any text with highlight
 */
function TextField ({
  field,
  fallbackFields,
  result,
  staticText,
  length,
  prefix = '',
  suffix = '',
  ellipsis,
  dynamicClass,
  fieldLabel,
  className,
  showIfEmpty
}) {
  let fieldContent = staticText || result[field]
  if (field === SEARCH_COLLECTION_IDENTIFIER) {
    fieldContent = getDisplayName(fieldContent)
  }
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
    } else if (highlightedContent) {
      fieldContent = highlightedContent
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = truncate(fieldContent, length, ellipsis)
  }
  if (prefix) fieldContent = prefix + fieldContent
  if (suffix) fieldContent = fieldContent + suffix
  let userClass =
    dynamicClass && fieldContent
      ? ` ${field}-${fieldContent.toLowerCase()}`
      : ''
  let klass = `ola-field ola-field-text ${
    field ? `ola-field-${field}${userClass}` : 'ola-field-static'
  } ${className}`
  return (
    <div className={klass}>
      <FieldLabel label={fieldLabel} />
      <div
        className='ola-field-value'
        dangerouslySetInnerHTML={createHTMLMarkup(fieldContent)}
      />
    </div>
  )
}

TextField.defaultProps = {
  length: 200,
  ellipsis: '...',
  className: '',
  dynamicClass: false,
  fallbackFields: [],
  showIfEmpty: false
}

TextField.propTypes = {
  /**
   * Max length of the text field
   */
  length: PropTypes.number,
  /**
   * Search result
   */
  result: PropTypes.object,
  /**
   * Show Static text
   */
  staticText: PropTypes.string,
  /**
   * Prefix
   */
  prefix: PropTypes.string,
  /**
   * Suffix
   */
  suffix: PropTypes.string,
  /**
   * Show ellipsis if text field exceeds max length
   */
  ellipsis: PropTypes.string,
  /**
   * Field to display
   */
  field: PropTypes.string,
  /**
   * If the default field doesnt have content, look in fallbackFields
   */
  fallbackFields: PropTypes.array,
  /**
   * Additional class name
   */
  className: PropTypes.string,
  /**
   * Add classes with value of field content
   */
  dynamicClass: PropTypes.bool,
  /**
   * Show if empty
   */
  showIfEmpty: PropTypes.bool,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string
}

module.exports = TextField
