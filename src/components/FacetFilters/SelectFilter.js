import React from 'react'
import PropTypes from 'prop-types'
import {
  removeFacet,
  replaceFacet,
  executeSearch
} from './../../actions/Search'
import { getDisplayName } from './../../utilities'
import { connect } from 'react-redux'
import withToggle from './../../decorators/withToggle'
import withTranslate from './../../decorators/withTranslate'
import FacetTitle from './common/FacetTitle'
import cx from 'classnames'
import SelectBox from './../SelectBox'

class SelectFilter extends React.Component {
  handleChange = (event) => {
    this.props.replaceFacet(this.props.facet, event.target.value)
    this.props.executeSearch()
  }
  static propTypes = {
    facet: PropTypes.object.isRequired,
    selected: PropTypes.array
  }
  render () {
    const { facet, selected, toggle, isCollapsed } = this.props
    const { displayName, values, facetNames } = facet
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
          <SelectBox onChange={this.handleChange} value={value}>
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
}

export default connect(null, { removeFacet, replaceFacet, executeSearch })(
  withTranslate(withToggle(SelectFilter))
)
