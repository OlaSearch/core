import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a section breadcrumb in snippet
 * @example ./../../../examples/Fields.Breadcrumbs.md
 */
function Breadcrumbs ({ crumbs }) {
  if (!crumbs) return null

  if (typeof crumbs === 'string') {
    return (
      <div className='ola-field ola-field-crumbs ola-field-crumbs-tag'>
        {crumbs}
      </div>
    )
  }
  return (
    <div className='ola-field ola-field-crumbs'>
      {crumbs.map((crumb, idx) => {
        return <span key={idx}>{crumb}</span>
      })}
    </div>
  )
}

Breadcrumbs.propTypes = {
  crumbs: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

module.exports = Breadcrumbs
