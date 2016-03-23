import React from 'react'
import { removeFacet, replaceFacet, executeSearch } from './../../actions/Search'
import { FacetToggle } from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'

class FacetBoolean extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    facet: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired
  };

  onChange = (facet, event) => {
    var {
      dispatch
    } = this.props

    if (event.target.checked) {
      dispatch(replaceFacet(facet, 'true'))
    } else {
      dispatch(removeFacet(facet, 'true'))
    }

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

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{displayName}</h4>
        <div className='ola-facet-wrapper'>
          <label className='ola-checkbox ola-checkbox-label'>
            <input
              type='checkbox'
              checked={!!selected.length}
              onChange={(event) => {
                this.onChange(facet, event)
              }}
            />
            {template}
          </label>
        </div>
      </div>
    )
  }
}

module.exports = FacetToggle(FacetBoolean)
