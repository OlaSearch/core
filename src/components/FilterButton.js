import React from 'react'
import { connect } from 'react-redux'
import { toggleSidebar } from './../actions/Ui'

function FilterButton ({ toggleSidebar, facets }) {
  const hasFilter = facets.some((item) => item.values.length > 0)
  if (!hasFilter) return null
  return (
    <button
      className='ola-link-open-filter'
      onClick={toggleSidebar}
      type='button'
    >
      Filter
    </button>
  )
}

FilterButton.defaultProps = {
  facets: []
}

module.exports = connect(null, { toggleSidebar })(FilterButton)
