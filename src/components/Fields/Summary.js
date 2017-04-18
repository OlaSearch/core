import React from 'react'
import PropTypes from 'prop-types'
import { createHTMLMarkup } from './../../utilities'

const Summary = ({ result, length, ellipsis }) => {
  let { summary, highlighting } = result

  if (!summary) return null

  /* Check for highlighting */
  if (highlighting && highlighting.summary) {
    let { summary: highlightedSummary } = highlighting
    if (typeof highlightedSummary === 'object') {
      summary = highlightedSummary.join(`<br />${ellipsis}`)
    }
  } else if (summary.length > length) {
    summary = summary.substr(0, length).split(' ').slice(0, -1).join(' ') + ellipsis
  }

  return (
    <div className='ola-field ola-field-summary' dangerouslySetInnerHTML={createHTMLMarkup(summary)} />
  )
}

Summary.defaultProps = {
  length: 200,
  ellipsis: '...'
}

Summary.propTypes = {
  length: PropTypes.number,
  ellipsis: PropTypes.string
}

module.exports = Summary
