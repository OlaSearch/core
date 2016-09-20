import React from 'react'
import { createHTMLMarkup } from './../../utilities'

const TextField = ({ field, result, length, ellipsis }) => {
  let fieldContent = result[field]
  if (!fieldContent) return null
  if (fieldContent.length > length) {
    fieldContent = fieldContent.substr(0, length).split(' ').slice(0, -1).join(' ') + ellipsis
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
