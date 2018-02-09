import React from 'react'
import Minus from '@olasearch/icons/lib/minus-square'
import Plus from '@olasearch/icons/lib/plus-square'

function FacetTitle ({ toggleDisplay, displayName, isCollapsed }) {
  return (
    <h4 className='ola-facet-title' onClick={toggleDisplay}>
      {displayName}
      {isCollapsed ? <Plus /> : <Minus />}
    </h4>
  )
}

export default FacetTitle
