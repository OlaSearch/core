import React from 'react'
import withToggle from './../../decorators/withToggle'
import {
  replaceFacet,
  removeFacet,
  executeSearch
} from './../../actions/Search'
import classNames from 'classnames'
import FacetTitle from './common/FacetTitle'

function RangeNumericFilter (props) {
  function handleClick (start, end) {
    const { facet, dispatch } = props

    if (typeof start === 'undefined' || typeof end === 'undefined') {
      dispatch(removeFacet(facet))
    } else {
      dispatch(replaceFacet(facet, [start, end]))
    }
    dispatch(executeSearch())
  }
  const { facet, isCollapsed, toggle } = props
  const { displayName, values } = facet

  const klass = classNames({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  })
  return (
    <div className={klass}>
      <FacetTitle
        displayName={displayName}
        toggle={toggle}
        isCollapsed={isCollapsed}
      />
      <div className='ola-facet-wrapper'>
        <div className='ola-facet-list'>
          {values.map((value, idx) => {
            return (
              <RangeNumericItem
                value={value}
                handleClick={handleClick}
                key={idx}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * Numeric item
 */
function RangeNumericItem ({ value, handleClick }) {
  function onItemClick () {
    const { start, end } = value
    handleClick(start, end)
  }

  const { count, name } = value
  const itemKlass = classNames('ola-btn', 'ola-facet-link', {
    'ola-facet-link-active': false
  })
  return (
    <div className={itemKlass} onClick={onItemClick}>
      <span className='ola-search-facet-count'>{count}</span>
      <span className='ola-search-facet-name'>{name}</span>
    </div>
  )
}

export default withToggle(RangeNumericFilter)
