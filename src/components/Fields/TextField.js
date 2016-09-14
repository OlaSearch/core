import React from 'react'
import { createHTMLMarkup } from './../../utilities'

const TextField = ({ field, result, text }) => {
  let fieldContent = text || result[field]
  if (!fieldContent) return null
  let klass = `ola-field ola-field-highlighted-field ola-field-${field}`
  return (
    <div className={klass} dangerouslySetInnerHTML={createHTMLMarkup(fieldContent)} />
  )
}

TextField.defaultProps = {
  length: 200
}

TextField.propTypes = {
  length: React.PropTypes.number
}

module.exports = TextField
