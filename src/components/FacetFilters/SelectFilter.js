import React from 'react'
import PropTypes from 'prop-types'
import {
  removeFacetItem,
  replaceFacet,
  executeSearch
} from './../../actions/Search'
import { getDisplayName, sortFacetValues } from './../../utilities'
import { connect } from 'react-redux'
import withToggle from './../../decorators/withToggle'
import withTranslate from './../../decorators/withTranslate'
import FacetTitle from './common/FacetTitle'
import cx from 'classnames'
import SelectBox from './../SelectBox'

function SelectFilter ({
  facet,
  replaceFacet,
  executeSearch,
  removeFacetItem,
  selected,
  toggle,
  showIfEmpty,
  isCollapsed
}) {
  function handleChange (event) {
    const value = event.target.value
    if (!value) {
      removeFacetItem(facet)
    } else {
      replaceFacet(facet, value)
    }
    executeSearch()
  }
  const { displayName, values, facetNames, sort } = facet
  if (!values.length && !showIfEmpty) return null
  const classes = cx('ola-facet', {
    'ola-facet-collapsed': isCollapsed
  })
  const value = selected.length ? selected[0] : ''
  return (
    <div className={classes}>
      <FacetTitle
        displayName={displayName}
        toggle={toggle}
        isCollapsed={isCollapsed}
      />
      <div className='ola-facet-wrapper'>
        <SelectBox onChange={handleChange} value={value}>
          <option value=''>Select type</option>
          {values.map(({ name }, idx) => {
            return (
              <option key={idx} value={name}>
                {getDisplayName(facetNames, name)}
              </option>
            )
          })}
        </SelectBox>
      </div>
    </div>
  )
}

SelectFilter.propTypes = {
  selected: PropTypes.array,
  facet: PropTypes.object.isRequired
}

export default connect(null, { removeFacetItem, replaceFacet, executeSearch })(
  withTranslate(withToggle(SelectFilter))
)
