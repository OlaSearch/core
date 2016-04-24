import React from 'react'
import { createHTMLMarkup } from './../../utilities'

const HighlightedField = ({ field, result, length }) => {
  var { highlighting } = result

  if (!field) return <noscript />

  var fieldContent = result[field]

  /* Check for highlighting */

  if (highlighting && field in highlighting) {
    var highlight_content = highlighting[field]

    if (typeof highlight_content === 'object') {
      fieldContent = highlight_content.join('<br />...')
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = fieldContent.substr(0, length).split(' ').slice(0, -1).join(' ') + '...'
  }

  let klass = `ola-field ola-field-highlighted-field ola-field-${field}`

  if (!fieldContent) return <noscript />

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
