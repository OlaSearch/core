import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a page hierarchy in the search snippet
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
  /**
   * A string or array of breadcrumbs
   */
  crumbs: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default Breadcrumbs
