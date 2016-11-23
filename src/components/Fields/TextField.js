import React from 'react'
import { createHTMLMarkup, truncate } from './../../utilities'

const TextField = ({ field, result, staticText, length, prefix = '', suffix = '', ellipsis }) => {
  let fieldContent = result[field] || staticText
  if (!fieldContent) return null
  fieldContent = prefix + truncate(fieldContent, length) + suffix
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
