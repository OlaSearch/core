import React from 'react'
import withFacetToggle from './../../decorators/withToggle'
import classNames from 'classnames'
import { addFacet, executeSearch } from './../../actions/Search'

function TagCloud (props) {
  function handleAddFacet (value) {
    var { dispatch, facet } = props
    dispatch(addFacet(facet, value))
    dispatch(executeSearch())
  }

  var {
    facet,
    selected,
    isCollapsed,
    toggleDisplay,
    fontSizeMin,
    fontSizeMax,
    showSelectedFacetItem
  } = props

  var { values } = facet
  var counts = values.map((value) => value.count)
  var max = Math.max.apply(this, counts)
  var min = Math.min.apply(this, counts)

  var klass = classNames({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  })

  if (!showSelectedFacetItem) {
    values = values.filter((item) => selected.indexOf(item.name) === -1)
  }

  if (!values.length) return null
  return (
    <div className={klass}>
      <h4 className='ola-facet-title' onClick={toggleDisplay}>
        {facet.displayName}
      </h4>
      <div className='ola-facet-wrapper'>
        {values.map((value, idx) => {
          return (
            <TagCloudItem
              key={idx}
              value={value}
              min={min}
              max={max}
              fontSizeMax={fontSizeMax}
              fontSizeMin={fontSizeMin}
              onSelect={handleAddFacet}
            />
          )
        })}
      </div>
    </div>
  )
}

TagCloud.defaultProps = {
  fontSizeMin: 16,
  fontSizeMax: 24,
  showSelectedFacetItem: false
}

/**
 * Tag cloud item
 */
function TagCloudItem ({ onSelect, value, min, max, fontSizeMin, fontSizeMax }) {
  function handleClick () {
    onSelect(value.name)
  }
  let { name, count } = value
  let size =
    count === min
      ? fontSizeMin
      : count / max * (fontSizeMax - fontSizeMin) + fontSizeMin
  return (
    <button
      className='ola-btn-tag'
      style={{ fontSize: size + 'px' }}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}

module.exports = withFacetToggle(TagCloud)
