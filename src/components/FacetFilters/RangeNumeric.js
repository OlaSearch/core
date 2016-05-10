import React from 'react'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
import { replaceFacet, removeFacet, executeSearch } from './../../actions/Search'
import classNames from 'classnames'

class RangeNumericFilter extends React.Component {
  handleClick = (from, to) => {
    let { facet, dispatch } = this.props

    if (typeof from === 'undefined' || typeof to === 'undefined') {
      dispatch(removeFacet(facet))
    } else {
      dispatch(replaceFacet(facet, [from, to]))
    }
    dispatch(executeSearch())
  };
  render () {
    var { facet, isCollapsed, toggleDisplay } = this.props
    var { displayName, values } = facet

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })
    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{displayName}</h4>
        <div className='ola-facet-wrapper'>
          <div className='ola-facet-list'>
            {values.map((value, idx) => {
              return (
                <RangeNumericItem
                  value={value}
                  handleClick={this.handleClick}
                  key={idx}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Numeric item
 */
class RangeNumericItem extends React.Component {
  handleClick = () => {
    let { value } = this.props
    let { from, to } = value
    this.props.handleClick(from, to)
  };

  render () {
    let { value } = this.props
    let { count, name } = value
    let itemKlass = classNames('ola-btn', 'ola-facet-link', { 'ola-facet-link-active': false })
    return (
      <div
        className={itemKlass}
        onClick={this.handleClick}
      >
        <span className='ola-search-facet-count'>{count}</span>
        <span className='ola-search-facet-name'>{name}</span>
      </div>
    )
  }
}

module.exports = FacetToggle(RangeNumericFilter)