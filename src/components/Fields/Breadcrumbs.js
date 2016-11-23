import React from 'react'

const Breadcrumbs = ({ crumbs }) => {
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
        return (
          <span key={idx}>{crumb}</span>
        )
      })}
    </div>
  )
}

module.exports = Breadcrumbs
