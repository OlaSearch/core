import React from 'react'
import PropTypes from 'prop-types'
import { replaceFacet, removeFacet } from './../../actions/Search'
import {
  addFacet as addFacetAutoSuggest,
  removeFacet as removeFacetAutoSuggest
} from './../../actions/AutoSuggest'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import flatten from 'rambda/lib/flatten'
import find from 'rambda/lib/find'
import propEq from 'rambda/lib/propEq'

/* Create a zone facet */
const createZoneFacet = (name) => ({ name, zone: true, type: 'string' })

function Zone (props, context) {
  function onChange (event) {
    let { value } = event.target
    let { onChange, replaceFacet, removeFacet } = props
    let facet = createZoneFacet(context.config.zone.filter)
    if (value) {
      replaceFacet(facet, value)
    } else {
      removeFacet(facet)
    }
    onChange && onChange(facet, value)
  }

  let { zone: { defaultValue, values, filter } } = context.config
  let { selected } = props
  let selectedValues = flatten(
    selected.filter((item) => item.name === filter).map((item) => item.selected)
  )
  let selectedValue = selectedValues.length ? selectedValues[0] : defaultValue
  let selectedDisplayName = find(propEq('name', selectedValue))(values)[
    'displayName'
  ]

  return (
    <div className='ola-zone'>
      <label className='ola-zone-label'>Select zone</label>
      <span className='ola-zone-selected'>{selectedDisplayName}</span>
      <select onChange={onChange} value={selectedValue}>
        {values.map(({ name, displayName }) => {
          return (
            <option key={name} value={name}>
              {displayName}
            </option>
          )
        })}
      </select>
    </div>
  )
}

Zone.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

Zone.defaultProps = {
  selected: []
}

function mapStateToProps (state, ownProps) {
  return {
    selected: ownProps.isAutosuggest
      ? state.AutoSuggest.facet_query
      : state.QueryState.facet_query
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  let actions
  if (ownProps.isAutosuggest) {
    actions = {
      replaceFacet: addFacetAutoSuggest,
      removeFacet: removeFacetAutoSuggest
    }
  } else {
    actions = {
      replaceFacet,
      removeFacet
    }
  }
  return bindActionCreators(actions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Zone)
