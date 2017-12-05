import React from 'react'
import withFacetToggle from './../../decorators/withToggle'
import {
  replaceFacet,
  removeFacet,
  executeSearch
} from './../../actions/Search'
import classNames from 'classnames'

function RangeNumericFilter (props) {
  function handleClick (from, to) {
    let { facet, dispatch } = props

    if (typeof from === 'undefined' || typeof to === 'undefined') {
      dispatch(removeFacet(facet))
    } else {
      dispatch(replaceFacet(facet, [from, to]))
    }
    dispatch(executeSearch())
  }
  var { facet, isCollapsed, toggleDisplay } = props
  var { displayName, values } = facet

  var klass = classNames({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  })
  return (
    <div className={klass}>
      <h4 className='ola-facet-title' onClick={toggleDisplay}>
        {displayName}
      </h4>
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
    let { from, to } = value
    handleClick(from, to)
  }

  let { count, name } = value
  let itemKlass = classNames('ola-btn', 'ola-facet-link', {
    'ola-facet-link-active': false
  })
  return (
    <div className={itemKlass} onClick={onItemClick}>
      <span className='ola-search-facet-count'>{count}</span>
      <span className='ola-search-facet-name'>{name}</span>
    </div>
  )
}

module.exports = withFacetToggle(RangeNumericFilter)
