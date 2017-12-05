import React from 'react'
import PropTypes from 'prop-types'
import {
  removeFacet,
  replaceFacet,
  executeSearch
} from './../../actions/Search'
import withFacetToggle from './../../decorators/withToggle'
import classNames from 'classnames'

function BooleanFilter (props) {
  function onChange (event) {
    let { dispatch, facet } = props
    if (event.target.checked) {
      dispatch(replaceFacet(facet, 'true'))
    } else dispatch(removeFacet(facet, 'true'))

    dispatch(executeSearch())
  }

  var { facet, selected, toggleDisplay, isCollapsed } = props

  if (!facet.values.length) return null

  var { displayName, template } = facet

  var klass = classNames({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  })

  let isChecked = !!selected.length

  return (
    <div className={klass}>
      <h4 className='ola-facet-title' onClick={toggleDisplay}>
        {displayName}
      </h4>
      <div className='ola-facet-wrapper'>
        <label className='ola-checkbox ola-checkbox-label'>
          <input type='checkbox' checked={isChecked} onChange={onChange} />
          {template}
        </label>
      </div>
    </div>
  )
}

BooleanFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  facet: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
}

module.exports = withFacetToggle(BooleanFilter)
