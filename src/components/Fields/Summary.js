import React from 'react'
import { createHTMLMarkup } from './../../utilities'

const Summary = ({ result, length }) => {
  let { summary, highlighting } = result

  if (!summary) return <noscript />

  /* Check for highlighting */

  if (highlighting) {
    let { summary: highlighted_summary } = highlighting

    if (typeof highlighted_summary === 'object') {
      summary = highlighted_summary.join('<br />...')
    }
  } else if (summary.length > length) {
    summary = summary.substr(0, length).split(' ').slice(0, -1).join(' ') + '...'
  }

  return (
    <div className='ola-field ola-field-summary' dangerouslySetInnerHTML={createHTMLMarkup(summary)} />
  )
}

Summary.defaultProps = {
  length: 200
}

Summary.propTypes = {
  length: React.PropTypes.number
}

module.exports = Summary
