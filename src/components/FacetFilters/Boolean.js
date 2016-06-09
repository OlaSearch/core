import React from 'react'
import { removeFacet, replaceFacet, executeSearch } from './../../actions/Search'
import { facetToggle } from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'

class BooleanFilter extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    facet: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired
  };

  onChange = (event) => {
    let {
      dispatch,
      facet
    } = this.props

    if (event.target.checked) dispatch(replaceFacet(facet, 'true'))
    else dispatch(removeFacet(facet))

    dispatch(executeSearch())
  };

  render () {
    var {
      facet,
      selected,
      toggleDisplay,
      isCollapsed
    } = this.props

    if (!facet.values.length) return null

    var { displayName, template } = facet

    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    let isChecked = !!selected.length

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{displayName}</h4>
        <div className='ola-facet-wrapper'>
          <label className='ola-checkbox ola-checkbox-label'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={this.onChange}
            />
            {template}
          </label>
        </div>
      </div>
    )
  }
}

module.exports = facetToggle(BooleanFilter)
