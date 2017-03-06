import React from 'react'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'
import { addFacet, executeSearch } from './../../actions/Search'

class TagCloud extends React.Component {
  static defaultProps = {
    fontSizeMin: 16,
    fontSizeMax: 24,
    showSelectedFacetItem: false
  };

  handleAddFacet = (value) => {
    var { dispatch, facet } = this.props
    dispatch(addFacet(facet, value))
    dispatch(executeSearch())
  };

  render () {
    var {
      facet,
      selected,
      isCollapsed,
      toggleDisplay,
      fontSizeMin,
      fontSizeMax,
      showSelectedFacetItem
    } = this.props

    var { values } = facet
    var counts = values.map((value) => value.count)
    var max = Math.max.apply(this, counts)
    var min = Math.min.apply(this, counts)

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    if (!showSelectedFacetItem) values = values.filter((item) => selected.indexOf(item.name) === -1)

    if (!values.length) return null
    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{facet.displayName}</h4>
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
                onSelect={this.handleAddFacet}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

/**
 * Tag cloud item
 */
class TagCloudItem extends React.Component {
  handleClick = () => {
    this.props.onSelect(this.props.value.name)
  }
  render () {
    let { value: { name, count }, min, max, fontSizeMin, fontSizeMax } = this.props
    let size = (count === min) ? fontSizeMin : ((count / max) * (fontSizeMax - fontSizeMin)) + fontSizeMin
    return (
      <button
        className='ola-btn-tag'
        style={{ fontSize: size + 'px' }}
        onClick={this.handleClick}>
        {name}
      </button>
    )
  }
}

module.exports = withFacetToggle(TagCloud)
