import React from 'react'
import PropTypes from 'prop-types'
import {
  removeFacet,
  replaceFacet,
  executeSearch
} from './../../actions/Search'
import withToggle from './../../decorators/withToggle'
import classNames from 'classnames'
import FacetTitle from './common/FacetTitle'

/**
 * Boolean filter
 */
function BooleanFilter (props) {
  function onChange (event) {
    let { dispatch, facet } = props
    if (event.target.checked) {
      dispatch(replaceFacet(facet, 'true'))
    } else dispatch(removeFacet(facet, 'true'))

    dispatch(executeSearch())
  }

  const { facet, selected, toggle, isCollapsed } = props

  if (!facet.values.length) return null

  const { displayName, template } = facet
  const klass = classNames({
    'ola-facet': true,
    'ola-facet-collapsed': isCollapsed
  })
  const isChecked = !!selected.length

  return (
    <div className={klass}>
      <FacetTitle
        displayName={facet.displayName}
        toggle={toggle}
        isCollapsed={isCollapsed}
      />
      <div className='ola-facet-wrapper'>
        <label className='ola-checkbox ola-checkbox-label'>
          <input type='checkbox' checked={isChecked} onChange={onChange} />
          <span className='ola-search-facet-name'>{template}</span>
        </label>
      </div>
    </div>
  )
}

BooleanFilter.defaultProps = {
  selected: []
}

BooleanFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  facet: PropTypes.object.isRequired,
  selected: PropTypes.array
}

export default withToggle(BooleanFilter)
